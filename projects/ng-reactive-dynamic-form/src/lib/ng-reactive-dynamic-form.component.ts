import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-ng-reactive-dynamic-form',
  template: `
    <div class="register-form">
  <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
    <ng-container *ngFor="let data of formData">
      <div class="form-group">
        <label for={{data.fieldName}} class="form-label"> {{ data.fieldName }}</label>
        <div class="input-section">
          <input type="text" [formControlName]="data.formControl" class="form-control" 
          [ngClass]="{ 'is-invalid': submitted && f[data.formControl].errors }"/>
          <div *ngIf="submitted && f[data.formControl]!.errors"  [ngClass]="{
            'is-invalid-form': submitted && f[data.formControl].errors,
            'invalid-feedback': !submitted || !f[data.formControl].errors}">
            <div class="is-invalid-form"> {{ data.ErrorMsg }}</div>
          </div>
        </div>
      </div>
    </ng-container>


    <div class="form-group">
      <button type="submit" class="btn btn-primary form-submit">Register</button>
      <button type="button" (click)="onReset()" class="btn btn-warning">
        Reset
      </button>
    </div>
  </form>
</div>
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

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData'] !== undefined) {
      this.formData.forEach((element: any) => {
        this.addDynamicControl(element.formControl, element.initalValue, element.validation)
      });
    }
  }

  addDynamicControl(formControl: string, initalValue: string, validation: boolean) {
    const control = new FormControl(initalValue, validation ? Validators.required : null);
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

