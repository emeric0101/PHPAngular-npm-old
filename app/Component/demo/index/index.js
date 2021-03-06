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
const url_service_1 = require('../../Service/url.service');
const repository_service_1 = require('../..Service/repository.service');
const entity_manager_service_1 = require('../../../Service/entity.manager.service');
const Test_1 = require('../../../Entity/Test');
require("../../../rxjs-operators");
let DemoIndex = class DemoIndex {
    constructor($url, $repo, $em) {
        this.$url = $url;
        this.$repo = $repo;
        this.$em = $em;
        this.title = 'Tour of Heroes';
        this.test = "";
    }
    ngOnInit() {
        this.test = this.$url.make('test');
        this.$repo.findAll('Test', (obj) => {
            //console.log(obj);
        });
        console.log(new Test_1.Test(null));
        console.log(this.$em);
    }
};
DemoIndex = __decorate([
    core_1.Component({
        templateUrl: 'app/Component/demo/index/index.html',
        providers: [url_service_1.UrlService, repository_service_1.RepositoryService]
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof url_service_1.UrlService !== 'undefined' && url_service_1.UrlService) === 'function' && _a) || Object, (typeof (_b = typeof repository_service_1.RepositoryService !== 'undefined' && repository_service_1.RepositoryService) === 'function' && _b) || Object, entity_manager_service_1.EntityManager])
], DemoIndex);
exports.DemoIndex = DemoIndex;
var _a, _b;
//# sourceMappingURL=index.js.map