import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  displayOverloaySpinner : boolean = false;
  userProfile! : UserProfile;
  userResumes! : {
    1 : Blob | null,
    2 : Blob | null,
    3 : Blob | null,
  };
  newResume : any;
  profileToUpdate : any;
  resumeFieldError! : string;
  updateProfile : boolean = false;
  isUpdatePasswordDialogVisible : boolean = false;
  displayResume : boolean = false;
  addNewResumeEnable : boolean = false;
  resumeCountArray : number[] = [];
  resumeFileData! : Uint8Array;
  getUserProfileSubscription! : Subscription;
  getResumeByEmailSubcription! : Subscription;
  uploadUserResumeSubcription! : Subscription;
  updateUserProfileSubscription! : Subscription;
  updateProfileForm : FormGroup = new FormGroup({});
  updatePasswordForm : FormGroup = new FormGroup({});
  
  get phoneNumbers(){
    return (this.updateProfileForm.get('phoneNumber') as FormArray).controls;
  }

  constructor(
    private profileService : ProfileService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private customFormValidators : CustomFormValidators
  ){}
  
  ngOnInit(): void {
    this.userResumes = {
      1 : null,
      2 : null,
      3 : null,
    }

    this.updatePasswordForm = new FormGroup({
      currentPassword : new FormControl('', [this.customFormValidators.defaultValidator]),
      newPassword : new FormControl('', [this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
      confirmNewPassword : new FormControl('',[this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
    });

    this.getUserProfileSubscription = this.profileService.getUserProfile().subscribe({
      next : (requestResult : RequestResult) => {       
        if(requestResult.value){
          this.userProfile = requestResult.value;
          this.profileToUpdate = requestResult.value;
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
      this.showResume(resumeNumber);
    }
    else{            
      this.displayOverloaySpinner = true;
      this.getResumeByEmailSubcription = this.profileService.getUserResume(resumeNumber).subscribe({
        next : (value : Blob) => {
          this.displayOverloaySpinner = false;
          if(value){
            this.userResumes[resumeNumber as '1' | '2' | '3'] = value;
            this.showResume(resumeNumber);
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get resume'});
          }
        },
        error : (err) => {
          this.displayOverloaySpinner = false;
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
      this.resumeFieldError = this.profileService.isResumeValid(this.newResume);
    }
  }

  addNewResume(){
    if(this.userProfile.resumeCount === 3){
      this.messageService.add({ severity: 'info', summary: 'Limit Exceeded', detail: 'You can only upload maximum 3 resumes'});
    }
    else{
      this.addNewResumeEnable = true;
    }
  }

  uploadResume(){    
    
    this.resumeFieldError = this.profileService.isResumeValid(this.newResume);
    if(this.resumeFieldError !== ''){
      return;
    }
    
    const formData : FormData = new FormData();
    formData.set('email', this.userProfile.user?.email as string);
    formData.set('resume', this.newResume);

    this.displayOverloaySpinner = true;
    this.uploadUserResumeSubcription = this.profileService.uploadUserResume(formData).subscribe({
      next : (requestResult) => {
        this.displayOverloaySpinner = false;
        if(requestResult.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume uploaded successfully'});
          this.resumeCountArray.push(this.resumeCountArray.length+1);
          this.userProfile.primaryResume = this.userProfile.primaryResume === 0 ? 1 : this.userProfile.primaryResume;
          this.userProfile.resumeCount++;
          this.addNewResumeEnable = false;
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: requestResult.value });
        }
      },
      error : (err) => {
        this.displayOverloaySpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload the resume' });
      }
    });

  }

  setResumeAsPrimary(resumeNumber : number){
    if(this.userProfile.primaryResume === resumeNumber){
      return;
    }
    this.displayOverloaySpinner = true;
    this.profileService.updatePrimaryResume(resumeNumber).subscribe({
      next : (requestResult : RequestResult) => {
        this.displayOverloaySpinner = false;
        if(requestResult.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Primary resume updated'});
          this.userProfile.primaryResume = resumeNumber;
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update primary resume'});
        }
      },
      error : (err) => {
        this.displayOverloaySpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update primary resume'});
      }
    })
  }

  showDeleteResumeConfirmationDialogue(resumeNumber : number){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this resume ?',
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
        this.deleteApplicantResume(resumeNumber);
      },
    });
  }

  deleteApplicantResume(resumeNumber : number){

    this.displayOverloaySpinner = true;
    this.profileService.deleteResume(resumeNumber).subscribe({
      next : (res : RequestResult) => {
        this.displayOverloaySpinner = false;
        if(res.value){
          
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume deleted successfully'});
          this.resumeCountArray.pop();
          this.userProfile.resumeCount--;
          this.displayResume = false;

          for(let i = 0; i<=3; i++){
            this.userResumes[i.toString() as '1'| '2' | '3'] = null;
          }
          if(this.resumeCountArray.length < this.userProfile.primaryResume){
            this.userProfile.primaryResume = this.resumeCountArray.length;
          }
          
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to deleted resume'});
        }
      },
      error : (err) => {
        this.displayOverloaySpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to deleted resume'});
        console.log(err);
      }
    })
  }

  enableProfileUpdate(){
    this.updateProfileForm = new FormGroup(
      {
        firstName : new FormControl(this.userProfile.firstName, [this.customFormValidators.defaultValidator,]),
        lastName : new FormControl(this.userProfile.lastName, [this.customFormValidators.defaultValidator,]),
        phoneNumber : new FormArray(
          [
            new FormControl(this.userProfile.phoneNumber.split(',')[0], [this.customFormValidators.validatePhoneNumber,]),
          ]
        ),
        address : new FormControl(this.userProfile.address, [this.customFormValidators.defaultValidator]),
      }
    );
    const secondContactNumber = this.userProfile.phoneNumber.split(',')[1];
    if(secondContactNumber){
      (this.updateProfileForm.controls['phoneNumber'] as FormArray).push(new FormControl(secondContactNumber, [this.customFormValidators.validatePhoneNumber]));
    }
    this.updateProfile = true;
  }

  isFormChanged(){
    for(const key in this.updateProfileForm.value){
      if( this.updateProfileForm.controls[key].value.toString() != this.profileToUpdate[key]){
        return true;
      }
    }
    return false;
  }

  updateProfileMethod(){
    if(!this.isFormChanged()){
      this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Profile is already updated' });
    }
    else{

      if(!this.updateProfileForm.invalid){
        const newUserProfile : Partial<UserProfile> = {
          firstName : this.updateProfileForm.controls['firstName'].value,
          lastName : this.updateProfileForm.controls['lastName'].value,
          address : this.updateProfileForm.controls['address'].value,
          phoneNumber : this.updateProfileForm.controls['phoneNumber'].value
        }
        this.displayOverloaySpinner = true;
        this.updateUserProfileSubscription = this.profileService.updateUserProfile(newUserProfile, this.userProfile.id!).subscribe(
          {
            next : (requestResult : RequestResult)=>{
              this.displayOverloaySpinner = false;
              if(requestResult.value){  
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
                this.updateProfileForm.reset();
                this.userProfile = {...this.userProfile, ...requestResult.value};
                this.profileToUpdate = requestResult.value;
                this.updateProfile = false;
              }
              else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile', life: 3000 });
              }
            },
            error : (response)=>{
              this.displayOverloaySpinner = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.error, life: 3000 });
              console.log(response);
            },
          }
        )
  
      }
      else{
        this.updateProfileForm.get('firstName')?.markAsDirty();
        this.updateProfileForm.get('lastName')?.markAsDirty();
        this.updateProfileForm.get('lastName')?.markAsDirty();
        this.updateProfileForm.get('address')?.markAsDirty();
        this.phoneNumbers[0].markAsDirty();
        this.phoneNumbers[1]?.markAsDirty();  
      }
    }
  }

  updatePassword(){
    if(this.updatePasswordForm.invalid){
      this.updatePasswordForm.controls['currentPassword'].markAsDirty();
      this.updatePasswordForm.controls['newPassword'].markAsDirty();
      this.updatePasswordForm.controls['confirmNewPassword'].markAsDirty();
      return;
    }
    
    if(this.updatePasswordForm.controls['newPassword'].value !== this.updatePasswordForm.controls['confirmNewPassword'].value){
      this.updatePasswordForm.get('confirmNewPassword')?.setErrors({error : 'Confirm password must match provided password'});
      return;
    }
    
    this.displayOverloaySpinner = true;
    this.profileService.updatePassword(
      this.updatePasswordForm.controls['currentPassword'].value,
      this.updatePasswordForm.controls['newPassword'].value
    ).subscribe({
      next : (requestResult : RequestResult) => {
        if(requestResult.value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully', life: 3000 });
          this.disableUpdatePasswordForm();
        }
        this.displayOverloaySpinner = false;
      },
      error : (err) => {
        this.displayOverloaySpinner = false;
        if(err.status === 401){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect current password', life: 3000 });
        }
        console.log(err);
      },

    })

    
  }

  showUpdatePasswordDialog(){
    this.isUpdatePasswordDialogVisible = true;
  }

  disableUpdatePasswordForm(){
    this.isUpdatePasswordDialogVisible = false;
    this.updatePasswordForm.reset();
    
  }

  getErrorMessage(field : string){
    return this.updateProfileForm.get(field)?.dirty && this.updateProfileForm.get(field)?.errors ? this.updateProfileForm.get(field)?.getError('error') : ''
  }
  
  getErrorMessageForPassword(field : string){
    return this.updatePasswordForm.get(field)?.dirty && this.updatePasswordForm.get(field)?.errors ? this.updatePasswordForm.get(field)?.getError('error') : ''
  }
  
  getErrorMessageForContact(contactControlName : number){
    return this.phoneNumbers[contactControlName].dirty && this.phoneNumbers[contactControlName].errors ? this.phoneNumbers[contactControlName].getError('error') : ''
  }

  ngOnDestroy(): void {
    this.getUserProfileSubscription?.unsubscribe();
    this.getResumeByEmailSubcription?.unsubscribe();
    this.uploadUserResumeSubcription?.unsubscribe();
    this.updateUserProfileSubscription?.unsubscribe();
  }

}
