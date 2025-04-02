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
  
  getUserResume(resumeNumber : any){
    return this.httpClient.get(`http://localhost:3200/user/resume/${resumeNumber}`,  {responseType : 'blob', withCredentials : true});
  }
  
  uploadUserResume(formData : FormData){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/upload/resume", formData, {withCredentials : true});
  }


}
