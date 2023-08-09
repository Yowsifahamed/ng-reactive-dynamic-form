# NgReactiveDynamicForm

The Angular library simplifies the creation of reactive forms using JSON data. With a JSON object, developers can build forms with form controls, validations, and custom configurations efficiently. The library enables the creation of dynamic and interactive forms, saving time and enhancing code readability in Angular applications.

## Installation

Install via NPM, using the command below.

```
npm install ng-reactive-dynamic-form
```
## Compatibility
ng-reactive-dynamic-form is compatible with the following versions of Angular:

```
Angular 16.1.8 and later
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
    [buttonData]="buttonData"
    (formSubmitted)="onSubmit($event)">
 </lib-ng-reactive-dynamic-form>

```

```
 export class AppComponent implements OnInit{
  public form: Array<any> = [
      {
        fieldName: "checkbox 1", 
        formControl: 'checkbox1', 
        errorMsg: "checkbox is required",  
        initalValue: "true",
        inputType: "checkbox",
        validation: false
      },
      {
        fieldName: "Name", 
        formControl: 'Name', 
        errorMsg: "Name is required",
        initalValue: "Yowsif", 
        inputType: "text",
        validation: true
      },
      {
        fieldName: "number", 
        formControl: 'number', 
        errorMsg: "number is required", 
        initalValue: 20, 
        inputType: "number",
        validation: true
      },
      {
        fieldName: "Job", 
        formControl: 'password', 
        errorMsg: "Job is required", 
        initalValue: "Software engineer", 
        inputType: "password",
        validation: true
      },
    ];
}
```

To get all the input data entered by the user from the form, you can use the #formValue object in the onSubmit function

```
  onSubmit(formValue: any){
    console.log('formValue', formValue)
  }
```

The primary button is a submit type button, and the secondary button is a reset button. You can customize the button names and their classes according to your requirements

```
  public buttonData = {
    primaryButton: {
      buttonName: "Submit",
      class: "submit-btn"
    },
    resetButon: {
      buttonName: "Reset",
      isVisible: true,
      class: "reset-btn"
    }
  }
```

## Default Locale Options

| Key |	Value
| --- | ---
| fieldName | Input field name
| formControl | Reactive form's form control (input)
| errorMsg | Error message
| initalValue | Initial value of the form control (input)
| inputType | Input type: text | checkbox | password | number
| placeholder | Placeholder of the form control (input)
| customInputClass | Customized class for form control (input)
| customLabelClass | Customized class for form control's label
| id | ID of the form control (input)
| validation | Boolean (true or false)


## License

[MIT License](LICENSE)