import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppService } from '../../../../app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { RequestResult } from '../../../../shared/types/types';

@Component({
  selector: 'app-otp-validation',
  standalone: false,
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.css'
})
export class OtpValidationComponent implements OnInit, OnDestroy{
  otpForForgotPassword : boolean = false;
  changePasswordDialogue : boolean = false;
  userEmail! : string;
  otpValue! : string;
  countdown! : number;
  countDownInterval! : any;
  resetPasswordForm : FormGroup = new FormGroup({});
  verifyOtpSubscription! : Subscription;
  resendOtpSubscription! : Subscription;

  constructor(
    private userService : UserService,
    private router : Router,
    private messageService: MessageService,
    private appService: AppService,
    private customFormValidators : CustomFormValidators,
  ){}

  ngOnInit(): void {
    this.initiateCountdown();
    this.userEmail = this.userService.emailForOtpVerification;
    this.otpForForgotPassword = this.userService.otpForForgotPassword;

    this.resetPasswordForm = new FormGroup({
      newPassword : new FormControl('', [this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
      confirmNewPassword : new FormControl('',[this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
    });
  }

  otpVerification(){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.verifyOtpSubscription = this.userService.verifyOtp(this.userEmail, this.otpValue, this.otpForForgotPassword).subscribe({
      next : () => {
        if(!this.otpForForgotPassword){
          this.router.navigate(['user']);
          this.appService.updateDisplaySuccessToastSubject('OTP Verified Successfully');
        }
        else{
          this.changePasswordDialogue = true;
        }
      },
      error : (error) => {
        if(error.status === 401){
          this.appService.updateDisplayErrorToastSubject('Incorrect OTP');
        }
        else{
          throw(error);
        }      
      }
    });
  }
  
  resendOtpAction(){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.resendOtpSubscription = this.userService.resendOtp(this.userEmail, this.otpForForgotPassword ).subscribe({
      next : (result : any) => {
        this.initiateCountdown();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
      }
    });
  }

  initiateCountdown(){
    this.countdown = 60 * 3;
    this.countDownInterval = setInterval(() => {
      this.countdown--;
    }, 1000);
    setTimeout(() => {
      clearInterval(this.countDownInterval);
    }, 1000 * 60 * 3);
  }

  updatePassword(){
    if(this.resetPasswordForm.invalid){
      this.resetPasswordForm.controls['newPassword'].markAsDirty();
      this.resetPasswordForm.controls['confirmNewPassword'].markAsDirty();
      return;
    }
    
    if(this.resetPasswordForm.controls['newPassword'].value !== this.resetPasswordForm.controls['confirmNewPassword'].value){
      this.resetPasswordForm.get('confirmNewPassword')?.setErrors({error : 'Confirm password must match provided password'});
      return;
    }
    
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.userService.resetPassword( this.userEmail, this.resetPasswordForm.controls['newPassword'].value).subscribe({
      next : (requestResult : RequestResult) => {
        this.disableResetPasswordForm();
        this.appService.updateDisplaySuccessToastSubject(requestResult.message);
        this.router.navigate(['/','user']);
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: requestResult.message, life: 3000 });
      }
    });
  }

  disableResetPasswordForm(){
    this.changePasswordDialogue = false;
    this.resetPasswordForm.reset();
  }

  getErrorMessageForPassword(field : string){
    return this.resetPasswordForm.get(field)?.dirty && this.resetPasswordForm.get(field)?.errors ? this.resetPasswordForm.get(field)?.getError('error') : ''
  }

  ngOnDestroy(): void {    
    this.verifyOtpSubscription?.unsubscribe();
    this.resendOtpSubscription?.unsubscribe();
  }
}
