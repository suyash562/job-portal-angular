import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../validators/formValidators';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm! : FormGroup;
  customFormValidators! : CustomFormValidators;
  loginSubscription! : Subscription;
  
  constructor(
      private userService : UserService,
      private router : Router,
      private cookieService : CookieService
  ){}

  ngOnInit(): void {
    this.customFormValidators = new CustomFormValidators();

    this.loginForm = new FormGroup(
      {
        email : new FormControl('', [this.customFormValidators.validateEmail]),
        password : new FormControl('', [this.customFormValidators.validatePassword]),
      }
    );
  }

  getErrorMessage(field : string){
    return this.loginForm.get(field)?.dirty && this.loginForm.get(field)?.errors ? this.loginForm.get(field)?.getError('error') : ''
  }

  submitForm(){
    if(!this.loginForm.invalid){

      const user : Partial<User> = {
        email : this.loginForm.controls['email'].value,
        password : this.loginForm.controls['password'].value,
      }

      this.loginSubscription = this.userService.login(user).subscribe(
        {
          next : ()=>{
            alert('Login Successfull');
            sessionStorage.setItem('userToken','COOKIE');
            this.userService.userLoggedInSubject.next(true);
            this.router.navigate(['/jobs']);
          },
          error : (err)=>{
            console.log(err.error);
            alert('Login Failed');
          }
        }
      )
    }
    else{
      this.loginForm.get('email')?.markAsDirty();
      this.loginForm.get('password')?.markAsDirty();
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
