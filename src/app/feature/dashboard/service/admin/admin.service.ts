import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getNotVerifiedEmployers(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/user/employerDetails`, {withCredentials : true});
  }

  getAllVerifiedEmployers(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/user/verified-users`, {withCredentials : true});
  }

  approveEmployer(employerEmail : string){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/user/approve-employer/${employerEmail}`, {withCredentials : true});
  }

  updateUserAccountStatus(userEmail : string, status : string){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/user/update-account-status/${userEmail}/${status}`, {withCredentials : true});
  }
}
