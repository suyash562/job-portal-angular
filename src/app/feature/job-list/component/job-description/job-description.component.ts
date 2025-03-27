import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { JobListService } from '../../service/jobList/job-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-description',
  standalone: false,
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent implements OnInit, OnDestroy{
  job! : Job;
  selectedJobSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.selectedJobSubscription = this.jobListService.selectedJobObservable.subscribe({
      next : (value : Job) => {
        this.job = value;
        if(!value){
          this.router.navigate(['/jobs']);
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  applyForJob(jobId : number){

    this.jobListService.applyForJob(jobId).subscribe({
      next : (result : RequestResult) => {
        alert('Applied Successfully')
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.selectedJobSubscription?.unsubscribe();
  }

}
