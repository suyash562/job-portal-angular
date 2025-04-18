import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn :'root'
})
export class CustomFormValidators{

    defaultValidator(control : AbstractControl) : ValidationErrors | null {  
        if(control.value === '' || control.value === null){
            return {error : '* Required'};
        }
        else if((control.value as string)?.startsWith(' ') || (control.value as string)?.endsWith(' ')){
            return {error : 'Cannot contain leading or trailing space'};
        }
        return null;
    }
    
    requiredValidator(control : AbstractControl) : ValidationErrors | null {  
        if(control.value === '' || control.value === null){
            return {error : '* Required'};
        }
        return null;
    }
    
    validatePassword(control : AbstractControl) : ValidationErrors | null {  
        const regEx : RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;  
        if(!regEx.test(control.value)){
          return {error : 'Password must contain at least eight characters, one number, one letter and special characters'};
        }
        return null;
    }

    validateEmail(control : AbstractControl) : ValidationErrors | null {  
        const regEx : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
        if(!regEx.test(control.value)){
          return {error : 'Invalid Email'};
        }
        return null;
    }

    validateName(control : AbstractControl) : ValidationErrors | null {
        const regEx : RegExp = /^[a-zA-Z]{2,}$/;
        if(!regEx.test(control.value)){
            return {error : 'Invalid name'}
        }
        return null;
    }
    
    validatePhoneNumber(control : AbstractControl) : ValidationErrors | null {
        const regEx : RegExp = /^[6-9]\d{9}$/;
        if(!regEx.test(control.value)){
            return {error : 'Invalid contact number'}
        }
        return null;
    }
    
    validateUrl(control : AbstractControl) : ValidationErrors | null {
        const regEx : RegExp = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
        if(!regEx.test(control.value)){
            return {error : 'Invalid url'}
        }
        return null;
    }

    validateNumber(control : AbstractControl) : ValidationErrors | null{
        if(control.value < 0){
            return {error : 'Invalid'}
        }
        return null;
    }

    validateSalary(control : AbstractControl) : ValidationErrors | null{
        if(control.value <= 0){
            return {error : 'Invalid'}
        }
        return null;
    }

    validateResume(control : AbstractControl) : ValidationErrors | null{
        
        if(!control.value || control.value === ''){
            return {error : '* Required'};
        }
        const fileSplit : string[] = (control.value.name as string).split('.');
        if(fileSplit[fileSplit.length-1] !== 'pdf'){
            return {error : 'Upload only pdf files'};
        }
        if(control.value.size > 10 * 1024 *1024){
            return {error : 'Maximum size of file must be 10 MB'};
        }
        return null;
    }

    validateDescription(control : AbstractControl) : ValidationErrors | null{
        
        if((control.value as string)?.startsWith(' ') || (control.value as string)?.endsWith(' ')){
            return {error : 'Cannot contain leading or trailing space'};
        }
        return null;
    }

    validateSalaryRange(formControl: AbstractControl): ValidationErrors | null{
        const salaryRangeFrom : number = formControl.get('salaryRangeFrom')?.value;
        const salaryRangeTo : number = formControl.get('salaryRangeTo')?.value;
        
        if(!salaryRangeFrom || !salaryRangeTo || (salaryRangeFrom >= salaryRangeTo)){
            formControl.get('salaryRangeTo')?.setErrors({error : 'Must be greater than base salary'});
        }
        return null;
  };
}