import { ErrorHandler, Injectable } from "@angular/core";
import { AppService } from "../app.service";

@Injectable({
    providedIn : 'root'
})
export class GlobalErrorHandler implements ErrorHandler{
    
    constructor(
        private appService : AppService
    ){}

    handleError(error: any): void {
        
        if(error.error instanceof ProgressEvent){
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