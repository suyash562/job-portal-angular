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

  getTotalNumberOfJobs(){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/job/totalActiveJobs`,{withCredentials : true});
  }

  getJobById(jobId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/job/${jobId}` ,{withCredentials : true});
  }

  applyForJob(jobId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/application/apply/${jobId}` ,{withCredentials : true});
  }

  filterJobsBasedOnOptions(event : any, jobs : Job[]){

    return jobs.filter((job) => {
        
      const company = event.company ? (job.employeer!.employeerCompany!.name.toLowerCase() === event.company) : false;
      const workMode = event.workMode ? (job.workMode === event.workMode) : false;
      const employementType = event.employementType ? (job.employementType === event.employementType) : false;
      
      if(event.workMode && event.employementType && event.company){
        return workMode && employementType && company;
      }
      else if(event.workMode && event.employementType){
        return workMode && employementType;
      }
      else if(event.employementType && event.company){
        return employementType && company;
      }
      else if(event.workMode && event.company){
        return workMode && company;
      }
     
      return workMode || employementType || company;
    });
  }

  getCompanies(jobs : Job[]){
    
    const companies : string[] = [];
    
    jobs.forEach((job) => {
      let companyName = job.employeer?.employeerCompany?.name;
      
      if(companyName && !companies.includes(companyName)){
        companies.push(companyName);
      }
    });
    return companies;
  }
}
