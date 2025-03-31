import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../service/appliaction/application.service';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-view-selected-application',
  standalone: false,
  templateUrl: './view-selected-application.component.html',
  styleUrl: './view-selected-application.component.css'
})
export class ViewSelectedApplicationComponent implements OnInit, OnDestroy{
  activatedRouteSubcription! : Subscription;
  getApplicationByIdSubcription! : Subscription;
  getResumeByIdSubcription! : Subscription;
  displayResume : boolean = false;
  applicationId! : number;
  application! : Application;
  resumeDataBlob! : Blob;
  resumeFileData! : Uint8Array;

  constructor(
    private activatedRoute : ActivatedRoute,
    private applicationService : ApplicationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.activatedRouteSubcription = this.activatedRoute.params.subscribe({
      next : (value) => {
        if(value['applicationId'] && parseInt(value['applicationId'])){
          this.applicationId = value['applicationId'];
          this.getApplicationByIdSubcription = this.applicationService.getApplicationById(value['applicationId']).subscribe({
            next : (result : RequestResult) => {
              if(result.value){
                this.application = result.value;
                this.getApplicantResume();
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
          console.log(('Job Id not found'));
        }
      }
    })
  }

  getApplicantResume(){
    this.getResumeByIdSubcription = this.applicationService.getResumeOfApplicantById(this.applicationId).subscribe({
      next : (value : Blob) => {
        this.resumeDataBlob = value;
      },
      error : (err) => {
        console.log(err);
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

  scheduleInterview(){

  }

  acceptApplication(){
    this.applicationService.updateApplicationStatus(this.application.id, 'Accepted').subscribe({
      next : (result : RequestResult) => {
        if(result.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application has been accepted' });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to accept the application' });
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  rejectApplication(){
    this.applicationService.updateApplicationStatus(this.application.id, 'Rejected').subscribe({
      next : (result : RequestResult) => {
        if(result.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application has been rejected' });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to reject the application' });
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.getApplicationByIdSubcription?.unsubscribe();
    this.getResumeByIdSubcription?.unsubscribe();
    this.activatedRouteSubcription?.unsubscribe();
  }

}
