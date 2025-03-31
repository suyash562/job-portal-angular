import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../service/appliaction/application.service';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';


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

  ngOnDestroy(): void {
    this.getApplicationByIdSubcription?.unsubscribe();
    this.getResumeByIdSubcription?.unsubscribe();
    this.activatedRouteSubcription?.unsubscribe();
  }

}
