import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataModel } from './form-data.model';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Output() formSubmitted: EventEmitter<string> = new EventEmitter<string>();

  dynamicForm: FormGroup = this.formBuilder.group({});
  
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
 
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData'] !== undefined) {
      this.formData.forEach((element:FormDataModel) => {
        this.addDynamicControl(element.formControl, element.initalValue, element.validation, element.inputType)
      });
    }
  }

  public addDynamicControl(formControl: string, initialValue: string | boolean | number, validation: boolean, inputType: string): void {
    this.dynamicForm.addControl(formControl, this.buildFormControl(initialValue, validation, inputType === 'checkbox' ? Validators.requiredTrue : Validators.required));
  }

  public buildFormControl(initialValue: string | boolean | number, validation: boolean, validators: Validators){
    let control = new FormControl(initialValue, validation ? validators : new FormControl(initialValue))
    return control;
  }
  
  public getSelectedCheckboxData($event: any, data: FormDataModel): void {
    const formControl: FormGroup = this.dynamicForm.get(data?.formControl) as FormGroup;
    formControl.setValue($event.target.checked);
  }
  

  get f(): { [key: string]: AbstractControl } {
    return this.dynamicForm.controls;
  }

  public hasError(btnSubmit: boolean, control: any ){
    return btnSubmit && control;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.dynamicForm.invalid) {
      return;
    }

    this.formSubmitted.emit(this.dynamicForm.value)
  }

  onReset(): void {
    this.submitted = false;
    this.dynamicForm.reset();
  }
}
