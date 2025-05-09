import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RequestResult } from './shared/types/types';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private displayErrorToastSubject : Subject<string> = new Subject();
  private displaySuccessToastSubject : Subject<string> = new Subject();
  private displayOverlaySpinnerSubject : Subject<boolean> = new Subject();
  private notificationsDrawerVisisbleSubject : Subject<boolean> = new Subject();
  private isRedirectedFromDashboardSubject : BehaviorSubject<boolean> = new BehaviorSubject(false);  


  constructor(
    private httpClient : HttpClient
  ){}

  get displayOverlaySpinner(){
    return this.displayOverlaySpinnerSubject.asObservable();
  }

  get displayErrorToast(){
    return this.displayErrorToastSubject.asObservable();
  }

  get displaySuccessToastObservable(){
    return this.displaySuccessToastSubject.asObservable();
  }

  get notificationsDrawerVisisble(){
    return this.notificationsDrawerVisisbleSubject.asObservable();
  }

  get isRedirectedFromDashboardObservable(){
    return this.isRedirectedFromDashboardSubject.asObservable();
  }

  emitIsRedirectedFromDashboardSubject(isRedirected : boolean){
    this.isRedirectedFromDashboardSubject.next(isRedirected);
  }

  updateDisplayOverlaySpinnerSubject(visible : boolean){
    this.displayOverlaySpinnerSubject.next(visible);
  }

  updateDisplayErrorToastSubject(errorMessage : string){
    this.displayErrorToastSubject.next(errorMessage);
  }

  updateDisplaySuccessToastSubject(successMessage : string){
    this.displaySuccessToastSubject.next(successMessage);
  }

  updateNotificationsDrawerVisisbleSubject(isVisible : boolean){
    this.notificationsDrawerVisisbleSubject.next(isVisible);
  }

  getUserNotification(){
    return this.httpClient.get<RequestResult>('http://localhost:3200/notification/getAll', {withCredentials : true});
  }

  markNotificationAsRead(notificationId : number){
    return this.httpClient.get<RequestResult>(`http://localhost:3200/notification/mark-as-read/${notificationId}`, {withCredentials : true});
  }

}
