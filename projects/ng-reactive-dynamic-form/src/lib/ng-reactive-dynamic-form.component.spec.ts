import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgReactiveDynamicFormComponent } from './ng-reactive-dynamic-form.component';

describe('NgReactiveDynamicFormComponent', () => {
  let component: NgReactiveDynamicFormComponent;
  let fixture: ComponentFixture<NgReactiveDynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgReactiveDynamicFormComponent]
    });
    fixture = TestBed.createComponent(NgReactiveDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
