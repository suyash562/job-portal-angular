import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeerService } from '../../service/employeer/employeer.service';
import { Job } from '../../../../shared/entity/job';
import { Subscriber, Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';

@Component({
  selector: 'app-manage-jobs',
  standalone: false,
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit, OnDestroy{
  postedJobs! : Job[];
  getPostedJobsSubscription! : Subscription;

  constructor(
    private employeerService : EmployeerService
  ){}

  ngOnInit(): void {
    this.getPostedJobsSubscription = this.employeerService.getAllPostedJobs().subscribe({
      next : (result : RequestResult) => {
        this.postedJobs = result.value;        
      },
      error : (err) => {
        console.log(err);
        this.postedJobs = [];
      }
    })
  }

  updateJob(jobId : number){
    
  }
 
  deleteJob(jobId : number){
    this.employeerService.deletePostedJob(jobId).subscribe({
      next : (requestResult : RequestResult) => {
        alert('Job Deleted Successfully');
      },
      error : (requestResult : RequestResult) => {
        console.log(requestResult);
      }
    })
  }

  ngOnDestroy(): void {
    this.getPostedJobsSubscription?.unsubscribe();
  }
}
