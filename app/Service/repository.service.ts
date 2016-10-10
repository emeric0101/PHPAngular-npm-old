import { Injectable }  from '@angular/core';
import { AjaxService }  from './ajax.service';
import { UrlService }  from './url.service';
import { EntityFactory }  from './entityfactory.service';
import { Model } from '../Entity/AEntity';

class Request {
    private static globalrequestid = 1;
    private requestid;
    constructor(
        private controller : string,
        private method: string,
        private id : number,
        private params : any,
        private entity : string,
        private callback,
        private error : () => void = () => {}
    ) {
        this.requestid = Request.globalrequestid++;
    }
    getRequestId(){return this.requestid;}
    getId() {return this.id;}
    getController() {return this.controller;}
    getMethod() {return this.method;}
    getParams() {return this.params;}
    getEntity() {return this.entity;}
    getCallback(){return this.callback;}
    getError() {return this.error;}
}

@Injectable()
    export class RepositoryService{

        private entities = [];
        private requests : Request[] = [];
        private requestTimer = null;

        public constructor(
            private $ajax : AjaxService,
            private $entityFactory : EntityFactory,
            private $url : UrlService
        ) {}

        public clearCache() {
            this.entities = [];
        }
        getFromCache(name: string, id: number): Model {
            // Looking if it is into the cache ?
            if (typeof(this.entities[name]) === 'undefined' || typeof(this.entities[name][id]) === "undefined") {
                return null;
            }
            return this.entities[name][id];
        }

        /**
        * @param obj object
        * @param name string name of the model
        */
        EntityFromJson(obj : {}, name : string) {
            var entity = this.$entityFactory.create(name);
            if (entity == null) {
                throw "Unable to find entity : " + name;
            }
            entity.setValues(obj);
            // Add to the local cache
            if (typeof(this.entities[name]) === "undefined") {
                this.entities[name] = [];
            }
            this.entities[name][entity.getId()] = entity;

            return entity;
        }

        /** Add a request into the request list to be executed
        */
        private addGetRequest(request : Request) {
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
        private prepareRequests(requests : Request[]) {
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
        private runRequests(requests : Request[]) {
            let params = this.prepareRequests(requests);
            let observable = this.$ajax.post(this.$url.makeApi('Multiple', 'index'), params);
            observable.subscribe((d) => {
                if (typeof(d['Multiple']) === 'undefined') {
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
        private getRequestFromRequestId(requestid : number, requests : Request[]) {
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
        EntitiesFromJson(objs : {}[], name: string) {
            var objArray = [];
            for (var i in objs) {
                objArray.push(this.EntityFromJson(objs[i], name));
            }
            return objArray;
        }

        findById(name : string, id :number, callback : (obj : Model) => void, error? : () => void) {
            if (typeof(error) === 'undefined') {
                error = function() {
                    console.error("findById : unable to get " + name + " id : " + id);
                };
            }
            if (id === 0) {
                error()
                return; // Don't need to make a request if we create an empty model
            }
            var $this = this;

            var fromCache = $this.getFromCache(name, id);
            if (fromCache !== null) {
                callback(fromCache);
                return;
            }

            // Prepare the query
            var request = new Request(
                'Entity',
                name,
                id,
                {},
                name,
                (data) => {
                    if (!data['success']) {
                        error();
                        return;
                    }
                    var obj = this.EntityFromJson(data[name], name);
                    callback(obj);
                },
                error
            );
            // add the request to the list
            this.addGetRequest(request);
        }

        /**
        * @param obj string Name of the Entity (With CAPITAL LETTER first !!) User
        * @param success callback(array of Entity)
        * @param error callback
        */
        findAll(name : string, callback : (obj : Model[]) => void, error? : () => void) {
            var $this = this;
            if (typeof (error) !== 'function') {
                error = function() {};
            }

            // Prepare the query
            var request = new Request(
                'Entity',
                name,
                0,
                {},
                name,
                (data) => {
                    if (!data['success']) {
                        error();
                        return;
                    }
                    var objs = this.EntitiesFromJson(data[name + 's'], name);
                    callback(objs);
                },
                error
            );
            // add the request to the list
            this.addGetRequest(request);        }

        /**
        * Find some entites by calling a method from the controller
        * @param method string Method called in the server controller
        * @param name string Controller name (must be the same than the entity expected !), with capital letter
        * @param id number Can be used to pass args to the server controller
        * @param success callback(array of Entity)
        * @param error callback
        */
        findSome(method: string, name : string, id: number, params: any, callback : (obj : Model[]) => void, error? : () => void) {
            var $this = this;
            if (typeof (error) !== 'function') {
                error = function() {};
            }

            // Prepare the query
            var request = new Request(
                name,
                method,
                id,
                params,
                name,
                (data) => {
                    if (!data['success']) {
                        error();
                        return;
                    }
                    var objs = this.EntitiesFromJson(data[name + 's'], name);
                    callback(objs);
                },
                error
            );
            // add the request to the list
            this.addGetRequest(request);
        }

    }
