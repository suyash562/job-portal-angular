import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../entity/userProfile';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private httpClient : HttpClient
  ){}

  register(user : User & UserProfile){
    return this.httpClient.post("http://localhost:3200/user/register",{user : user});
  }
  login(user : Partial<User>){
    return this.httpClient.post("http://localhost:3200/user/login",{user : user},{withCredentials : true});
  }
}
