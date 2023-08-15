import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataModel, characterValidation } from './form-data.model';
@Component({
  selector: 'lib-ng-reactive-dynamic-form',
  template: `
<div class="dynamic-form">
  <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
    <ng-container *ngFor="let data of formData">
      <ng-container *ngIf="data.inputType === 'checkbox'; else commonInputType">
        <label for="form-check-label" class="custom-label {{ data?.customLabelClass }}" *ngIf="data?.parentLabel"> {{ data?.parentLabel }} </label> 
        <div class="form-check">
          <div class="input-checkbox">
            <label class="form-check-label" [ngClass]="{ 'is-invalid-form': hasErrorFn(submitted, f[data?.formControl].errors) }">
              <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-check-input {{ data?.customInputClass }}"
              (change)="getSelectedCheckboxData($event, data);" [id]="data?.id"/> 
              {{ data?.fieldName }}
            </label>
            <div *ngIf="hasErrorFn(submitted, f[data?.formControl].invalid)" [ngClass]="{
              'is-invalid-form': hasErrorFn(submitted, f[data?.formControl].errors),
              'invalid-feedback': hasErrorFn(!submitted,!f[data?.formControl].invalid) }">
                <div class="is-invalid-form"> {{ data?.errorMsg }}</div>
              </div>
          </div>
        </div>
      </ng-container>
      <ng-template #commonInputType>
        <div class="form-group">
          <label for="form-control" class="form-label {{ data?.customLabelClass }}"> {{ data?.fieldName }}</label>
          <div class="input-section">
            <input [type]="data?.inputType" [formControlName]="data?.formControl" class="form-control {{ data?.customInputClass }}"
              [ngClass]="{ 'is-invalid': hasErrorFn(submitted, f[data?.formControl].errors) }" [placeholder]="data?.placeholder" [id]="data?.id"/>
            <div *ngIf="hasErrorFn(submitted, f[data?.formControl].invalid)" [ngClass]="{
            'is-invalid-form': hasErrorFn(submitted, f[data?.formControl].errors),
            'invalid-feedback': hasErrorFn(!submitted,!f[data?.formControl].invalid) }">
              <div class="is-invalid-form" *ngIf="f[data?.formControl].errors?.['required']"> {{ data?.errorMsg }}</div>
              <div *ngIf="f[data?.formControl].errors?.['minlength']">Username must be at least {{data?.characterValidation?.minLength}} characters long.</div>
              <div *ngIf="f[data?.formControl].errors?.['maxLength']">Username cannot exceed {{data?.characterValidation?.maxLength}} characters.</div>
            </div>
          </div>
        </div>
      </ng-template>
    </ng-container>

    <div class="form-group">
      <button type="submit" class="btn btn-primary form-submit {{buttonData?.primaryButton?.class}}"> {{ buttonData?.primaryButton?.buttonName ? buttonData?.primaryButton?.buttonName : 'Submit' }}</button>
      <button type="button" (click)="onReset()" class="btn btn-warning {{buttonData?.resetButon?.class}}" *ngIf="buttonData?.resetButon?.isVisible"> {{ buttonData?.resetButon?.buttonName ? buttonData?.resetButon?.buttonName : 'Reset' }} </button>
    </div>
  </form>
</div>
  `,
  styles: [
    `
    :root {
      --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      --bs-body-color: #212529;
      --bs-body-bg: #fff;
      --bs-secondary-color: rgba(33, 37, 41, 0.75);
      --bs-border-width: 1px;
      --bs-border-style: solid;
      --bs-border-radius: 0.375rem;
      --bs-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    label {
      display: inline-block;
    }

    button {
      border-radius: 0;
    }

    .form-label {
      margin-bottom: 0.5rem;
    }

    .form-text {
      margin-top: 0.25rem;
      font-size: 0.875em;
      color: var(--bs-secondary-color);
    }

    .form-control {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: var(--bs-body-color);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: var(--bs-body-bg);
      background-clip: padding-box;
      border: 1px solid #dee2e6;
      border-radius:  0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }


    .form-control:focus {
      color: var(--bs-body-color);
      background-color: var(--bs-body-bg);
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    .form-check {
      display: block;
      min-height: 1.5rem;
      padding-left: 1.5em;
      margin-bottom: 0.125rem;
    }
    .form-check .form-check-input {
      float: left;
      margin-left: -1.5em;
    }

    .form-check-input {
      --bs-form-check-bg: var(--bs-body-bg);
      width: 1em;
      height: 1em;
      margin-top: 0.25em;
      vertical-align: top;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: var(--bs-form-check-bg);
      background-image: var(--bs-form-check-bg-image);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      border: 1px solid #dee2e6;
    }
    .form-check-input[type=checkbox] {
      border-radius: 0.25em;
    }
    .form-check-input[type=radio] {
      border-radius: 50%;
    }
    .form-check-input:active {
      filter: brightness(90%);
    }
    .form-check-input:focus {
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    .form-check-input:checked {
      background-color: #0d6efd;
      border-color: #0d6efd;
    }
    .form-check-input:checked[type=checkbox] {
      --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
    }
    .form-check-input:checked[type=radio] {
      --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
    }
    .form-check-input[type=checkbox]:indeterminate {
      background-color: #0d6efd;
      border-color: #0d6efd;
      --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
    }
    .form-check-input:disabled {
      pointer-events: none;
      filter: none;
      opacity: 0.5;
    }
    .form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {
      cursor: default;
      opacity: 0.5;
    }

    .form-check-inline {
      display: inline-block;
      margin-right: 1rem;
    }

    .btn-check {
      position: absolute;
      clip: rect(0, 0, 0, 0);
      pointer-events: none;
    }
    .btn-check[disabled] + .btn, .btn-check:disabled + .btn {
      pointer-events: none;
      filter: none;
      opacity: 0.65;
    }
    .input-group {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      width: 100%;
    }

    .btn {
      --bs-btn-padding-x: 0.75rem;
      --bs-btn-padding-y: 0.375rem;
      --bs-btn-font-family: ;
      --bs-btn-font-size: 1rem;
      --bs-btn-font-weight: 400;
      --bs-btn-line-height: 1.5;
      --bs-btn-color: var(--bs-body-color);
      --bs-btn-bg: transparent;
      --bs-btn-border-width: 1px;
      --bs-btn-border-color: transparent;
      --bs-btn-border-radius: var(--bs-border-radius);
      --bs-btn-hover-border-color: transparent;
      --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
      --bs-btn-disabled-opacity: 0.65;
      --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
      display: inline-block;
      padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
      font-family: var(--bs-btn-font-family);
      font-size: var(--bs-btn-font-size);
      font-weight: var(--bs-btn-font-weight);
      line-height: var(--bs-btn-line-height);
      color: var(--bs-btn-color);
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
      border-radius:  0.375rem;
      background-color: var(--bs-btn-bg);
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .btn:hover {
      color: var(--bs-btn-hover-color);
      background-color: var(--bs-btn-hover-bg);
      border-color: var(--bs-btn-hover-border-color);
    }
    .btn-check + .btn:hover {
      color: var(--bs-btn-color);
      background-color: var(--bs-btn-bg);
      border-color: var(--bs-btn-border-color);
    }
    .btn:focus-visible {
      color: var(--bs-btn-hover-color);
      background-color: var(--bs-btn-hover-bg);
      border-color: var(--bs-btn-hover-border-color);
      outline: 0;
      box-shadow: var(--bs-btn-focus-box-shadow);
    }
    .btn-check:focus-visible + .btn {
      border-color: var(--bs-btn-hover-border-color);
      outline: 0;
      box-shadow: var(--bs-btn-focus-box-shadow);
    }
    .btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
      color: var(--bs-btn-active-color);
      background-color: var(--bs-btn-active-bg);
      border-color: var(--bs-btn-active-border-color);
    }
    .btn-check:checked + .btn:focus-visible, :not(.btn-check) + .btn:active:focus-visible, .btn:first-child:active:focus-visible, .btn.active:focus-visible, .btn.show:focus-visible {
      box-shadow: var(--bs-btn-focus-box-shadow);
    }

    .btn-primary {
      --bs-btn-color: #fff;
      --bs-btn-bg: #0d6efd;
      --bs-btn-border-color: #0d6efd;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #0b5ed7;
      --bs-btn-hover-border-color: #0a58ca;
      --bs-btn-focus-shadow-rgb: 49, 132, 253;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #0a58ca;
      --bs-btn-active-border-color: #0a53be;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #0d6efd;
      --bs-btn-disabled-border-color: #0d6efd;
    }

    .btn-secondary {
      --bs-btn-color: #fff;
      --bs-btn-bg: #6c757d;
      --bs-btn-border-color: #6c757d;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #5c636a;
      --bs-btn-hover-border-color: #565e64;
      --bs-btn-focus-shadow-rgb: 130, 138, 145;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #565e64;
      --bs-btn-active-border-color: #51585e;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #6c757d;
      --bs-btn-disabled-border-color: #6c757d;
    }

    .btn-warning {
      --bs-btn-color: #000;
      --bs-btn-bg: #ffc107;
      --bs-btn-border-color: #ffc107;
      --bs-btn-hover-color: #000;
      --bs-btn-hover-bg: #ffca2c;
      --bs-btn-hover-border-color: #ffc720;
      --bs-btn-focus-shadow-rgb: 217, 164, 6;
      --bs-btn-active-color: #000;
      --bs-btn-active-bg: #ffcd39;
      --bs-btn-active-border-color: #ffc720;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #000;
      --bs-btn-disabled-bg: #ffc107;
      --bs-btn-disabled-border-color: #ffc107;
    }
    
    .dynamic-form{
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
        this.addDynamicControl(element.formControl, element.initalValue, element.validation, element.inputType, element.characterValidation)
      });
    }
  }

  public addDynamicControl(formControl: string, initialValue: string | boolean | number, validation: boolean, inputType: string, charValidaion: characterValidation): void {
    this.dynamicForm.addControl(formControl, this.buildFormControl(initialValue, validation, inputType === 'checkbox' ? Validators.requiredTrue : this.characterValidation(validation, charValidaion)));
  }

  public buildFormControl(initialValue: string | boolean | number, validation: boolean, validators: Validators){
    const control = new FormControl(initialValue, validation ? validators : new FormControl(initialValue))
    return control;
  }

  public characterValidation(validation: boolean, charValidaion: characterValidation){
    let validationCollection: any;
    if (validation && charValidaion?.requried) {
      return validationCollection = [Validators.required, Validators.minLength(charValidaion.minLength), Validators.maxLength(charValidaion.maxLength)]
    }else if (!validation && charValidaion?.requried) {
      return validationCollection = [Validators.minLength(charValidaion.minLength), Validators.maxLength(charValidaion.maxLength)]
    }else if (validation && !charValidaion?.requried) {
      return validationCollection = Validators.required;
    }
    return '';
  }
  
  public getSelectedCheckboxData($event: any, data: FormDataModel): void {
    const formControl: FormGroup = this.dynamicForm.get(data?.formControl) as FormGroup;
    formControl.setValue($event.target.checked);
  }
  

  get f(): { [key: string]: AbstractControl } {
    return this.dynamicForm.controls;
  }

  public hasErrorFn(btnSubmit: boolean, control: any ){
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


