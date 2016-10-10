"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const ajax_service_1 = require('./ajax.service');
const url_service_1 = require('./url.service');
const entityfactory_service_1 = require('./entityfactory.service');
class Request {
    constructor(controller, method, id, params, entity, callback, error = () => { }) {
        this.controller = controller;
        this.method = method;
        this.id = id;
        this.params = params;
        this.entity = entity;
        this.callback = callback;
        this.error = error;
        this.requestid = Request.globalrequestid++;
    }
    getRequestId() { return this.requestid; }
    getId() { return this.id; }
    getController() { return this.controller; }
    getMethod() { return this.method; }
    getParams() { return this.params; }
    getEntity() { return this.entity; }
    getCallback() { return this.callback; }
    getError() { return this.error; }
}
Request.globalrequestid = 1;
let RepositoryService = class RepositoryService {
    constructor($ajax, $entityFactory, $url) {
        this.$ajax = $ajax;
        this.$entityFactory = $entityFactory;
        this.$url = $url;
        this.entities = [];
        this.requests = [];
        this.requestTimer = null;
    }
    clearCache() {
        this.entities = [];
    }
    getFromCache(name, id) {
        // Looking if it is into the cache ?
        if (typeof (this.entities[name]) === 'undefined' || typeof (this.entities[name][id]) === "undefined") {
            return null;
        }
        return this.entities[name][id];
    }
    /**
    * @param obj object
    * @param name string name of the model
    */
    EntityFromJson(obj, name) {
        var entity = this.$entityFactory.create(name);
        if (entity == null) {
            throw "Unable to find entity : " + name;
        }
        entity.setValues(obj);
        // Add to the local cache
        if (typeof (this.entities[name]) === "undefined") {
            this.entities[name] = [];
        }
        this.entities[name][entity.getId()] = entity;
        return entity;
    }
    /** Add a request into the request list to be executed
    */
    addGetRequest(request) {
        this.requests.push(request);
        // Fire after a little interval to get maximum request
        if (this.requestTimer == null) {
            // run
            this.requestTimer = setTimeout(() => {
                this.runRequests(this.requests.slice(0)); // slice = clone
                this.requestTimer = null;
            }, 10);
        }
    }
    /** Create a ajax request for runRequest */
    prepareRequests(requests) {
        var params = [];
        for (var i in this.requests) {
            var request = this.requests[i];
            params.push({
                id: request.getId(),
                method: request.getMethod(),
                controller: request.getController(),
                params: request.getParams(),
                requestid: request.getRequestId()
            });
        }
        return params;
    }
    /** Execute all the requests list */
    runRequests(requests) {
        let params = this.prepareRequests(requests);
        let observable = this.$ajax.post(this.$url.makeApi('Multiple', 'index'), params);
        observable.subscribe((d) => {
            if (typeof (d['Multiple']) === 'undefined') {
                // Call all error callback !
                for (var i in requests) {
                    this.requests[i].getError()();
                }
                return false;
            }
            var data = d['Multiple'];
            // Manage request
            for (var i in data) {
                var request = this.getRequestFromRequestId(data[i].requestid, requests);
                // Callback
                request.getCallback()(data[i]);
            }
        });
        // Clear request list
        this.requests = [];
    }
    /** Get the request according to the requestid
    */
    getRequestFromRequestId(requestid, requests) {
        for (var i in requests) {
            if (requests[i].getRequestId() == requestid) {
                return requests[i];
            }
        }
        return null;
    }
    /**
    * @param objs array
    * @param name string name of the model
    */
    EntitiesFromJson(objs, name) {
        var objArray = [];
        for (var i in objs) {
            objArray.push(this.EntityFromJson(objs[i], name));
        }
        return objArray;
    }
    findById(name, id, callback, error) {
        if (typeof (error) === 'undefined') {
            error = function () {
                console.error("findById : unable to get " + name + " id : " + id);
            };
        }
        if (id === 0) {
            error();
            return; // Don't need to make a request if we create an empty model
        }
        var $this = this;
        var fromCache = $this.getFromCache(name, id);
        if (fromCache !== null) {
            callback(fromCache);
            return;
        }
        // Prepare the query
        var request = new Request('Entity', name, id, {}, name, (data) => {
            if (!data['success']) {
                error();
                return;
            }
            var obj = this.EntityFromJson(data[name], name);
            callback(obj);
        }, error);
        // add the request to the list
        this.addGetRequest(request);
    }
    /**
    * @param obj string Name of the Entity (With CAPITAL LETTER first !!) User
    * @param success callback(array of Entity)
    * @param error callback
    */
    findAll(name, callback, error) {
        var $this = this;
        if (typeof (error) !== 'function') {
            error = function () { };
        }
        // Prepare the query
        var request = new Request('Entity', name, 0, {}, name, (data) => {
            if (!data['success']) {
                error();
                return;
            }
            var objs = this.EntitiesFromJson(data[name + 's'], name);
            callback(objs);
        }, error);
        // add the request to the list
        this.addGetRequest(request);
    }
    /**
    * Find some entites by calling a method from the controller
    * @param method string Method called in the server controller
    * @param name string Controller name (must be the same than the entity expected !), with capital letter
    * @param id number Can be used to pass args to the server controller
    * @param success callback(array of Entity)
    * @param error callback
    */
    findSome(method, name, id, params, callback, error) {
        var $this = this;
        if (typeof (error) !== 'function') {
            error = function () { };
        }
        // Prepare the query
        var request = new Request(name, method, id, params, name, (data) => {
            if (!data['success']) {
                error();
                return;
            }
            var objs = this.EntitiesFromJson(data[name + 's'], name);
            callback(objs);
        }, error);
        // add the request to the list
        this.addGetRequest(request);
    }
};
RepositoryService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [ajax_service_1.AjaxService, entityfactory_service_1.EntityFactory, url_service_1.UrlService])
], RepositoryService);
exports.RepositoryService = RepositoryService;
//# sourceMappingURL=repository.service.js.map