import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  userProfile! : UserProfile;
  resume : any;
  resumeFieldError! : string;
  displayResume : boolean = false;
  resumeDataBlob! : Blob;
  resumeFileData! : Uint8Array;
  getUserProfileSubscription! : Subscription;
  getResumeByEmailSubcription! : Subscription;
  
  constructor(
    private profileService : ProfileService,
    private customFormValidators : CustomFormValidators,
  ){}
  
  ngOnInit(): void {
    this.getUserProfileSubscription = this.profileService.getUserProfile().subscribe({
      next : (requestResult : RequestResult) => {       
        this.userProfile = requestResult.value;
        if(this.userProfile.user?.role === 'user'){
          this.getApplicantResume();
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  
  getApplicantResume(){
    this.getResumeByEmailSubcription = this.profileService.getUserResume().subscribe({
      next : (value : Blob) => {
        this.resumeDataBlob = value;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  showResume(resume : string){
    this.resumeDataBlob.arrayBuffer().then(arrayBuffer => {
      this.resumeFileData = new Uint8Array(arrayBuffer);
      this.displayResume = true;
    });    
  }

  getResumeFieldValue(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.resume = event.target.files[0];
    }
  }

  uploadResume(){
    if(!this.resume || this.resume.value === ''){
      this.resumeFieldError = '* Required';
      return;
    }
    const fileSplit : string[] = (this.resume.name as string).split('.');
    if(fileSplit[fileSplit.length-1] !== 'pdf'){
      this.resumeFieldError = 'Upload only pdf files';
      return;
    }
    if(this.resume.size > 10 * 1024 *1024){
      this.resumeFieldError =  'Maximum size of file must be 10 MB';
      return;
    }
    console.log('upload');
  }

  ngOnDestroy(): void {
    this.getUserProfileSubscription?.unsubscribe();
    this.getResumeByEmailSubcription?.unsubscribe();
  }
}
