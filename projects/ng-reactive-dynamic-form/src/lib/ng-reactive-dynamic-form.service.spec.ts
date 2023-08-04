import { TestBed } from '@angular/core/testing';

import { NgReactiveDynamicFormService } from './ng-reactive-dynamic-form.service';

describe('NgReactiveDynamicFormService', () => {
  let service: NgReactiveDynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgReactiveDynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
