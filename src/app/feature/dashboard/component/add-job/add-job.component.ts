import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { Job } from '../../../../shared/entity/job';
import { EmployeerService } from '../../service/employeer/employeer.service';

@Component({
  selector: 'app-add-job',
  standalone: false,
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit{
  addJobFormGroup! : FormGroup;
  formInputFields! : {id : string, inputType : string, formControlName : string, placeholder : string}[];
  employementTypeInputFields! : string[];
  workModeInputFields! : string[];

  constructor(
    private customFormValidators : CustomFormValidators,
    private employeerService : EmployeerService,
  ){}

  ngOnInit(): void {

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
        deadlineForApplying  : new FormControl('', [this.customFormValidators.defaultValidator]),
        postingDate  : new FormControl('', [this.customFormValidators.defaultValidator]),
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
      {id : 'deadlineForApplyingInput', inputType : 'date' , formControlName : 'deadlineForApplying', placeholder : ''},
      {id : 'postingDateInput', inputType : 'date' , formControlName : 'postingDate', placeholder : ''},
    ];

    this.employementTypeInputFields = ['Select', "Full Time" , "Part Time"];
    this.workModeInputFields = ['Select', 'Offline' , 'Online' , 'Hybrid'];
  }

  getErrorMessage(field : string){
    return this.addJobFormGroup.get(field)?.dirty && this.addJobFormGroup.get(field)?.errors ? this.addJobFormGroup.get(field)?.getError('error') : ''
  }

  submitForm(){
    if(!this.addJobFormGroup.invalid){
    
      const newJob : Job = {
        title : this.addJobFormGroup.controls['title'].value,
        description : this.addJobFormGroup.controls['description'].value,
        requiredSkills : this.addJobFormGroup.controls['requiredSkills'].value,
        vacancies : this.addJobFormGroup.controls['vacancies'].value,
        preferredSkills : this.addJobFormGroup.controls['preferredSkills'].value,
        employementType : this.addJobFormGroup.controls['employementType'].value,
        workMode : this.addJobFormGroup.controls['workMode'].value,
        salaryRange : this.addJobFormGroup.controls['salaryRange'].value,
        facilities : this.addJobFormGroup.controls['facilities'].value,
        experienceLevel : this.addJobFormGroup.controls['experienceLevel'].value,
        workLocation : this.addJobFormGroup.controls['workLocation'].value,
        deadlineForApplying : this.addJobFormGroup.controls['deadlineForApplying'].value,
        postingDate : this.addJobFormGroup.controls['postingDate'].value,
      }
      
      this.employeerService.addNewJob(newJob).subscribe(
        {
          next : ()=>{
            alert('Job Added Successfull');
          },
          error : (err)=>{
            console.log(err);
            alert(err.error.error);
          }
        }
      )
    }
    else{
      this.formInputFields.forEach(inputField => {
        this.addJobFormGroup.get(inputField.formControlName)?.markAsDirty();
      });
      this.addJobFormGroup.controls['employementType'].markAsDirty();
      this.addJobFormGroup.controls['workMode'].markAsDirty();
    }
  }
}
