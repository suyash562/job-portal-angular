import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestResult } from './shared/types/types';
import { Notification } from './shared/entity/notification';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private displayErrorToastSubject : Subject<string> = new Subject();
  private displayOverlaySpinnerSubject : Subject<boolean> = new Subject();
  private notificationsDrawerVisisbleSubject : Subject<boolean> = new Subject();

  constructor(
    private httpClient : HttpClient
  ){}

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

  getUserNotification(){
    return this.httpClient.get<RequestResult>('http://localhost:3200/notification/getAll', {withCredentials : true});
  }

  markNotificationAsRead(notificationId : number){
    return this.httpClient.post<RequestResult>('http://localhost:3200/notification/mark-as-read', {notificationId : notificationId}, {withCredentials : true});
  }

}
