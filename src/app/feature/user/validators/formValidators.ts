import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomFormValidators{

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
    
    validateAddress(control : AbstractControl) : ValidationErrors | null {
        if((control.value as string).length === 0){
            return {error : 'Required'}
        }
        return null;
    }

}