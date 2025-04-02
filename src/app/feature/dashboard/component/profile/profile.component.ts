import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  userProfile! : UserProfile;
  userResumes! : {
    1 : Blob | null,
    2 : Blob | null,
    3 : Blob | null,
  }
  newResume : any;
  resumeFieldError! : string;
  displayResume : boolean = false;
  addNewResume : boolean = false;
  resumeCountArray : number[] = [];
  resumeFileData! : Uint8Array;
  getUserProfileSubscription! : Subscription;
  getResumeByEmailSubcription! : Subscription;
  uploadUserResumeSubcription! : Subscription;
  
  constructor(
    private profileService : ProfileService,
    private messageService: MessageService
  ){}
  
  ngOnInit(): void {
    
    this.userResumes = {
      1 : null,
      2 : null,
      3 : null,
    }

    this.getUserProfileSubscription = this.profileService.getUserProfile().subscribe({
      next : (requestResult : RequestResult) => {       
        if(requestResult.value){
          this.userProfile = requestResult.value;
          if(this.userProfile.user?.role === 'user'){
            for(let i=1; i<= this.userProfile.resumeCount; i++){
              this.resumeCountArray.push(i);
            }
          }
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get user profile'});
        }
      },
      error : (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get user profile'});
      }
    })
  }
  
  getApplicantResume(resumeNumber : string){
    if(this.userResumes[resumeNumber as '1' | '2' | '3']){
      this.showResume(resumeNumber)
    }
    else{            
      this.getResumeByEmailSubcription = this.profileService.getUserResume(resumeNumber).subscribe({
        next : (value : Blob) => {
          if(value){
            this.userResumes[resumeNumber as '1' | '2' | '3'] = value;
            this.showResume(resumeNumber);
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get resume'});
          }
        },
        error : (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get resume'});
        }
      })
    }
  }

  showResume(resumeNumber : string){
    this.userResumes[resumeNumber as '1' | '2' | '3']!.arrayBuffer().then(arrayBuffer => {
      this.resumeFileData = new Uint8Array(arrayBuffer);
      this.displayResume = true;
    });    
  }

  getResumeFieldValue(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newResume = event.target.files[0];
    }
  }

  uploadResume(){    
    if(!this.isResumeValid()){
      return;
    }
    
    const formData : FormData = new FormData();
    formData.set('email', this.userProfile.user?.email as string);
    formData.set('resume', this.newResume);

    this.uploadUserResumeSubcription = this.profileService.uploadUserResume(formData).subscribe({
      next : (requestResult) => {
        if(requestResult.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume uploaded successfully'});
          this.resumeCountArray.push(this.resumeCountArray.length+1);
          this.addNewResume = false;
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: requestResult.value });
        }
      },
      error : (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload the resume' });
      }
    });

  }

  isResumeValid(){
    if(!this.newResume || this.newResume.value === ''){
      this.resumeFieldError = '* Required';
      return false;
    }
    const fileSplit : string[] = (this.newResume.name as string).split('.');
    if(fileSplit[fileSplit.length-1] !== 'pdf'){
      this.resumeFieldError = 'Upload only pdf files';
      return false;
    }
    if(this.newResume.size > 10 * 1024 *1024){
      this.resumeFieldError =  'Maximum size of file must be 10 MB';
      return false;
    }
    this.resumeFieldError = '';
    return true;
  }

  ngOnDestroy(): void {
    this.getUserProfileSubscription?.unsubscribe();
    this.getResumeByEmailSubcription?.unsubscribe();
    this.uploadUserResumeSubcription?.unsubscribe();
  }
}
