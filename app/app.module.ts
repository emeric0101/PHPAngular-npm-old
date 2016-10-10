import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';
import { MainComponent }  from './Component/Main/Main/Main';
import { DemoComponent }  from './Component/demo/demo/demo';
import { DemoComponent0 }  from './Component/demo/demo0/demo0';

import { AjaxService } from './Service/ajax.service';
import { UrlService } from './Service/url.service';
import { EntityFactory } from './Service/entityfactory.service';
import { RepositoryService } from './Service/repository.service';
import { EntityManager } from './Service/entity.manager.service';

import './function';

@NgModule({
    imports: [
      BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule
    ],
    declarations: [ MainComponent,DemoComponent,DemoComponent0 ],
    bootstrap:    [ MainComponent ],
    providers: [
        AjaxService,
        EntityFactory,
        UrlService,
        RepositoryService,
        EntityManager
    ]

})
export class AppModule { }
