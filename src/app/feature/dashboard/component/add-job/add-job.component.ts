import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { Job } from '../../../../shared/entity/job';
import { RequestResult } from '../../../../shared/types/types';
import { ActivatedRoute } from '@angular/router';
import { JobListService } from '../../../job-list/service/jobList/job-list.service';
import { Subscription } from 'rxjs';
import { JobsService } from '../../service/jobs/jobs.service';
import { MessageService } from 'primeng/api';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-add-job',
  standalone: false,
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit, OnDestroy{
  displayLoadingSpinner! : boolean;
  jobIdToUpdate! : number;
  updateJobForm! : boolean;
  minDate: string = new Date().toISOString().split('T')[0];
  addJobFormGroup! : FormGroup;
  formInputFields! : {id : string, inputType : string, formControlName : string, placeholder : string}[];
  employementTypeOptions! : any[];
  workModeOptions! : any[];
  jobToUpdate! : any;
  routeParamsSubscription! : Subscription;
  routeUrlSubscription! : Subscription;
  getJobByIdSubscription! : Subscription;
  addNewJobSubscription! : Subscription;

  constructor(
    private customFormValidators : CustomFormValidators,
    private jobsService : JobsService,
    private jobListService : JobListService,
    private activatedRoute : ActivatedRoute,
    private messageService: MessageService,
    private appService: AppService,
  ){}

  ngOnInit(): void {
    
    this.routeParamsSubscription = this.activatedRoute.params.subscribe({
      next : (param : any) => {
        this.jobIdToUpdate = param.jobId;
        this.routeUrlSubscription = this.activatedRoute.url.subscribe({
          next : (val) => {
              this.updateJobForm = val[0].path === 'updateJob' ? true : false;
          },
          error : (err) => {
            console.log(err);
          }
        })
      }
    })

    this.addJobFormGroup = new FormGroup(
      {
        title    : new FormControl('', [this.customFormValidators.defaultValidator]),
        description : new FormControl('', [this.customFormValidators.defaultValidator]),
        requiredSkills : new FormControl('', [this.customFormValidators.defaultValidator]),
        vacancies : new FormControl('', [this.customFormValidators.requiredValidator, this.customFormValidators.validateNumber]),
        preferredSkills  : new FormControl('', [this.customFormValidators.defaultValidator]),
        employementType : new FormControl(null, [this.customFormValidators.requiredValidator]),
        workMode  : new FormControl('', [this.customFormValidators.requiredValidator]),
        salaryRangeFrom  : new FormControl('', [this.customFormValidators.validateSalary, this.customFormValidators.requiredValidator]),
        salaryRangeTo  : new FormControl('', [this.customFormValidators.validateSalary, this.customFormValidators.requiredValidator]),
        facilities  : new FormControl('', [this.customFormValidators.defaultValidator]),
        experienceLevel  : new FormControl('', [this.customFormValidators.requiredValidator, this.customFormValidators.validateNumber]),
        workLocation  : new FormControl('', [this.customFormValidators.defaultValidator]),
        deadlineForApplying  : new FormControl('', [this.customFormValidators.requiredValidator]),
      },
    );

    this.formInputFields = [
      {id : 'titleInput', inputType : 'text' , formControlName : 'title', placeholder : 'Job Position'},
      {id : 'descriptionInput', inputType : 'text' , formControlName : 'description', placeholder : 'Job Description'},
      {id : 'requiredSkillsInput', inputType : 'text' , formControlName : 'requiredSkills', placeholder : 'Required Skills'},
      {id : 'vacanciesInput', inputType : 'number' , formControlName : 'vacancies', placeholder : 'Number of Vacancies'},
      {id : 'preferredSkillsInput', inputType : 'text' , formControlName : 'preferredSkills', placeholder : 'Prefered Skills'},
      {id : 'facilitiesInput', inputType : 'text' , formControlName : 'facilities', placeholder : 'Facilities'},
      {id : 'experienceLevelInput', inputType : 'number' , formControlName : 'experienceLevel', placeholder : 'Experience Level in Years'},
      {id : 'workLocationInput', inputType : 'text' , formControlName : 'workLocation', placeholder : 'Work Location'},
    ];

    this.employementTypeOptions = [
      {name :  "Full Time"},
      {name : "Part Time"}
    ];

    this.workModeOptions = [
      {name :  "Offline"},
      {name : "Online"},
      {name : "Hybrid"}
    ];
  
    if(this.updateJobForm){
      this.displayLoadingSpinner = true
      this.getJobByIdSubscription = this.jobListService.getJobById(this.jobIdToUpdate).subscribe({
        next : (requestResult : RequestResult) => {
          this.jobToUpdate = requestResult.value;
          this.jobToUpdate.deadlineForApplying = new Date(requestResult.value.deadlineForApplying);
          this.addJobFormGroup.setValue(
            {
              title : requestResult.value.title,
              description : requestResult.value.description,
              requiredSkills : requestResult.value.requiredSkills,
              vacancies : requestResult.value.vacancies,
              preferredSkills : requestResult.value.preferredSkills,
              employementType : {name : requestResult.value.employementType},
              workMode : {name : requestResult.value.workMode},
              salaryRangeFrom : requestResult.value.salaryRange.split(' ')[0],
              salaryRangeTo : requestResult.value.salaryRange.split(' ')[1],
              facilities : requestResult.value.facilities,
              experienceLevel : requestResult.value.experienceLevel,
              workLocation : requestResult.value.workLocation,
              deadlineForApplying : new Date(requestResult.value.deadlineForApplying),
            }
          ); 
          this.displayLoadingSpinner = false; 
        },
      })
    }
  }

  getErrorMessage(field : string){
    return this.addJobFormGroup.get(field)?.dirty && this.addJobFormGroup.get(field)?.errors ? this.addJobFormGroup.get(field)?.getError('error') : ''
  }

  submitForm(){
    
    if(!this.addJobFormGroup.invalid){

      if(this.addJobFormGroup.controls['salaryRangeFrom'].value >= this.addJobFormGroup.controls['salaryRangeTo'].value){
        this.addJobFormGroup.controls['salaryRangeTo'].setErrors({error : 'Must be greater than base salary'});
        return;
      }
      
      const newJob : Job = new Job(
        this.addJobFormGroup.controls['title'].value,
        this.addJobFormGroup.controls['description'].value,
        this.addJobFormGroup.controls['requiredSkills'].value,
        this.addJobFormGroup.controls['vacancies'].value,
        this.addJobFormGroup.controls['preferredSkills'].value,
        this.addJobFormGroup.controls['employementType'].value.name,
        this.addJobFormGroup.controls['workMode'].value.name,
        this.addJobFormGroup.controls['salaryRangeFrom'].value+' '+this.addJobFormGroup.controls['salaryRangeTo'].value,
        this.addJobFormGroup.controls['facilities'].value,
        this.addJobFormGroup.controls['experienceLevel'].value,
        this.addJobFormGroup.controls['workLocation'].value,
        new Date(this.addJobFormGroup.controls['deadlineForApplying'].value),
        new Date(),
        true
      )
      
      if(this.updateJobForm){
        if(this.isFormChanged()){
          this.appService.updateDisplayOverlaySpinnerSubject(true);
          this.addNewJobSubscription = this.jobsService.updatePostedJob(this.jobIdToUpdate, newJob).subscribe(
            {
              next : (requestResult : RequestResult)=>{
                this.jobToUpdate = newJob;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: requestResult.message });
              },
            }
          )
        }
        else{
          this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'The job post is already updated' });
        }
      }
      else{
        this.appService.updateDisplayOverlaySpinnerSubject(true);
        this.addNewJobSubscription = this.jobsService.addNewJob(newJob).subscribe(
          {
            next : (requestResult : RequestResult)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: requestResult.message});
              this.addJobFormGroup.reset();
            },
          }
        )
      }
    }
    else{
      this.formInputFields.forEach(inputField => {
        this.addJobFormGroup.get(inputField.formControlName)?.markAsDirty();
      });
      this.addJobFormGroup.controls['deadlineForApplying'].markAsDirty();
      this.addJobFormGroup.controls['employementType'].markAsDirty();
      this.addJobFormGroup.controls['workMode'].markAsDirty();
      this.addJobFormGroup.controls['salaryRangeFrom'].markAsDirty();
      this.addJobFormGroup.controls['salaryRangeTo'].markAsDirty();
    }
  }

  isFormChanged(){
    for(const key in this.addJobFormGroup.value){
      if( !['deadlineForApplying', 'salaryRangeFrom', 'salaryRangeTo'].includes(key) && typeof(this.addJobFormGroup.controls[key].value) === 'string' && this.addJobFormGroup.controls[key].value != this.jobToUpdate[key]){
        return true;
      }
    }
    
    if(typeof (this.addJobFormGroup.controls['deadlineForApplying'].value) !== 'string'){
      if(this.addJobFormGroup.controls['deadlineForApplying'].value.toISOString().split('T')[0] != this.jobToUpdate['deadlineForApplying']?.toISOString().split('T')[0]){
        return true;
      }
    }
    else{
      if(this.addJobFormGroup.controls['deadlineForApplying'].value.split('T')[0] != this.jobToUpdate['deadlineForApplying']?.toISOString().split('T')[0]){
        return true;
      }  
    }

    if(this.addJobFormGroup.controls['workMode'].value.name != this.jobToUpdate['workMode'] || this.addJobFormGroup.controls['employementType'].value.name != this.jobToUpdate['employementType']){
      return true;
    }
    const salaryRange = this.addJobFormGroup.controls['salaryRangeFrom'].value + ' ' + this.addJobFormGroup.controls['salaryRangeTo'].value;
    if(salaryRange != this.jobToUpdate['salaryRange']){
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
    this.routeUrlSubscription?.unsubscribe();
    this.getJobByIdSubscription?.unsubscribe();
    this.addNewJobSubscription?.unsubscribe();
  }
}
