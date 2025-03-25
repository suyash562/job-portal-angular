import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../entity/userProfile';
import { User } from '../entity/user';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(sessionStorage.getItem('userToken') ? true : false);

  constructor(
    private httpClient : HttpClient,
  ){}

  get userLoggedInSubject(){
    return this.isUserLoggedIn;
  }

  register(user : User & UserProfile){
    return this.httpClient.post("http://localhost:3200/user/register",{user : user});
  }

  login(user : Partial<User>){
    return this.httpClient.post("http://localhost:3200/user/login",{user : user},{withCredentials : true});
  }
  
  logout(){
    return this.httpClient.get("http://localhost:3200/user/logout",{withCredentials : true});
  }

  isLoggedIn(){
    return sessionStorage.getItem('userToken') ? true : false;
  }
}
