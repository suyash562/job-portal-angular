import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { Application } from '../../../../shared/entity/application';
import { ApplicationService } from '../../service/application/application.service';
import { UserService } from '../../../user/service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-current-user-application',
  standalone: false,
  templateUrl: './current-user-application.component.html',
  styleUrl: './current-user-application.component.css'
})
export class CurrentUserApplicationComponent {
  getApplicationsOfUserSubscription! : Subscription;
  userRole! : string | null;
  applicationData! : any[];
  removedApplicationsId : number[] = [];
  applicationDataTitle : string[] = [
    'Application ID',
    'Job Position',
    'Employement Type',
    'Work Mode',
    'Work Location',
    'Applied Date',
    'Application Status',
    'Actions'
  ];
  applicationDataKey : string[] = [
    'id',
    'title',
    'employementType',
    'workMode',
    'workLocation',
    'applyDate',
    'status'
  ];
  actions : string[] = ['View'];
    
    constructor(
      private applicationService : ApplicationService,
      private userService : UserService,
      private router : Router,
      private messageService: MessageService
      
    ){}
  
    ngOnInit(): void {
      this.userRole = this.userService.getUserRole();
      this.getApplicationsOfUserSubscription = this.applicationService.getCurrentUserApplication().subscribe({
        next : (result : RequestResult) => {
          this.applicationData = [];
          result.value.forEach((application : Application) => {
            if(!application.isActive){
              this.removedApplicationsId.push(application.id);
            }
            this.applicationData.push(
              {
                id : application.id,
                title : application.job.title,
                employementType : application.job.employementType,
                workMode : application.job.workMode,
                workLocation : application.job.workLocation,
                applyDate : application.applyDate.toString().split('T')[0],
                status : application.status,
              }
            );
          });          
        },
      })
    }

    viewApplication(applicationId : number){
      this.router.navigate(['dashboard','component','user','userApplication',applicationId]);
    }

    performSpecifiedAction(event : {actionType : string, dataObjectId : number}){
      if(event.actionType == 'View'){
        this.viewApplication(event.dataObjectId);
      }
    }
  
    ngOnDestroy(): void {
      this.getApplicationsOfUserSubscription?.unsubscribe();
    }
}
