import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/entity/user';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { RequestResult } from '../../../../shared/types/types';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  forgotPassword : boolean = false;
  displayOverlaySpinner : boolean = false; 
  loginForm! : FormGroup;
  customFormValidators! : CustomFormValidators;
  loginSubscription! : Subscription;
  
  constructor(
    private userService : UserService,
    private router : Router,
    private appService : AppService,
  ){}

  ngOnInit(): void {
    this.customFormValidators = new CustomFormValidators();

    this.loginForm = new FormGroup(
      {
        email : new FormControl('', [this.customFormValidators.validateEmail, this.customFormValidators.defaultValidator]),
        password : new FormControl('', [this.customFormValidators.defaultValidator]),
      }
    );
  }

  getErrorMessage(field : string){
    return this.loginForm.get(field)?.dirty && this.loginForm.get(field)?.errors ? this.loginForm.get(field)?.getError('error') : ''
  }

  enableForgotPassword(){
    this.forgotPassword = true;
    this.loginForm.removeControl('password');
  }

  disableForgotPassword(){
    this.loginForm.addControl('password', new FormControl('', [this.customFormValidators.defaultValidator]));
    this.forgotPassword = false;
  }

  submitForm(){
    if(!this.loginForm.invalid){
      if(this.forgotPassword){
        this.sendOTP();
      }
      else{
        this.login();
      }
    }
    else{
      this.loginForm.get('email')?.markAsDirty();
      this.loginForm.get('password')?.markAsDirty();
    }
  }

  login(){
    
    const user : Partial<User> = {
      email : this.loginForm.controls['email'].value,
      password : this.loginForm.controls['password'].value,
    }

    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.loginSubscription = this.userService.login(user).subscribe(
      {
        next : (requestResult : RequestResult)=>{
          sessionStorage.setItem('role', requestResult.value.role);
          sessionStorage.setItem('email', requestResult.value.email);
          this.userService.updateUserLoginStatus(true);
          this.appService.emitIsRedirectedFromDashboardSubject(false);
          this.router.navigate(['/jobs']);
        },
        error : (error) => {
          if(error.status === 401){
            this.appService.updateDisplayErrorToastSubject('Incorrect email or password');
          }
          else{
            throw(error);
          }
        }
      }
    )
  }

  sendOTP(){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.userService.checkIfEmailExistsAndSendOtp(this.loginForm.controls['email'].value).subscribe(
      {
        next : (requestResult : RequestResult)=>{
          
          this.userService.emailForOtpVerification = this.loginForm.controls['email'].value;
          this.userService.otpForForgotPassword = true;

          this.router.navigate(['user','validateOtp']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
