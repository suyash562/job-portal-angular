import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  nextUrlForExitFromOtpComponentSubscription! : Subscription;

  constructor(
    private userService : UserService,
    private router : Router,
    private messageService: MessageService,
    private appService: AppService,
    private customFormValidators : CustomFormValidators,
    private confirmationService : ConfirmationService
  ){}

  ngOnInit(): void {
    this.initiateCountdown();
    this.userEmail = this.userService.emailForOtpVerification;
    this.otpForForgotPassword = this.userService.otpForForgotPassword;

    this.nextUrlForExitFromOtpComponentSubscription = this.userService.nextUrlForExitFromOtpComponentObservable.subscribe({
      next : (nextUrl) => {
        if(nextUrl != ''){ 
          this.confirmExitFromComponentDialogue(nextUrl);
        }
      }
    });

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
          this.userService.exitFromOtpComponent = true;
          this.userService.updateNextUrlForExitFromOtpComponent('');
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
        this.userService.exitFromOtpComponent = true;
        this.userService.updateNextUrlForExitFromOtpComponent('');
        this.router.navigate(['/','user']);
      }
    });
  }

  confirmExitFromComponentDialogue(nextUrl : string){
      this.confirmationService.confirm({
        message: 'Cancel OTP verification ?',
        header: 'Cancel',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-info-circle',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'contrast',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Ok',
            severity: 'contrast',
        },
        accept: () => {          
          this.userService.exitFromOtpComponent = true;
          this.userService.updateNextUrlForExitFromOtpComponent('');
          this.router.navigate([nextUrl]);
        },
    })
    
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
    this.nextUrlForExitFromOtpComponentSubscription.unsubscribe();
  }
}
