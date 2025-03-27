import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { User } from '../../../../shared/entity/user';
import { EmployeerCompany } from '../../../../shared/entity/employeerCompany';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { RequestResult } from '../../../../shared/types/types';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm! : FormGroup;
  employeerCompanyFormGroup! : FormGroup;
  employeerRegistration : boolean = false;
  formInputFields : {id : string, formControlName : string, placeholder : string}[] = [
    {id : 'emailInput', formControlName : 'email', placeholder : 'E-mail'},
    {id : 'passwordInput', formControlName : 'password', placeholder : 'Password'},
    {id : 'confirmPasswordInput', formControlName : 'confirmPassword', placeholder : 'Confirm Password'},
    {id : 'firstNameInput', formControlName : 'firstName', placeholder : 'First Name'},
    {id : 'lastNameInput', formControlName : 'lastName', placeholder : 'Last Name'},
    {id : 'addressInput', formControlName : 'address', placeholder : 'Address'},
    {id : 'resumeInput', formControlName : 'resume', placeholder : 'Resume'},
  ];
  industryFieldOptions = ['Select','Agriculture', 'Automotive', 'Banking and Finance', 'Construction', 'Consumer Goods', 'Education', 'Energy', 'Entertainment', 'Healthcare', 'Information Technology', 'Manufacturing', 'Media', 'Real Estate', 'Retail', 'Telecommunications', 'Transportation', 'Travel and Tourism'];

  constructor(
    private userService : UserService,
    private customFormValidators : CustomFormValidators
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
        resume  : new FormControl('', [this.customFormValidators.defaultValidator]),
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
    this.registerForm.controls['resume'].addValidators(this.customFormValidators.defaultValidator);
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

  submitForm(){
    if(!this.registerForm.invalid){

      const user : User & UserProfile = {
        email : this.registerForm.get('email')!.value,
        password : this.registerForm.controls['password'].value,
        address : this.registerForm.controls['address'].value,
        firstName : this.registerForm.controls['firstName'].value,
        lastName : this.registerForm.controls['lastName'].value,
        phoneNumber : this.phoneNumbers[0].value + (this.phoneNumbers[1] ? ' '+ this.phoneNumbers[1].value : ''),
        resume : !this.employeerRegistration ? this.registerForm.controls['resume'].value : null,
        role : this.employeerRegistration ? 'employeer' : 'user',
        user : undefined,
        employeerCompany : undefined,
      }
      let employeerCompany! : EmployeerCompany;
      if(this.employeerRegistration){
        employeerCompany  = {
          name: this.employeerCompanyFormGroup.controls['companyName'].value,
          description: this.employeerCompanyFormGroup.controls['description'].value,
          industry: this.employeerCompanyFormGroup.controls['industry'].value,
          companySize: this.employeerCompanyFormGroup.controls['companySize'].value,
          website: this.employeerCompanyFormGroup.controls['website'].value,
          location: this.employeerCompanyFormGroup.controls['location'].value,
          averageRating: 0
        }
      }

      this.userService.register(user, employeerCompany).subscribe(
        {
          next : (requestResult : RequestResult)=>{
            alert('Registration Successfull');
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
}
