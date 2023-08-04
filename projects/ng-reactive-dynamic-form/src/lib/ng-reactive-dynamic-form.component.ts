import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataModel } from './form-data.model';

@Component({
  selector: 'lib-ng-reactive-dynamic-form',
  template: `
    <div class="register-form">
  <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
    <ng-container *ngFor="let data of formData">
      <ng-container *ngIf="data.inputType === 'checkbox'; else commonInputType">
        <div class="form-check">
          <div class="input-checkbox">
            <label class="form-check-label" [ngClass]="{ 'is-invalid-form': hasError(submitted, f[data?.formControl].errors) }">
              <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-check-input"
              (change)="getSelectedCheckboxData($event, data);"/> 
              {{ data?.fieldName }} value  {{ f[data?.formControl].value}}
            </label>
            <div *ngIf="hasError(submitted, f[data?.formControl].errors)" [ngClass]="{
              'is-invalid-form': hasError(submitted, f[data?.formControl].errors),
              'invalid-feedback': hasError(!submitted,!f[data?.formControl].invalid) }">
                <div class="is-invalid-form"> {{ data?.errorMsg }}</div>
              </div>
          </div>
        </div>
      </ng-container>
      <ng-template #commonInputType>
        <div class="form-group">
          <label class="form-label" [for]="data?.fieldName"> {{ data?.fieldName }}</label>
          <div class="input-section">
            <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-control"
              [ngClass]="{ 'is-invalid': hasError(submitted, f[data?.formControl].errors) }" />
            <div *ngIf="hasError(submitted, f[data?.formControl].errors)" [ngClass]="{
            'is-invalid-form': hasError(submitted, f[data?.formControl].errors),
            'invalid-feedback': hasError(!submitted,!f[data?.formControl].invalid) }">
              <div class="is-invalid-form"> {{ data?.errorMsg }}</div>
            </div>
          </div>
        </div>
      </ng-template>
    </ng-container>

    <div class="form-group">
      <button type="submit" class="btn btn-primary form-submit">Register</button>
      <button type="button" (click)="onReset()" class="btn btn-warning">
        Reset
      </button>
    </div>
  </form>
</div>

<!-- <pre> {{ dynamicForm.value | json }}</pre> -->
<!-- <pre> {{ formData | json }}</pre> -->
  `,
  styles: [
    `.register-form{
      .form-group{
          .form-label{
              font-weight: 700;
          }
  
          .input-section{
              margin-bottom: 12px;
              .form-control{
                  
              }
  
              .is-invalid-form{
                  color: #dc3545;
              }
          }
  
          .form-submit{
              margin-right: 12px;
          }
      }
  }`
  ]
})
export class NgReactiveDynamicFormComponent implements OnChanges {
  @Input() formData: any;
  @Output() formSubmitted: EventEmitter<string> = new EventEmitter<string>();

  dynamicForm: FormGroup = this.formBuilder.group({});
  
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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
    const control = new FormControl(initialValue, validation ? validators : new FormControl(initialValue))
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


