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
    return this.httpClient.post<RequestResult>("http://localhost:3200/employeer/addJob", {job : job}, {withCredentials : true});
  }

  getAllPostedJobs(){
    return this.httpClient.get<RequestResult>("http://localhost:3200/employeer/jobs", {withCredentials : true});
  }
  
  getJobById(jobId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/employeer/job/${jobId}` ,{withCredentials : true});
  }
  
  updatePostedJob(jobIdToUpdate : number, updatedJob : Job){
    return this.httpClient.put<RequestResult>("http://localhost:3200/employeer/updateJob", {jobIdToUpdate : jobIdToUpdate, updatedJob : updatedJob}, {withCredentials : true});
  }
  
  deletePostedJob(jobId : number){
    return this.httpClient.delete<RequestResult>(`http://localhost:3200/employeer/deleteJob/${jobId}`, {withCredentials : true});
  }
}
