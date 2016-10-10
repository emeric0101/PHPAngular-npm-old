import { Component } from '@angular/core';
import { UrlService }  from '../../../Service/url.service';
import { RepositoryService }  from '../../../Service/repository.service';
import { EntityManager }  from '../../../Service/entity.manager.service';
import { OnInit } from '@angular/core';
import { Model } from '../../../Entity/AEntity';
import { Test } from '../../../Entity/Test';

import "../../../rxjs-operators";

@Component({
  templateUrl: 'app/Component/demo/demo/demo.html',
  providers: [UrlService, RepositoryService]
})
export class DemoComponent implements OnInit  {
  title = 'Tour of Heroes';
  test = "";
  constructor(private $url : UrlService, private $repo : RepositoryService, private $em : EntityManager) {
  }
  ngOnInit () {
      this.test = this.$url.make('test');
      this.$repo.findAll('Test', (obj : Model[]) => {
          //console.log(obj);
      });
      console.log(new Test("Test"));
      console.log(this.$em);
  }
}
