import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../../shared/entity/job';
import { RequestResult } from '../../../../shared/types/types';
import { JobListService } from '../../../job-list/service/jobList/job-list.service';


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
    private activatedRoute : ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.activatedRouteSubcription = this.activatedRoute.params.subscribe({
      next : (value) => {
        if(value['jobId'] && parseInt(value['jobId'])){
          this.getJobSubscription = this.jobListService.getJobById(value['jobId']).subscribe({
            next : (result : RequestResult) => {
              this.job = result.value;
            }
          })
        }
        else{          
          this.router.navigate(['/']);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.activatedRouteSubcription?.unsubscribe();
    this.getJobSubscription?.unsubscribe();
  }
}
