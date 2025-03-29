import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { RequestResult } from '../../../../shared/types/types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm! : FormGroup;
  employeerCompanyFormGroup! : FormGroup;
  employeerRegistration : boolean = false;
  resumeFileSelected : boolean = false;
  registerSubscription! : Subscription;
  formInputFields : {id : string, type : string, formControlName : string, placeholder : string}[] = [
    {id : 'emailInput', type : 'text', formControlName : 'email', placeholder : 'E-mail'},
    {id : 'passwordInput', type : 'text', formControlName : 'password', placeholder : 'Password'},
    {id : 'confirmPasswordInput', type : 'text', formControlName : 'confirmPassword', placeholder : 'Confirm Password'},
    {id : 'firstNameInput', type : 'text', formControlName : 'firstName', placeholder : 'First Name'},
    {id : 'lastNameInput', type : 'text', formControlName : 'lastName', placeholder : 'Last Name'},
    {id : 'addressInput', type : 'text', formControlName : 'address', placeholder : 'Address'},
  ];
  industryFieldOptions = ['Select','Agriculture', 'Automotive', 'Banking and Finance', 'Construction', 'Consumer Goods', 'Education', 'Energy', 'Entertainment', 'Healthcare', 'Information Technology', 'Manufacturing', 'Media', 'Real Estate', 'Retail', 'Telecommunications', 'Transportation', 'Travel and Tourism'];
  
  constructor(
    private userService : UserService,
    private customFormValidators : CustomFormValidators,
    private router : Router
  ){}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email    : new FormControl('', [this.customFormValidators.validateEmail, this.customFormValidators.defaultValidator]),
        password : new FormControl('', [this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
        confirmPassword : new FormControl('', [this.customFormValidators.validatePassword, this.customFormValidators.defaultValidator]),
        firstName : new FormControl('', [this.customFormValidators.validateName, this.customFormValidators.defaultValidator]),
        lastName  : new FormControl('', [this.customFormValidators.validateName, this.customFormValidators.defaultValidator]),
        phoneNumbers : new FormArray(
          [
            new FormControl('', [this.customFormValidators.validatePhoneNumber,]),
          ]
        ),
        address : new FormControl('', [this.customFormValidators.defaultValidator]),
        resume  : new FormControl('', [this.customFormValidators.validateResume])
      }
    );
    this.employeerCompanyFormGroup = new FormGroup(
      {
        companyName    : new FormControl('', [this.customFormValidators.defaultValidator]),
        description : new FormControl('', [this.customFormValidators.defaultValidator]),
        industry : new FormControl('', [this.customFormValidators.defaultValidator]),
        companySize : new FormControl('', [this.customFormValidators.requiredValidator]),
        website  : new FormControl('', [this.customFormValidators.validateUrl, this.customFormValidators.defaultValidator]),
        location : new FormControl('', [this.customFormValidators.defaultValidator]),
      }
    );
  }
  
  get phoneNumbers(){
    return (this.registerForm.get('phoneNumbers') as FormArray).controls;
  }
  
  enableEmployeerRegistration(){
    this.employeerRegistration = true;
    this.registerForm.controls['resume'].clearValidators();
    this.registerForm.addControl('employeerCompany', this.employeerCompanyFormGroup);
  }
  
  disableEmployeerRegistration(){
    this.employeerRegistration = false;
    this.registerForm.controls['resume'].addValidators(this.customFormValidators.requiredValidator);
    this.registerForm.removeControl('employeerCompany');
  }

  addNewContact(){        
    if(this.phoneNumbers.length < 2){
      (this.registerForm.get('phoneNumbers') as FormArray).push(new FormControl('', this.customFormValidators.validatePhoneNumber))
    }
  }

  removeContact(){
    if(this.phoneNumbers.length === 2){
      (this.registerForm.get('phoneNumbers') as FormArray).removeAt(1);
    }
  }

  getErrorMessage(field : string){
    return this.registerForm.get(field)?.dirty && this.registerForm.get(field)?.errors ? this.registerForm.get(field)?.getError('error') : ''
  }
  
  getErrorMessageForContact(contactControlName : number){
    return this.phoneNumbers[contactControlName].dirty && this.phoneNumbers[contactControlName].errors ? this.phoneNumbers[contactControlName].getError('error') : ''
  }

  getResumeFieldValue(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.registerForm.patchValue({
        resume: event.target.files[0]
      });
      this.registerForm.controls['resume'].markAsDirty();
    }
  }


  submitForm(){
    
    if(!this.registerForm.invalid){
      if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value){
        this.registerForm.get('confirmPassword')?.setErrors({error : 'Confirm password must match provided password'});
        return;
      }

      let formData = new FormData();

      for (const key of Object.keys(this.registerForm.value)) {
        if(key !== 'employeerCompany'){
          formData.set(key, this.registerForm.value[key]);
        }
      }
      formData.set('role',this.employeerRegistration ? 'employeer' : 'user');
      if(this.employeerRegistration){
        for (const key of Object.keys(this.employeerCompanyFormGroup.value)) {
          formData.set(key, this.employeerCompanyFormGroup.value[key]);
        }
      }
      
      this.registerSubscription = this.userService.register(formData).subscribe(
        {
          next : (requestResult : RequestResult)=>{
            alert('Registration Successfull');
            this.router.navigate(['/user']);
          },
          error : (err)=>{
            console.log(err);
            alert(err.error.error);
          }
        }
      )

    }
    else{
    
      this.registerForm.get('email')?.markAsDirty();
      this.registerForm.get('password')?.markAsDirty();
      this.registerForm.get('confirmPassword')?.markAsDirty();
      this.registerForm.get('firstName')?.markAsDirty();
      this.registerForm.get('lastName')?.markAsDirty();
      this.registerForm.get('address')?.markAsDirty();
      this.registerForm.get('resume')?.markAsDirty();
      this.phoneNumbers[0].markAsDirty();
      this.phoneNumbers[1]?.markAsDirty();  

      if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value){
        this.registerForm.get('confirmPassword')?.setErrors({error : 'Confirm password must match provided password'});
      }

      if(this.employeerRegistration){
        this.employeerCompanyFormGroup.controls['companyName'].markAsDirty();
        this.employeerCompanyFormGroup.controls['description'].markAsDirty();
        this.employeerCompanyFormGroup.controls['industry'].markAsDirty();
        this.employeerCompanyFormGroup.controls['companySize'].markAsDirty();
        this.employeerCompanyFormGroup.controls['website'].markAsDirty();
        this.employeerCompanyFormGroup.controls['location'].markAsDirty();
      }
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
