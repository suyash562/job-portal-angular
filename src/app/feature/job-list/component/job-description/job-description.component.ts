import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { JobListService } from '../../service/jobList/job-list.service';
import { Router } from '@angular/router';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { Application } from '../../../../shared/entity/application';
import { ApplicationService } from '../../../dashboard/service/appliaction/application.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { ProfileService } from '../../../dashboard/service/profile/profile.service';
import { AppService } from '../../../../app.service';

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
  userProfile! : UserProfile;
  selectedJobSubscription! : Subscription;
  userAppliedJobsSubscription! : Subscription;
  applyForJobSubscription! : Subscription;
  getUserProfileSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private applicationService : ApplicationService,
    private router : Router,
    private userService : UserService,
    private profileService : ProfileService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private appService : AppService,
    
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
          this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
        }
      })

      this.getUserProfileSubscription = this.profileService.getUserProfile().subscribe({
        next : (result : RequestResult) => {
          this.userProfile = result.value;
        },
        error : (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
        }
      })

    }
    else{
      this.userAppliedJobs = [];
    }

  }

  applyForJob(jobId : number){

    if(this.userService.isLoggedIn()){

      if(this.userProfile.resumeCount === 0){
        this.confirmationService.confirm({
          header: 'Upload Resume',
          message: 'Please upload your resume for applying to a job',
          closable: true,
          closeOnEscape: true,
          icon: 'pi pi-info-circle',
          rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
          },
          acceptButtonProps: {
              label: 'Okay',
              severity : 'contrast'
          },
        });
      }
      else{
        this.appService.updateDisplayOverlaySpinnerSubject(true);
        this.applyForJobSubscription = this.jobListService.applyForJob(jobId).subscribe({
          next : (result : RequestResult) => {
            this.userAppliedJobs.push(jobId);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Applied to Job Successfully', life: 3000 });
          },
          error : (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
          }
        });
        
      }
    }
    else{
      this.confirmationService.confirm({
        header: 'Log In',
        message: 'Please Log In to apply for a job',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-info-circle',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Okay',
          severity : 'contrast'
        },
        accept: () => {
          this.router.navigate(['/user/login']);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedJobSubscription.unsubscribe();
    this.applyForJobSubscription?.unsubscribe();
    this.userAppliedJobsSubscription?.unsubscribe();
    this.getUserProfileSubscription?.unsubscribe();
  }

}
