import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private displayErrorToastSubject : Subject<string> = new Subject();
  private displayOverlaySpinnerSubject : Subject<boolean> = new Subject();
  private notificationsDrawerVisisbleSubject : Subject<boolean> = new Subject();

  get displayOverlaySpinner(){
    return this.displayOverlaySpinnerSubject.asObservable();
  }

  get displayErrorToast(){
    return this.displayErrorToastSubject.asObservable();
  }

  get notificationsDrawerVisisble(){
    return this.notificationsDrawerVisisbleSubject.asObservable();
  }

  updateDisplayOverlaySpinnerSubject(visible : boolean){
    this.displayOverlaySpinnerSubject.next(visible);
  }

  updateDisplayErrorToastSubject(errorMessage : string){
    this.displayErrorToastSubject.next(errorMessage);
  }

  updateNotificationsDrawerVisisbleSubject(isVisible : boolean){
    this.notificationsDrawerVisisbleSubject.next(isVisible);
  }

}
