import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../../../../shared/entity/job';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  constructor(
    private httpClient : HttpClient
  ) { }

  addNewJob(job : Job){
    return this.httpClient.post("http://localhost:3200/employeer/addJob", {job : job}, {withCredentials : true})
  }
}
