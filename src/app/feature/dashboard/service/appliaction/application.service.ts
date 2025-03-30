import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getApplicationsOfUser(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/employeer`, {withCredentials : true});
  }

  getCurrentUserApplication(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/user`, {withCredentials : true});
  }

  getResumeOfApplicantById(applicationId : number){
    return this.httpClient.get(`http://localhost:3200/application/resume/${applicationId}`, {responseType : 'blob', withCredentials : true} );
  }

  getApplicationById(applicationId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/${applicationId}`, {withCredentials : true} );
  }
}
