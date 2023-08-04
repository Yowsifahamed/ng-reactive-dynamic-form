import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public form: Array<any> = [
    {
      fieldName: "Name", formControl: 'Name', ErrorMsg: "Name is required", ErrorMsgDescription: "", 
      initalValue: "Yowsif", validation: true
    },
    {
      fieldName: "Job", formControl: 'Job', ErrorMsg: "Job is required", ErrorMsgDescription: "", 
      initalValue: "Software engineer", validation: true
    }
  ];
  
  ngOnInit(): void {
  
  }

  onSubmit($event: any){
    console.log('$event', $event)
  }
}
