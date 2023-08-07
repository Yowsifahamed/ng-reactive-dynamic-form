import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataModel } from './components/dynamic-form/form-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public form: Array<FormDataModel> = [
    {
      fieldName: "checkbox", formControl: 'checkbox1', errorMsg: "checkbox is required", ErrorMsgDescription: "", 
      initalValue: "true", validation: false, inputType: "checkbox"
    },
    {
      fieldName: "Name", formControl: 'Name', errorMsg: "Name is required", ErrorMsgDescription: "", 
      initalValue: "Yowsif", validation: true, inputType: "text"
    },
    {
      fieldName: "number", formControl: 'number', errorMsg: "number is required", ErrorMsgDescription: "", 
      initalValue: 20, validation: true, inputType: "number"
    },
    {
      fieldName: "password", formControl: 'password', errorMsg: "Password is required", ErrorMsgDescription: "", 
      initalValue: "Software engineer", validation: true, inputType: "password"
    },
  ];
  
  ngOnInit(): void {
  
  }

  onSubmit($event: any){
    console.log('$event', $event)
  }
}
