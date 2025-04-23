import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { AppService } from "../app.service";

@Injectable({
    providedIn : 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private appService : AppService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError(error => {
                return throwError(error);
            }),
            
            finalize(() => {
                this.appService.updateDisplayOverlaySpinnerSubject(false);
            })
        );
    }
}
