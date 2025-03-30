import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { Application } from '../../../../shared/entity/application';
import { ApplicationService } from '../../service/appliaction/application.service';

@Component({
  selector: 'app-current-user-application',
  standalone: false,
  templateUrl: './current-user-application.component.html',
  styleUrl: './current-user-application.component.css'
})
export class CurrentUserApplicationComponent {
  getApplicationsOfUserSubscription! : Subscription;
  applicationData : any[] = [];
  removedApplicationsId : number[] = [];
  applicationDataTitle : string[] = [
    'Job Position',
    'Employement Type',
    'Work Mode',
    'Work Location',
    'Applied Date',
    'Application Status',
    'Actions'
  ];
  applicationDataKey : string[] = [
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
    ){}
  
    ngOnInit(): void {
  
      this.getApplicationsOfUserSubscription = this.applicationService.getCurrentUserApplication().subscribe({
        next : (result : RequestResult) => {
          
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
        error : (err) => {
          console.log(err);
        }
      })
    }
  
    ngOnDestroy(): void {
      this.getApplicationsOfUserSubscription?.unsubscribe();
    }
}
