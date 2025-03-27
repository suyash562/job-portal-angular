import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { RequestResult } from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  constructor(
    private httpClient : HttpClient
  ) { }

  addNewJob(job : Job){
    return this.httpClient.post<RequestResult>("http://localhost:3200/job/addJob", {job : job}, {withCredentials : true});
  }

  getAllPostedJobs(){
    return this.httpClient.get<RequestResult>("http://localhost:3200/job/employeer", {withCredentials : true});
  }
  
  updatePostedJob(jobIdToUpdate : number, updatedJob : Job){
    return this.httpClient.put<RequestResult>("http://localhost:3200/job/updateJob", {jobIdToUpdate : jobIdToUpdate, updatedJob : updatedJob}, {withCredentials : true});
  }
  
  deletePostedJob(jobId : number){
    return this.httpClient.delete<RequestResult>(`http://localhost:3200/job/deleteJob/${jobId}`, {withCredentials : true});
  }
  
  getApplicationsOfUser(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/employeer`, {withCredentials : true});
  }
}
