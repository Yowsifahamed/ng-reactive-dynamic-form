import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit{
  public form: Array<any> = [
    {
      fieldName: "full Name", formControl: 'fullName', ErrorMsg: "full Name is required", ErrorMsgDescription: "", 
      initalValue: "Yowsif"
    }
  ];

  public testing: string = "Test";
  
  ngOnInit(): void {
  }
}
