# NgReactiveDynamicForm

The Angular library simplifies the creation of reactive forms using JSON data. With a JSON object, developers can build forms with form controls, validations, and custom configurations efficiently. The library enables the creation of dynamic and interactive forms, saving time and enhancing code readability in Angular applications.

## Installation

Install via NPM, using the command below.

```
npm install ng-reactive-dynamic-form
```

## Getting started

Import the NgReactiveDynamicFormModule in your root application module:

```
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgReactiveDynamicFormModule } from 'ng-reactive-dynamic-form';

@NgModule({
  imports: [
    NgReactiveDynamicFormModule
  ]
})
export class AppModule { }
```

The Angular library allows easy creation of dynamic reactive forms by passing a JSON array to the <lib-ng-reactive-dynamic-form> component.

```
 <lib-ng-reactive-dynamic-form
    [formData]="form"
    (formSubmitted)="onSubmit($event)">
 </lib-ng-reactive-dynamic-form>

```

```
 export class AppComponent implements OnInit{
  public form: Array<FormDataModel> = [
      {
        fieldName: "checkbox 1", formControl: 'checkbox1', errorMsg: "checkbox is required", ErrorMsgDescription: "", 
        initalValue: "true", validation: false, inputType: "checkbox"
      },
      {
        fieldName: "Name", formControl: 'Name', errorMsg: "Name is required", ErrorMsgDescription: "", 
        initalValue: "Yowsif", validation: true, inputType: "text"
      },
      {
        fieldName: "checkbox 2", formControl: 'checkbox2', errorMsg: "checkbox is required", ErrorMsgDescription: "", 
        initalValue: "true", validation: false, inputType: "checkbox"
      },
      {
        fieldName: "number", formControl: 'number', errorMsg: "number is required", ErrorMsgDescription: "", 
        initalValue: 20, validation: true, inputType: "number"
      },
      {
        fieldName: "Job", formControl: 'password', errorMsg: "Job is required", ErrorMsgDescription: "", 
        initalValue: "Software engineer", validation: true, inputType: "password"
      },
    ];
  
  ngOnInit(): void {
  
  }

  onSubmit($event: any){
    console.log('$event', $event)
  }
}
```