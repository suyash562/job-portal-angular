import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../validators/formValidators';
import { UserService } from '../../service/user.service';
import { UserProfile } from '../../entity/userProfile';
import { User } from '../../entity/user';
import { EmployeerRegistrationFormComponent } from '../employeer-registration-form/employeer-registration-form.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit{
  customFormValidators! : CustomFormValidators;
  registerForm! : FormGroup;
  employeerRegistration : boolean = false;
  employeerCompanyFormGroup! : FormGroup;
  @ViewChild(EmployeerRegistrationFormComponent) employeerRegistrationComponent! : EmployeerRegistrationFormComponent;

  constructor(
    private userService : UserService
  ){}

  ngAfterViewInit(): void {
    this.employeerCompanyFormGroup = this.employeerRegistrationComponent.employeerCompanyForm;
    
  }

  ngOnInit(): void {

    this.customFormValidators = new CustomFormValidators();

    this.registerForm = new FormGroup(
      {
        email    : new FormControl('', [this.customFormValidators.validateEmail]),
        password : new FormControl('', [this.customFormValidators.validatePassword]),
        confirmPassword : new FormControl('', [this.customFormValidators.validatePassword]),
        firstName : new FormControl('', [this.customFormValidators.validateName]),
        lastName  : new FormControl('', [this.customFormValidators.validateName]),
        phoneNumbers : new FormArray(
          [
            new FormControl('', [this.customFormValidators.validatePhoneNumber]),
          ]
        ),
        address : new FormControl('', [this.customFormValidators.validateAddress]),
        employeerCompany : this.employeerCompanyFormGroup,
        resume  : new FormControl('', [Validators.required]),
      }
    );

  }
  
  get phoneNumbers(){
    return (this.registerForm.get('phoneNumbers') as FormArray).controls;
  }
  
  addNewContact(){        
    if(this.phoneNumbers.length < 2){
      (this.registerForm.get('phoneNumbers') as FormArray).push(new FormControl('', this.customFormValidators.validatePhoneNumber))
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
        phoneNumber : this.registerForm.controls['phoneNumber'].value,
        resume : this.registerForm.controls['resume'].value,
        role : 'user',
      }
      this.userService.register(user).subscribe(
        {
          next : ()=>{
            alert('Registration Successfull');

          },
          error : (err)=>{
            console.log(err);
            alert('Registration Failed');
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
      this.phoneNumbers[0].markAsDirty();
      this.phoneNumbers[1]?.markAsDirty();    
      if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value){
        this.registerForm.get('confirmPassword')?.setErrors({error : 'Confirm password must match provided password'});
      }
    }
  }
}
