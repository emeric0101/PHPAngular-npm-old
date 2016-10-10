"use strict";
class Model {
    constructor(name) {
        this.name = name;
        this.isFromDb = false;
        this._foreignKeys = []; // List of all foreign keys requested
        this.changed = false; // all base values to detect change
    }
    getChanged() {
        return this.changed || !this.isFromDb;
    }
    setValue(name, value) {
        this.changed = true;
        this[name] = value;
    }
    getIsFromDb() {
        return this.isFromDb;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    /**
    * Get Entity from a foreignKey and put the entity into the value
    * @param field string The field of the key
    * @param success callback
    * @param error callback
    */
    foreignKeys(repositoryService, field) {
        var array = this[field];
        // If the value is not defined
        if (array === null) {
            return null;
        }
        if (array.length == 0) {
            return [];
        }
        for (var i in this[field]) {
            this.foreignKey(repositoryService, i, null, null, this[field]);
        }
        return this[field];
    }
    /**
    * Get Entity from a foreignKey and put the entity into the value
    * @param RepositoryService
    * @param field string The field of the key
    * @param success callback
    * @param error callback
    * @param obj object to apply the foreginkey
    */
    foreignKey(repositoryService, field, success, error, obj = null) {
        if (typeof (success) === 'function' || typeof (error) === 'function') {
            // Il faut ajouter un systeme qui mette en file les callback pour qu'ils soient rappelé un fois
            // l'objet chargé, car on peut demander 2x le chargement et l'objet arrive apres donc il faut
            // appeler les 2 callback !
            throw "NOT READY YET : foreignKey";
        }
        if (obj === null) {
            obj = this;
        }
        if ((obj[field] instanceof Model)) {
            return obj[field];
        }
        error = function () { };
        success = function () { };
        var $this = this;
        var value = obj[field];
        if (value === null) {
            return null;
        }
        // If the key is already requested (or requested)
        if ($this._foreignKeys.indexOf(field) !== -1) {
            return;
        }
        $this._foreignKeys.push(field);
        if (typeof (value['entity']) === 'undefined') {
            throw 'Model : foreignKey not an entity !';
        }
        var callbackSuccess = function (objReceived) {
            obj[field] = objReceived;
            success(objReceived);
        };
        repositoryService.findById(value['entity'], value['id'], callbackSuccess, error);
        return obj[field];
    }
    setValues(values) {
        for (var i in values) {
            var value = values[i];
            if (value !== null && typeof (value["class"]) === 'string') {
                if (value["class"] === 'datetime') {
                    // datetime
                    value = new Date(value['date']);
                }
                else {
                    throw "Unable to serialize : " + value['class'];
                }
            }
            this[i] = value;
        }
        this.isFromDb = true; // lock the model
    }
    // Update the entity from server
    update(repositoryService) {
        repositoryService.findById(this.name, this.id, (obj) => {
            this.setValues(obj);
        });
    }
}
exports.Model = Model;
//# sourceMappingURL=AEntity.js.map