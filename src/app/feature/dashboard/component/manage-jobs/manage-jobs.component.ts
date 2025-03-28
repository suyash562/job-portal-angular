import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeerService } from '../../service/employeer/employeer.service';
import { Job } from '../../../../shared/entity/job';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-jobs',
  standalone: false,
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit, OnDestroy{
  getPostedJobsSubscription! : Subscription;
  deletePostedJobSubscription! : Subscription;
  postedJobsData : any[] = [];
  postedJobsTitle : string[] = [
    'Job Position',
    'Vacancies',
    'Employment Type',
    'Work Mode',
    'Salary Range',
    'Posted On',
    'Actions'
  ];
  postedJobsDataKey : string[] = [
    'title',
    'vacancies',
    'employementType',
    'workMode',
    'salaryRange',
    'postingDate'
  ];
  actions : string[] = [
    'View',
    'Update',
    'Delete',
  ];

  constructor(
    private employeerService : EmployeerService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.getPostedJobsSubscription = this.employeerService.getAllPostedJobs().subscribe({
      next : (result : RequestResult) => {
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
            }
          );
        });       
      },
      error : (err) => {
        console.log(err);
        this.postedJobsData = [];
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
    this.deletePostedJobSubscription = this.employeerService.deletePostedJob(jobId).subscribe({
      next : (requestResult : RequestResult) => {
        alert('Job Deleted Successfully');
      },
      error : (requestResult : RequestResult) => {
        console.log(requestResult);
      }
    })
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
