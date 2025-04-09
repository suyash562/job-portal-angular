import { Component, OnDestroy, OnInit } from '@angular/core';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationService } from '../../service/appliaction/application.service';

@Component({
  selector: 'app-application',
  standalone: false,
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit, OnDestroy{
  getApplicationsOfUserSubscription! : Subscription;
  applicationData! : any[];
  applicationDataTitle : string[] = ['Application ID','Job Position', 'Applicant Name', 'E-mail', 'Contact Numbers', 'Applied Date','Status', 'Actions'];
  applicationDataKey : string[] = ['id' ,'title', 'applicantName', 'applicantEmail', 'contactNumber', 'appliedDate', 'status'];
  actions : string[] = ['View'];
  
  constructor(
    private applicationService : ApplicationService,
    private router : Router,
  ){}

  ngOnInit(): void {
    
    this.getApplicationsOfUserSubscription = this.applicationService.getApplicationsOfUser().subscribe({
      next : (result : RequestResult) => {
        this.applicationData = [];
        result.value.forEach((application : Application) => {
          this.applicationData.push(
            {
              id : application.id,
              title : application.job.title,
              applicantName : application.user.profile?.firstName +' '+ application.user.profile?.lastName,
              applicantEmail : application.user.email,
              contactNumber : application.user.profile?.contactNumbers[0].number +' '+ (application.user.profile?.contactNumbers[1]?.number ?? ''),
              appliedDate : application.applyDate.toString().split('T')[0],
              status : application.status,
            }
          );
        });          
      },
    });
  }

  viewSelectedApplication(applicationId : number){
    this.router.navigate(['dashboard','component','user','userApplication',applicationId]);
  }

  performSpecifiedAction(event : {actionType : string, dataObjectId : number}){
    if(event.actionType == 'View'){
      this.viewSelectedApplication(event.dataObjectId);
    }
  }

  ngOnDestroy(): void {
    this.getApplicationsOfUserSubscription?.unsubscribe();
  }

}
