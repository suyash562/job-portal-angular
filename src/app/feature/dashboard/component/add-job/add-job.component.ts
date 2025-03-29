import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { Job } from '../../../../shared/entity/job';
import { EmployeerService } from '../../service/employeer/employeer.service';
import { RequestResult } from '../../../../shared/types/types';
import { ActivatedRoute } from '@angular/router';
import { JobListService } from '../../../job-list/service/jobList/job-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-job',
  standalone: false,
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit, OnDestroy{
  jobIdToUpdate! : number;
  updateJobForm! : boolean;
  currentDate : string = new Date().toISOString().split('T')[0];
  addJobFormGroup! : FormGroup;
  formInputFields! : {id : string, inputType : string, formControlName : string, placeholder : string}[];
  employementTypeInputFields! : string[];
  workModeInputFields! : string[];
  routeParamsSubscription! : Subscription;
  routeUrlSubscription! : Subscription;
  getJobByIdSubscription! : Subscription;
  addNewJobSubscription! : Subscription;

  constructor(
    private customFormValidators : CustomFormValidators,
    private employeerService : EmployeerService,
    private jobListService : JobListService,
    private activatedRoute : ActivatedRoute
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
        employementType : new FormControl('', [this.customFormValidators.defaultValidator]),
        workMode  : new FormControl('', [this.customFormValidators.defaultValidator]),
        salaryRange  : new FormControl('', [this.customFormValidators.defaultValidator]),
        facilities  : new FormControl('', [this.customFormValidators.defaultValidator]),
        experienceLevel  : new FormControl('', [this.customFormValidators.requiredValidator, this.customFormValidators.validateNumber]),
        workLocation  : new FormControl('', [this.customFormValidators.defaultValidator]),
        deadlineForApplying  : new FormControl('', []),
      }
    );

    this.formInputFields = [
      {id : 'titleInput', inputType : 'text' , formControlName : 'title', placeholder : 'Job Title'},
      {id : 'descriptionInput', inputType : 'text' , formControlName : 'description', placeholder : 'Job Description'},
      {id : 'requiredSkillsInput', inputType : 'text' , formControlName : 'requiredSkills', placeholder : 'Required Skills'},
      {id : 'vacanciesInput', inputType : 'number' , formControlName : 'vacancies', placeholder : 'Number of Vacancies'},
      {id : 'preferredSkillsInput', inputType : 'text' , formControlName : 'preferredSkills', placeholder : 'Prefered Skills'},
      {id : 'salaryRangeInput', inputType : 'text' , formControlName : 'salaryRange', placeholder : 'Salary Range'},
      {id : 'facilitiesInput', inputType : 'text' , formControlName : 'facilities', placeholder : 'Facilities'},
      {id : 'experienceLevelInput', inputType : 'number' , formControlName : 'experienceLevel', placeholder : 'Experience Level'},
      {id : 'workLocationInput', inputType : 'text' , formControlName : 'workLocation', placeholder : 'Work Location'},
    ];

    this.employementTypeInputFields = ['Select', "Full Time" , "Part Time"];
    this.workModeInputFields = ['Select', 'Offline' , 'Online' , 'Hybrid'];

    if(this.updateJobForm){
      this.getJobByIdSubscription = this.jobListService.getJobById(this.jobIdToUpdate).subscribe({
        next : (requestResult : RequestResult) => {
          this.addJobFormGroup.setValue(
            {
              title : requestResult.value.title,
              description : requestResult.value.description,
              requiredSkills : requestResult.value.requiredSkills,
              vacancies : requestResult.value.vacancies,
              preferredSkills : requestResult.value.preferredSkills,
              employementType : requestResult.value.employementType,
              workMode : requestResult.value.workMode,
              salaryRange : requestResult.value.salaryRange,
              facilities : requestResult.value.facilities,
              experienceLevel : requestResult.value.experienceLevel,
              workLocation : requestResult.value.workLocation,
              deadlineForApplying : requestResult.value.deadlineForApplying.toString().split('T')[0],
            }
          )
        },
        error : (requestResult : RequestResult) => {
          console.log(requestResult.message);
        }
      })
    }
  }

  getErrorMessage(field : string){
    return this.addJobFormGroup.get(field)?.dirty && this.addJobFormGroup.get(field)?.errors ? this.addJobFormGroup.get(field)?.getError('error') : ''
  }

  submitForm(){
    if(!this.addJobFormGroup.invalid){
    
      const newJob : Job = new Job(
        this.addJobFormGroup.controls['title'].value,
        this.addJobFormGroup.controls['description'].value,
        this.addJobFormGroup.controls['requiredSkills'].value,
        this.addJobFormGroup.controls['vacancies'].value,
        this.addJobFormGroup.controls['preferredSkills'].value,
        this.addJobFormGroup.controls['employementType'].value,
        this.addJobFormGroup.controls['workMode'].value,
        this.addJobFormGroup.controls['salaryRange'].value,
        this.addJobFormGroup.controls['facilities'].value,
        this.addJobFormGroup.controls['experienceLevel'].value,
        this.addJobFormGroup.controls['workLocation'].value,
        this.addJobFormGroup.controls['deadlineForApplying'].value,
        new Date(),
        true
      )
      
      if(this.updateJobForm){
        this.addNewJobSubscription = this.employeerService.updatePostedJob(this.jobIdToUpdate, newJob).subscribe(
          {
            next : (requestResult : RequestResult)=>{
              alert('Job Updated Successfull');
            },
            error : (err)=>{
              alert(err.error.message);
            }
          }
        )
      }
      else{
        this.addNewJobSubscription = this.employeerService.addNewJob(newJob).subscribe(
          {
            next : (requestResult : RequestResult)=>{
              alert('Job Added Successfull');
              this.addJobFormGroup.reset();
            },
            error : (requestResult : RequestResult)=>{
              alert(requestResult.message);
            }
          }
        )
      }
    }
    else{
      this.formInputFields.forEach(inputField => {
        this.addJobFormGroup.get(inputField.formControlName)?.markAsDirty();
      });
      this.addJobFormGroup.controls['employementType'].markAsDirty();
      this.addJobFormGroup.controls['workMode'].markAsDirty();
    }
  }
  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
    this.routeUrlSubscription?.unsubscribe();
    this.getJobByIdSubscription?.unsubscribe();
    this.addNewJobSubscription?.unsubscribe();
  }
}
