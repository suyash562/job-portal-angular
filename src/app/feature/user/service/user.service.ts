import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserProfile } from '../../../shared/entity/userProfile';
import { User } from '../../../shared/entity/user';
import { EmployeerCompany } from '../../../shared/entity/employeerCompany';
import { RequestResult } from '../../../shared/types/types';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  register(formData : FormData){        
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/register", formData);
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
