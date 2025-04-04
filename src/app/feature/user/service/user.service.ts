import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../shared/entity/user';
import { RequestResult } from '../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(localStorage.getItem('role') ? true : false);

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
    return localStorage.getItem('role') ? true : false;
  }

  getUserRole(){
    return localStorage.getItem('role');
  }
}
