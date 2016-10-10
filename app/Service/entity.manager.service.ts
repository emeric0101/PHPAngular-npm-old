import { Injectable }  from '@angular/core';
import { Model } from '../Entity/AEntity';

import { AjaxService }  from './ajax.service';
import { UrlService }  from './url.service';
import { RepositoryService }  from './repository.service';
@Injectable()
export class EntityManager {

    public constructor(
        private $ajax : AjaxService,
        private $url : UrlService,
        private $repo : RepositoryService
    ) {}

    private persistObjs : Model[] = [];

    public getPersistObjs() {
        return this.persistObjs;
    }
    /** Clear all the persist entities */
    public clear() {
        this.persistObjs = [];
    }

    private save(obj : Model, callback : (result) => void) {
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
            if (value === null || typeof(value) === 'undefined') {
                continue;
            }
            // array of model
            if ((typeof(value) === 'array' || typeof(value) === 'object') && value.length > 0 && typeof(value[0].getId) === 'function'){
                // We must linearise the array of object
                for (var objIndex in value) {
                    value[objIndex] = value[objIndex].getId();
                }
            }
            if (typeof(value) === 'function') {continue;}
            // Entity (instanceof ne marche pas toujours)
            if (typeof(value.getId) === 'function') {
                value = value.getId();
            }
            if (typeof(value) === 'object' && typeof(value.entity) === 'string') {
                value = value.id;
            }
            objs[i] = value;
        }
        dataToSend[obj.getName()] = objs;
        let url = this.$url.makeApi(obj.getName(), 'post', obj.getId());
        this.$ajax.post(url, dataToSend).subscribe(
            r => {
                var data = r['data'];
                if (data.success !== true) {
                    callback(false);
                    return;
                }

                // Si on doit mettre à jour l'objet
                if (typeof(data[obj.getName()]) !== 'undefined') {
                    // rSync object
                    var nobj = this.$repo.EntityFromJson(data[obj.getName()], obj.getName());
                    for (var i in nobj) {
                        obj[i] = nobj[i];
                    }
                }

                callback(true);
            },
            () => {
                callback(false);
            }
        );
    }

    /**
    * Synchronise all object with server and db
    * @param callback (result) => void
    * @param autoclear Avoid autoclear of persisted entities
    */
    public flush(callback? : (result) => void, autoclear = true) {
        this.$repo.clearCache();
        if (typeof (callback) === "undefined") {
            callback = (r) => {};
        }
        if (this.persistObjs.length === 0) { return;}

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
            if (i>=persistObjs.length) { // break condition
                callback(true);
                return;
            }
            this.save(persistObjs[i], magicFunction)
        };
        // Init recurrence
        this.save(persistObjs[0], magicFunction)

    }

    public persist(obj : Model, exclude : Model[] = []) {
        // check existence
        if (typeof(this.persistObjs.find(item => item == obj)) !== 'undefined') {
            return;
        }
        // Looking for inheritance
        exclude.push(obj);
        var checkForEntity = (v : any) => {

        };
        for (var j in obj) {
            let v = obj[j];
            // Avoid infinite looping by having the same object in the sub object
            if (typeof(exclude.find(item => item == v)) !== 'undefined') {
                continue;
            }
            if (v instanceof Model) {
                this.persist(v, exclude); // add the new object
                continue;
            }
            continue;
        }

        this.persistObjs.push(obj);

    }
}
