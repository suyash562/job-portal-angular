import { ErrorHandler, Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { UserService } from "../feature/user/service/user.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn : 'root'
})
export class GlobalErrorHandler implements ErrorHandler{
    
    constructor(
        private appService : AppService,
        private userService : UserService,
        private router : Router,
    ){}

    handleError(error: any): void {
        console.log(error);
        
        if(error.status === 401){
            this.userService.clearUserSession();
            this.appService.updateDisplayErrorToastSubject('Session Timeout. Please log in again.');
            this.router.navigate(['user']);
        }
        else if(error.error instanceof ProgressEvent){
            this.appService.updateDisplayErrorToastSubject('Unable to reach server');
        }
        else if(error.error instanceof Blob){
            this.appService.updateDisplayErrorToastSubject('Failed to get resume');
        }
        else if(error instanceof Error){
            this.appService.updateDisplayErrorToastSubject('Something went wrong !!');
        }
        else{
            this.appService.updateDisplayErrorToastSubject(error.error);
        }
    }
}