import { NgModule } from '@angular/core';
import { NgReactiveDynamicFormComponent } from './ng-reactive-dynamic-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NgReactiveDynamicFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NgReactiveDynamicFormComponent
  ]
})
export class NgReactiveDynamicFormModule { }
