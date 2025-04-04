import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../../../shared/entity/job';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { Router } from '@angular/router';
import { UserService } from '../../../user/service/user.service';
import { JobsService } from '../../service/jobs/jobs.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-jobs',
  standalone: false,
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit, OnDestroy{
  userRole! : string | null;
  displayOverlaySpinner! : boolean;
  getPostedJobsSubscription! : Subscription;
  deletePostedJobSubscription! : Subscription;
  postedJobsData! : any[];
  postedJobsTitle : string[] = [
    'Job Position',
    'Vacancies',
    'Employment Type',
    'Work Mode',
    'Salary Range',
    'Posted On',
    'Deadline For Applying',
    'Actions'
  ];
  postedJobsDataKey : string[] = [
    'title',
    'vacancies',
    'employementType',
    'workMode',
    'salaryRange',
    'postingDate',
    'deadlineForApplying',
  ];
  actions : string[] = [
    'View',
    'Update',
    'Delete',
  ];

  constructor(
    private jobsService : JobsService,
    private userService : UserService,
    private router : Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    this.getAllPostedJobs();
  }

  getAllPostedJobs(){
    this.getPostedJobsSubscription  = this.getPostedJobsSubscription = this.jobsService.getAllPostedJobs().subscribe({
      next : (result : RequestResult) => {
        this.postedJobsData = [];
        result.value.forEach((job : Job) => {
          this.postedJobsData.push(
            {
              id : job.id,
              title : job.title,
              vacancies : job.vacancies,
              employementType : job.employementType,
              workMode : job.workMode,
              salaryRange : job.salaryRange,
              postingDate : job.postingDate.toString().split('T')[0],
              deadlineForApplying : job.deadlineForApplying.toString().split('T')[0],
            }
          );
        });       
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  viewJob(jobId : number){
   this.router.navigate(['dashboard','component','viewJob',jobId]);
  }

  updateJob(jobId : number){
   this.router.navigate(['dashboard','component','updateJob',jobId]);
  }

  deleteJob(jobId : number){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this job post ?',
      header: 'Delete',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'contrast',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Ok',
          severity: 'contrast',
      },
      accept: () => {
        this.displayOverlaySpinner = true;
        this.deletePostedJobSubscription = this.jobsService.deletePostedJob(jobId).subscribe({
          next : (requestResult : RequestResult) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job Post Deleted Successfully' });
            const jobIndex = this.postedJobsData.findIndex((job) => job.id == jobId);
            this.postedJobsData.splice(jobIndex, 1);
            this.displayOverlaySpinner = false;
          },
          error : (requestResult : RequestResult) => {
            this.displayOverlaySpinner = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete job post' });
          }
        })
      },
    });

  }

  performSpecifiedAction(event : {actionType : string, dataObjectId : number}){
    if(event.actionType == 'Update'){
      this.updateJob(event.dataObjectId);
    }
    else if(event.actionType === 'Delete'){
      this.deleteJob(event.dataObjectId);
    }
    else if(event.actionType === 'View'){
      this.viewJob(event.dataObjectId);
    }
  }

  ngOnDestroy(): void {
    this.getPostedJobsSubscription?.unsubscribe();
    this.deletePostedJobSubscription?.unsubscribe();
  }
}
