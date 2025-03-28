import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../../shared/entity/job';
import { JobListService } from '../../../../job-list/service/jobList/job-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RequestResult } from '../../../../../shared/types/types';

@Component({
  selector: 'app-view-job',
  standalone: false,
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css'
})
export class ViewJobComponent implements OnInit, OnDestroy{
  job! : Job;
  userRole : string = 'employeer';
  getJobSubscription! : Subscription;
  activatedRouteSubcription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRouteSubcription = this.activatedRoute.params.subscribe({
      next : (value) => {
        if(value['jobId']){
          this.getJobSubscription = this.jobListService.getJobById(value['jobId']).subscribe({
            next : (result : RequestResult) => {
              this.job = result.value;
            },
            error : (err) => {
              console.log(err);
            }
          })
        }
        else{
          console.log(('Job Id not found'));
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.activatedRouteSubcription?.unsubscribe();
    this.getJobSubscription?.unsubscribe();
  }
}
