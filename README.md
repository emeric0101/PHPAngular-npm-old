# PHPAngular npm package

## The simpliest way to angularise the world !

### Changelog

### Features
- EntityManager (like doctrine)
- User login
- Combine multiple get request into one
- Angular 2

### Todo
- [ ] Combine post request into one
- [ ] exclude typescript files from vendor
- [ ] auto install all dependencies (concurrently, tsc)

### Samples
This website uses my library:
https://www.amelieferrari.fr
http://www.agencelessismore.fr

### Installation
#### Installation of the PHP Server application

First you have to setup the server side application : [Installation PHPAngular PHP Side](https://github.com/emeric0101/PHPAngular/blob/master/README.md)

#### PHPAngularisation !

Create a package file package.json
```javascript
{
  "name": "phpangular-test",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\"",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "phpangular": "phpangular",
    "typings": "typings",
    "test": "tsc && concurrently \"tsc -w\" \"karma start karma.conf.js\""
  },
  "dependencies": {
    "concurrently": "^3.1.0",
    "phpangular": "^1.0.1"
  }
}

```
Create a tsconfig.js file
```javascript
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  	"exclude": [
		"vendor/*",
		"node_modules/*"
	]

```

Create a typings.js file
```javascript
{
  "globalDependencies": {
    "jasmine": "registry:dt/jasmine#2.5.0+20161003201800",
    "node": "registry:dt/node#6.0.0+20161008175459"
  }
}

```

Create a systemjs.config.js file
```javascript
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
	  'phpangular':	'npm:phpangular'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
	  phpangular: {
		defaultExtension: 'js'  
	  },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);

```

Run the script

```
npm install
phpangular install

```

### Usage
The server side is in the "src" folder. Check https://github.com/emeric0101/PHPAngular/blob/master/README.md for how to use it.
Like in a Angular2 project, we have to create Component in the "app/Component" folder.
Your directory structure must be "app/Component/{MODULE}/{COMPONENT}". You can call {MODULE} and {COMPONENT} like you want but the class name must be {MODULE}{COMPONENT} (with camelcase !!).
Sample : "app/Component/Forum/Post", the class must be called "ForumPost". Except if the module and component have to same name, in this case, the class name is the module name : app/Component/Index/Index gives Index class.

PHPAngular need a index module in app/Component/Index/Index. So we will create a index component.
- Create all directories (app, Component, Index, Index).
- Create all files : Index.ts, Index.html
Open Index.html and put :
```HTML
<h1>Hello World!</h1>
```

Open Index.ts and put :
```Typescript

import { Component } from '@angular/core';
@Component({
  templateUrl: 'app/Component/Index/Index/Index.html'
})
export class Index {

}

```

Then use
```
    npm phpangular createRoute
    npm run tsc
```

##### Repository

```Typescript
    // extract
    import { Message } from '../../../Entity/Message';
    import { UrlService } from 'phpangular/Service/url.service';
    import { EntityManager } from 'phpangular/Service/entity.manager.service';
    import { RepositoryService } from 'phpangular/Service/repository.service';
    class Index {
        message : Message = null;
        messages : Message[] = [];
        getMessage() {
            this.$repo.findAll('Message', (messages) => {
                this.messages = <Message[]>messages;
            };
        }
        createMessage() {
            this.message = new Message(this.$repo);
            this.message.setTitle("test");
            this.message.setDescription("test");
            this.$em.persist(this.message);
            this.$em.flush();
        }
        constructor(
            private $url : UrlService,
            private $em : EntityManager,
            private $repo :RepositoryService
        ){

        }
    }

}
```
> The entityManager is like doctrine entityManager (so it automaticly persists all entities linked to)

> You can use MainController::message directly as ng-model in the template (ng-model="ctrl.message.title")

For using this controller into the template, you just need to call it with ng-controller="MainController as ctrl".

##### Custom query

You may use custom query to get entities from the server. The repository service permits you to do this by the method findSome
```Typescript
findSome(
    method: string, // The method you want into the controller
    name : string, // The controller to call in the server (MUST BE THE SAME NAME THAN THE ENTITY REQUESTED)
    id: number, // Args to pass to the controller
    params: any, // Get params to the controller (if id is not enough)
    callback : (obj : any[]) => void, // callback to call after (because async)
    error? : () => void
) {
```

In the controller (PHP) :
```PHP
public function someFunction($id = 0) {
    if ($id == 0) {
        $this->response->setError("missing id");
        return false;
    }
    $message = $this->entityManager->find("TestVendor\TestBundle\Entity\Message", $id);
    $this->response->setResponse('Message', $message);
}
```
Obviously, this method is useless because it does exactly the same as findById().

#### Angular module
You can use some angular modules by adding them into phpangularmodules (web/config.ts).
It is like doing `angular.module('somemodule', phpangularmodules);`

```javascript
var phpangularmodules = ['angular-file-upload', 'anguar-recaptcha'];
```

#### User loggin
##### Server side
You just have to create an entity which implement IUser (don't forget to extends EntityAbstract)
```PHP
namespace Emeric0101\PHPAngular\Entity;
use Emeric0101\PHPAngular\Entity\EntityAbstract;

interface IUser
{
    public function setMail($mail);
    public function getMail();


    public function getPassword();
    public function setHashedPassword(string $p);
}
```

PHPAngular provide login and logout method by the controller "Login". But you have to create the user subscribe yourself.
In Emeric0101\PHPAngular\Service\Login, you have some methods which help you to check user account.
For password hash, you can use Emeric0101\PHPAngular\Service\Login::hashPassword(string)

##### Client side
You have to implement IUser too (but the entity MUST be the same than the server !!!)
Like the server side, you have a Login service which provide you all methods you'll need for user login and logout.
