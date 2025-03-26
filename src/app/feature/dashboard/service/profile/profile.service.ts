import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { RequestResult } from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getUserProfile(){
    return this.httpClient.get<RequestResult>("http://localhost:3200/user/userProfile",{withCredentials : true});
  }
}
