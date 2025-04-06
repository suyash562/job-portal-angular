import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-otp-validation',
  standalone: false,
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.css'
})
export class OtpValidationComponent implements OnInit, OnDestroy{
  userEmail! : string;
  otpValue! : string;
  countdown! : number;
  countDownInterval! : any;
  verifyOtpSubscription! : Subscription;
  resendOtpSubscription! : Subscription;

  constructor(
    private userService : UserService,
    private router : Router,
    private messageService: MessageService,
    private appService: AppService,
  ){}

  ngOnInit(): void {
    this.initiateCountdown();
    this.userEmail = this.userService.userEmailForOtpVerification;
  }

  otpVerification(){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.verifyOtpSubscription = this.userService.verifyOtp(this.userEmail, this.otpValue).subscribe({
      next : () => {
        this.router.navigate(['user']);
      }
    });
  }
  
  resendOtpAction(){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.resendOtpSubscription = this.userService.resendOtp(this.userEmail).subscribe({
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

  ngOnDestroy(): void {    
    this.verifyOtpSubscription?.unsubscribe();
    this.resendOtpSubscription?.unsubscribe();
  }
}
