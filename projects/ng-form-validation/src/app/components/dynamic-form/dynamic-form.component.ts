import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
      this.formData.forEach((element:any) => {
        this.addDynamicControl(element.formControl, element.initalValue, element.validation)
      });
    }
  }

  addDynamicControl(formControl: string, initalValue: string, validation: boolean) {
    const control = new FormControl(initalValue, Validators.required);
    this.dynamicForm.addControl(formControl, control);
  }
  

  get f(): { [key: string]: AbstractControl } {
    return this.dynamicForm.controls;
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
