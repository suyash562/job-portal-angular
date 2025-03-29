import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../../../shared/types/types';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../../../../shared/entity/job';

@Injectable({
  providedIn: 'root'
})
export class JobListService {
  selectedJobFromListSubject : BehaviorSubject<any> = new BehaviorSubject(undefined);  

  constructor(
    private httpClient : HttpClient
  ) { }

  get selectedJobObservable(){
    return this.selectedJobFromListSubject.asObservable();
  }

  emitSelectedJobFromSubject(job : Job){
    this.selectedJobFromListSubject.next(job);
  }

  getAllJobs(page : number, limit : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/job/jobs?page=${page}&limit=${limit}`,{withCredentials : true});
  }

  getJobById(jobId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/job/${jobId}` ,{withCredentials : true});
  }

  applyForJob(jobId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/apply/${jobId}` ,{withCredentials : true});
  }

  // getUserAppliedJobIdJob(){
  //   return this.httpClient.get<RequestResult>(`http://localhost:3200/job/userAppliedJobs` ,{withCredentials : true});
  // }
}
