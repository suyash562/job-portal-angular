import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../service/appliaction/application.service';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InterviewSchedule } from '../../../../shared/entity/interviewSchedule';
import { InterviewService } from '../../service/interview/interview.service';
import { UserService } from '../../../user/service/user.service';
import { Job } from '../../../../shared/entity/job';


@Component({
  selector: 'app-view-selected-application',
  standalone: false,
  templateUrl: './view-selected-application.component.html',
  styleUrl: './view-selected-application.component.css'
})
export class ViewSelectedApplicationComponent implements OnInit, OnDestroy{
  userRole! : string | null;
  displayOverlaySpinner : boolean = false;
  activatedRouteSubcription! : Subscription;
  getApplicationByIdSubcription! : Subscription;
  getResumeByIdSubcription! : Subscription;
  getScheduledInterviewsSubcription! : Subscription;
  updateApplicationStatusSubcription! : Subscription;
  displayResume : boolean = false;
  applicationId! : number;
  application! : Application;
  jobDescription! : Job;
  resumeDataBlob! : Blob;
  resumeFileData! : Uint8Array;
  scheduledInterviews! : InterviewSchedule[];

  constructor(
    private activatedRoute : ActivatedRoute,
    private applicationService : ApplicationService,
    private interviewService : InterviewService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();

    this.activatedRouteSubcription = this.activatedRoute.params.subscribe({
      next : (value) => {
        if(value['applicationId'] && parseInt(value['applicationId'])){
          this.applicationId = value['applicationId'];
          this.getApplicationById(value['applicationId']);
        }
        else{
          this.router.navigate(['../../applications'], {relativeTo : this.activatedRoute});
        }
      }
    })
  }

  getApplicationById(applicationId : number){
    this.getApplicationByIdSubcription = this.applicationService.getApplicationById(applicationId).subscribe({
      next : (result : RequestResult) => {
        this.application = result.value;
        this.getApplicantResume();
        this.getScheduledInterviews();
      },
      error : (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
      }
    })
  }

  getScheduledInterviews(){
    this.getScheduledInterviewsSubcription = this.interviewService.getScheduledInterviews(this.applicationId).subscribe({
      next : (result : RequestResult) => {
        this.scheduledInterviews = result.value;
      },
      error : (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
      }
    })
  }

  getApplicantResume(){
    this.getResumeByIdSubcription = this.applicationService.getResumeOfApplicantById(this.applicationId).subscribe({
      next : (value : Blob) => {
        this.resumeDataBlob = value;
      },
      error : (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load resume', life: 3000 });
      }
    })
  }

  showResume(){
    this.resumeDataBlob.arrayBuffer().then(arrayBuffer => {
      this.resumeFileData = new Uint8Array(arrayBuffer);
      this.displayResume = true;
    });    
  }

  displayConfirmationDialogue(header : string, message : string, action : Function){
    this.confirmationService.confirm({
      message: message,
      header: header,
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
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
          action();
      },
    });
  }
  
  acceptApplicationDialogue(){
    this.displayConfirmationDialogue('Accept Application', 'Are you sure you want to accept this application ?', this.acceptApplication.bind(this));
  }
  
  rejectApplicationDialogue(){
    this.displayConfirmationDialogue('Reject Application', 'Are you sure you want to reject this application ?', this.rejectApplication.bind(this));
  }

  acceptApplication(){
    this.displayOverlaySpinner = true;
    this.updateApplicationStatusSubcription = this.applicationService.updateApplicationStatus(this.application.id, 'Accepted').subscribe({
      next : (result : RequestResult) => {
        this.displayOverlaySpinner = false;
        this.application.status = 'Accepted';
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
      },
      error : (err) => {
        this.displayOverlaySpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
      }
    })
  }
  
  rejectApplication(){
    this.displayOverlaySpinner = true;
    this.updateApplicationStatusSubcription = this.applicationService.updateApplicationStatus(this.application.id, 'Rejected').subscribe({
      next : (result : RequestResult) => {
        this.displayOverlaySpinner = false;
        this.application.status = 'Rejected';
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
      },
      error : (err) => {
        this.displayOverlaySpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
      }
    })
  }

  getStyleForStatusField(status : string){
    if(status === 'Accepted'){
      return  { color : 'green', 'font-weight' : 'bold'};
    }  
    else if(status === 'Rejected'){
      return  { color : 'red', 'font-weight' : 'bold'};
    }
    else if(status === 'Interview'){
      return  { color : 'blue', 'font-weight' : 'bold'};
    }
    return null;
  }

  ngOnDestroy(): void {
    this.getApplicationByIdSubcription?.unsubscribe();
    this.getResumeByIdSubcription?.unsubscribe();
    this.activatedRouteSubcription?.unsubscribe();
    this.getScheduledInterviewsSubcription?.unsubscribe();
    this.updateApplicationStatusSubcription?.unsubscribe();
  }

}
