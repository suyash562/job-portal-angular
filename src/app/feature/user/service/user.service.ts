import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../shared/entity/user';
import { RequestResult } from '../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  emailForOtpVerification! : string;
  otpForForgotPassword : boolean = false;
  userRole : string = sessionStorage.getItem('role') ?? '';
  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(sessionStorage.getItem('role') ? true : false);

  constructor(
    private httpClient : HttpClient,
  ){}

  get userLoggedInSubject(){
    return this.isUserLoggedIn.asObservable();
  }

  updateUserLoginStatus(status : boolean){
    this.isUserLoggedIn.next(status);
  }

  clearUserSession(){
    sessionStorage.removeItem('role');
    this.isUserLoggedIn.next(false);
  }

  register(formData : FormData){        
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/register", formData);
  }

  verifyOtp(email : string, otp : string, passwordReset : boolean){        
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/verify-otp", {email : email, otp : otp, passwordReset : passwordReset});
  }

  resendOtp(email : string, passwordReset : boolean){        
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/resend-otp", {email : email, passwordReset : passwordReset});
  }

  resetPassword(email : string, password : string){        
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/reset-password", {email : email, password : password});
  }

  checkIfEmailExistsAndSendOtp(email : string){        
    return this.httpClient.get<RequestResult>(`http://localhost:3200/user/forgot-password/${email}`);
  }

  login(user : Partial<User>){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/login",{user : user},{withCredentials : true});
  }
  
  logout(){
    return this.httpClient.get<RequestResult>("http://localhost:3200/user/logout",{withCredentials : true});
  }

  isLoggedIn(){
    return sessionStorage.getItem('role') ? true : false;
  }

  getUserRole(){
    return sessionStorage.getItem('role');
  }
}
