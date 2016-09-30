import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DemoComponent }  from './Component/demo/demo/demo';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    DemoComponent
  ],
  bootstrap: [ DemoComponent ]
})
export class AppModule { }
