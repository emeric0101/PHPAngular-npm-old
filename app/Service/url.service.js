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
const common_1 = require('@angular/common');
let UrlService = class UrlService {
    constructor($location) {
        this.$location = $location;
    }
    /**
    * Redirect to another page with a message
    * @param module string Module target
    * @param action string Action on the module
    * @param id number Id
    * @param msg number Id
    * @param type number Id
    **/
    redirect(module, action, id, msg, type = 'success') {
        if (typeof (msg) !== 'undefined' && msg != '') {
            //this.$flash.create(msg, type);
            alert(msg);
        }
        if (action == '') {
            action = module;
        }
        this.$location.go(this.make(module, action, id));
    }
    /**
    * make an url for API json
    * @param module string Module target
    * @param action string Action on the module
    * @param id number Id
    * @param params object other params added with &param=value
    **/
    makeApi(module, action, id, params) {
        module = module['ucFirst']();
        var url = module;
        if (action !== "") {
            url += '/' + action;
            if (typeof (id) !== 'undefined' && id !== null) {
                url += '/' + id;
            }
        }
        url += '.json';
        if (typeof (params) !== 'undefined') {
            var first = true;
            for (var i in params) {
                if (first) {
                    url += "?";
                    first = false;
                }
                else {
                    url += "&";
                }
                url += i + "=" + params[i];
            }
        }
        return url;
    }
    /**
    * make an url for page
    * @param module string Module target
    * @param action string Action on the module
    * @param id number Id
    * @param params object Other var to add
    **/
    make(module, action = "", id, params = {}) {
        var url = module;
        if (action !== "") {
            url += '-' + action;
            if (typeof (id) !== 'undefined' && id !== null) {
                url += '-' + id;
            }
        }
        var first = true;
        for (var i in params) {
            if (first) {
                url += "?";
                first = false;
            }
            else {
                url += "&";
            }
            url += i + "=" + params[i];
        }
        return url;
    }
};
UrlService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [common_1.Location])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map