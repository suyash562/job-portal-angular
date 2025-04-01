import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  
  getUserResume(){
    return this.httpClient.get("http://localhost:3200/user/resume",  {responseType : 'blob', withCredentials : true});
  }


}
