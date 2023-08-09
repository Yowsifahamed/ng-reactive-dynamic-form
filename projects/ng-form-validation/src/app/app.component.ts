import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataModel, checkBoxFormDataModel } from './components/dynamic-form/form-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public form: Array<FormDataModel | checkBoxFormDataModel> = [
    {
      fieldName: "checkbox", 
      formControl: "checkbox1", 
      errorMsg: "checkbox is required", 
      initalValue: true, 
      inputType: "checkbox", 
      parentLabel : "",
      customInputClass: "checkbox",
      customLabelClass: "checkbox_label",
      id: "checkbox_label",
      validation: true
    },
    {
      fieldName: "Name", 
      formControl: "Name", 
      errorMsg: "Name is required", 
      initalValue: "Yo", 
      inputType: "text",
      placeholder: "Enter name",
      customInputClass: "input_name_form_control",
      customLabelClass: "checkbox_label",
      id: "checkbox_label",
      validation: true, 
      characterValidation: {
        requried: true,
        minLength: 3,
        maxLength: 10
      }
    },
    {
      fieldName: "number", 
      formControl: "number", 
      errorMsg: "number is required", 
      initalValue: 20, 
      inputType: "number",
      placeholder: "Enter number",
      customInputClass: "input_number_form_control",
      customLabelClass: "checkbox_label",
      id: "checkbox_label",
      validation: true,
      characterValidation: {
        requried: true,
        minLength: 3,
        maxLength: 10
      }
    },
    {
      fieldName: "password", 
      formControl: "password", 
      errorMsg: "Password is required", 
      initalValue: "So", 
      inputType: "password",
      placeholder: "Enter password",
      customInputClass: "input_password_form_control",
      customLabelClass: "checkbox_label",
      id: "checkbox_label",
      validation: true, 
      characterValidation: {
        requried: true,
        minLength: 3,
        maxLength: 10
      }
    },
  ];

  public buttonData = {
    primaryButton: {
      buttonName: "Submit",
      class: "submit-btn"
    },
    resetButon: {
      buttonName: "Reset",
      class: "reset-btn",
      isVisible: true
    }
  }
  
  ngOnInit(): void {
  
  }

  onSubmit($event: any){
    console.log('$event', $event)
  }
}
