import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { JobListService } from '../../service/jobList/job-list.service';
import { ActivatedRoute } from '@angular/router';
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
    private jobListService : JobListService
  ){}

  ngOnInit(): void {
    this.selectedJobSubscription = this.jobListService.selectedJobObservable.subscribe({
      next : (value : Job) => {
        this.job = value;
        console.log(this.job);
        
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
