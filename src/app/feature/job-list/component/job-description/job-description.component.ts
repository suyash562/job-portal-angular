import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { JobListService } from '../../service/jobList/job-list.service';
import { Router } from '@angular/router';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { Application } from '../../../../shared/entity/application';
import { ApplicationService } from '../../../dashboard/service/appliaction/application.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-description',
  standalone: false,
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent implements OnInit, OnDestroy{
  job! : Job;
  userRole! : string | null;
  userAppliedJobs! : number[];
  selectedJobSubscription! : Subscription;
  userAppliedJobsSubscription! : Subscription;
  applyForJobSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private applicationService : ApplicationService,
    private router : Router,
    private userService : UserService,
    private messageService : MessageService
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
    });

    if(this.userRole === 'user'){
      this.userAppliedJobsSubscription = this.applicationService.getCurrentUserApplication().subscribe({
        next : (result : RequestResult) => {
          if(result.value){
            this.userAppliedJobs = [];
            result.value.forEach((application : Application) => {
              this.userAppliedJobs.push(application.job.id);
            });
          }
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    else{
      this.userAppliedJobs = [];
    }

  }

  applyForJob(jobId : number){
    if(this.userService.isLoggedIn()){
      this.applyForJobSubscription = this.jobListService.applyForJob(jobId).subscribe({
        next : (result : RequestResult) => {
          if(result.value){
            this.userAppliedJobs.push(jobId);
            // alert('Applied Successfully')
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Applied to Job Successfully', life: 3000 });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message, life: 3000 });
          }
        },
        error : (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to appply for Job', life: 3000 });
        }
      })
    }
    else{
      alert('Please login to apply for a job');
    }
  }

  ngOnDestroy(): void {
    this.selectedJobSubscription.unsubscribe();
    this.applyForJobSubscription?.unsubscribe();
    this.userAppliedJobsSubscription?.unsubscribe();
  }

}
