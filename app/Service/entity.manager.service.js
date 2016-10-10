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
const AEntity_1 = require('../Entity/AEntity');
const ajax_service_1 = require('./ajax.service');
const url_service_1 = require('./url.service');
const repository_service_1 = require('./repository.service');
let EntityManager = class EntityManager {
    constructor($ajax, $url, $repo) {
        this.$ajax = $ajax;
        this.$url = $url;
        this.$repo = $repo;
        this.persistObjs = [];
    }
    getPersistObjs() {
        return this.persistObjs;
    }
    /** Clear all the persist entities */
    clear() {
        this.persistObjs = [];
    }
    save(obj, callback) {
        var objs = {};
        var dataToSend = {};
        // if not change in the object
        if (!obj.getChanged()) {
            callback(true);
            return;
        }
        for (var i in obj) {
            var value = obj[i];
            // Excludes :
            if (value === null || typeof (value) === 'undefined') {
                continue;
            }
            // array of model
            if ((typeof (value) === 'array' || typeof (value) === 'object') && value.length > 0 && typeof (value[0].getId) === 'function') {
                // We must linearise the array of object
                for (var objIndex in value) {
                    value[objIndex] = value[objIndex].getId();
                }
            }
            if (typeof (value) === 'function') {
                continue;
            }
            // Entity (instanceof ne marche pas toujours)
            if (typeof (value.getId) === 'function') {
                value = value.getId();
            }
            if (typeof (value) === 'object' && typeof (value.entity) === 'string') {
                value = value.id;
            }
            objs[i] = value;
        }
        dataToSend[obj.getName()] = objs;
        let url = this.$url.makeApi(obj.getName(), 'post', obj.getId());
        this.$ajax.post(url, dataToSend).subscribe(r => {
            var data = r['data'];
            if (data.success !== true) {
                callback(false);
                return;
            }
            // Si on doit mettre à jour l'objet
            if (typeof (data[obj.getName()]) !== 'undefined') {
                // rSync object
                var nobj = this.$repo.EntityFromJson(data[obj.getName()], obj.getName());
                for (var i in nobj) {
                    obj[i] = nobj[i];
                }
            }
            callback(true);
        }, () => {
            callback(false);
        });
    }
    /**
    * Synchronise all object with server and db
    * @param callback (result) => void
    * @param autoclear Avoid autoclear of persisted entities
    */
    flush(callback, autoclear = true) {
        this.$repo.clearCache();
        if (typeof (callback) === "undefined") {
            callback = (r) => { };
        }
        if (this.persistObjs.length === 0) {
            return;
        }
        var persistObjs = this.persistObjs;
        // Clear all persist obj
        if (autoclear) {
            this.clear();
        }
        var i = 0;
        var magicFunction = (response) => {
            if (!response) {
                callback(false);
                return;
            }
            i++;
            if (i >= persistObjs.length) {
                callback(true);
                return;
            }
            this.save(persistObjs[i], magicFunction);
        };
        // Init recurrence
        this.save(persistObjs[0], magicFunction);
    }
    persist(obj, exclude = []) {
        // check existence
        if (typeof (this.persistObjs.find(item => item == obj)) !== 'undefined') {
            return;
        }
        // Looking for inheritance
        exclude.push(obj);
        var checkForEntity = (v) => {
        };
        for (var j in obj) {
            let v = obj[j];
            // Avoid infinite looping by having the same object in the sub object
            if (typeof (exclude.find(item => item == v)) !== 'undefined') {
                continue;
            }
            if (v instanceof AEntity_1.Model) {
                this.persist(v, exclude); // add the new object
                continue;
            }
            continue;
        }
        this.persistObjs.push(obj);
    }
};
EntityManager = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [ajax_service_1.AjaxService, url_service_1.UrlService, repository_service_1.RepositoryService])
], EntityManager);
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.manager.service.js.map