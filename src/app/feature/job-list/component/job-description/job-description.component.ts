import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { JobListService } from '../../service/jobList/job-list.service';
import { Router } from '@angular/router';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';

@Component({
  selector: 'app-job-description',
  standalone: false,
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent implements OnInit, OnDestroy{
  job! : Job;
  userRole! : string | null;
  selectedJobSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router,
    private userService : UserService
  ){}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();

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
    if(this.userService.isLoggedIn()){
      this.jobListService.applyForJob(jobId).subscribe({
        next : (result : RequestResult) => {
          if(result.value){
            alert('Applied Successfully')
          }
          else{
            console.log(result.message);
          }
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    else{
      alert('Please login to apply for a job');
    }
  }

  ngOnDestroy(): void {
    this.selectedJobSubscription?.unsubscribe();
  }

}
