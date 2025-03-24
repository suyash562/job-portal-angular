import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../validators/formValidators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;
  customFormValidators! : CustomFormValidators;
  
  ngOnInit(): void {
    this.customFormValidators = new CustomFormValidators();

    this.loginForm = new FormGroup(
      {
        email : new FormControl('', [this.customFormValidators.validateEmail]),
        password : new FormControl('', [this.customFormValidators.validatePassword]),
      }
    );
  }

  submitForm(){
    console.log(this.loginForm);
    
  }
}
