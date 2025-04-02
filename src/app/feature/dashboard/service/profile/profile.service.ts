import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../../../shared/types/types';
import { UserProfile } from '../../../../shared/entity/userProfile';

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
  
  updateUserProfile(userProfile : Partial<UserProfile>, profileId : number){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/userProfile/update", {profileId : profileId, userProfile : userProfile} , {withCredentials : true});
  }
  
  getUserResume(resumeNumber : any){
    return this.httpClient.get(`http://localhost:3200/user/resume/${resumeNumber}`,  {responseType : 'blob', withCredentials : true});
  }
  
  uploadUserResume(formData : FormData){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/resume/upload", formData, {withCredentials : true});
  }
  
  updatePrimaryResume(resumeNumber : number){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/resume/updatePrimary", {resumeNumber : resumeNumber}, {withCredentials : true});
  }
  
  deleteResume(resumeNumber : number){
    return this.httpClient.post<RequestResult>("http://localhost:3200/user/resume/delete", {resumeNumber : resumeNumber}, {withCredentials : true});
  }


}
