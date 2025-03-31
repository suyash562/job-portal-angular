import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewSchedule } from '../../../../shared/entity/interviewSchedule';
import { RequestResult } from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(
    private httpClient : HttpClient
  ) { }

  addInterviewSchedule(applicationId : number, interviewSchedule : InterviewSchedule){
    return this.httpClient.post<RequestResult>(`http://localhost:3200/interview/add`, {applicationId : applicationId, interviewSchedule : interviewSchedule},{withCredentials : true});
  }
}
