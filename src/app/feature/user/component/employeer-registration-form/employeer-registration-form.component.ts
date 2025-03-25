import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeer-registration-form',
  standalone: false,
  templateUrl: './employeer-registration-form.component.html',
  styleUrl: './employeer-registration-form.component.css'
})
export class EmployeerRegistrationFormComponent {
  // employeerCompanyForm = new FormGroup(
  //   {
      companyName = new FormControl('', Validators.required);
  //   }
  // );

  // getErrorMessage(field : string){

  // }
}
