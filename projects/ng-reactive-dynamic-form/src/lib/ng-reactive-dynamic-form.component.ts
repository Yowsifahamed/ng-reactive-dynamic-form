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
        <label for="form-check-input" class="custom-label {{ data?.customLabelClass }}" *ngIf="data?.parentLabel"> {{ data?.parentLabel }} </label> 
        <div class="form-check">
          <div class="input-checkbox">
            <label class="form-check-label" [ngClass]="{ 'is-invalid-form': hasError(submitted, f[data?.formControl].errors) }">
              <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-check-input {{ data?.customInputClass }}"
              (change)="getSelectedCheckboxData($event, data);" [id]="data?.id"/> 
              {{ data?.fieldName }}
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
          <div class="input-section">
            <label class="form-label {{ data?.customLabelClass }}" for="form-control"> {{ data?.fieldName }}</label>
            <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-control {{ data?.customInputClass }}"
              [ngClass]="{ 'is-invalid': hasError(submitted, f[data?.formControl].errors) }" [placeholder]="data?.placeholder" [id]="data?.id"/>
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
      <button type="submit" class="btn btn-primary form-submit {{buttonData?.primaryButton?.class}}"> {{ buttonData?.primaryButton?.buttonName ? buttonData?.primaryButton?.buttonName : 'Submit' }}</button>
      <button type="button" (click)="onReset()" class="btn btn-warning {{buttonData?.resetButon?.class}}" *ngIf="buttonData?.resetButon?.enableResetButton"> {{ buttonData?.resetButon?.buttonName ? buttonData?.resetButon?.buttonName : 'Reset' }} </button>
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
  
              .is-invalid-form{
                  color: #dc3545;
              }
          }
  
          .form-submit{
              margin-right: 12px;
          }
      }
  
      .custom-label{
          margin-bottom: 8px;
      }
  
      .form-check{
          .input-checkbox{
              margin-bottom: 12px;
  
              .is-invalid-form{
                  color: #dc3545;
              }
          }
      }
  }`
  ]
})
export class NgReactiveDynamicFormComponent implements OnChanges {
  @Input() formData: any;
  @Input() buttonData: any;
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


