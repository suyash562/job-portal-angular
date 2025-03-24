import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../validators/formValidators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  customFormValidators! : CustomFormValidators;
  registerForm! : FormGroup;

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
      console.log(this.registerForm);
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
        this.registerForm.get('confirmPassword')?.setErrors({error : 'Confirm password must match provided password'})
      }
    }
  }
}
