import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomFormValidators{

    defaultValidator(control : AbstractControl) : ValidationErrors | null {  
        if(control.value === '' || control.value === 'Select'){
            return {error : '* Required'};
        }
        else if((control.value as string).startsWith(' ') || (control.value as string).endsWith(' ')){
            return {error : 'Cannot contain leading or trailing space'};
        }
        return null;
    }
    
    requiredValidator(control : AbstractControl) : ValidationErrors | null {  
        if(control.value === ''){
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
            return {error : 'Invalid phone number'}
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

}