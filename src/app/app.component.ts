import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './feature/user/service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { RequestResult } from './shared/types/types';
import { Notification } from './shared/entity/notification';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'job-portal';
  userLoggedIn! : boolean;
  displayOverlaySpinner : boolean = false;
  userNotifications! : Notification[];
  userLoggedInSubscription! : Subscription;
  displayOverlaySpinnerSubscription! : Subscription;
  displayErrorToastSubscription! : Subscription;
  getUserNotificationSubscription! : Subscription;
  markNotificationAsReadSubscription! : Subscription;

  constructor(
    private appService : AppService,
    private userService : UserService,
    private router : Router,
    private messageService : MessageService,
  ){}

  ngOnInit(): void {    
    this.userLoggedInSubscription = this.userService.userLoggedInSubject.subscribe({
      next : (value) => {
        this.userLoggedIn = value;
      }
    });

    this.displayOverlaySpinnerSubscription = this.appService.displayOverlaySpinner.subscribe({
      next : (value : boolean) => {
        this.displayOverlaySpinner = value;
      }
    });

    this.displayErrorToastSubscription = this.appService.displayErrorToast.subscribe({
      next : (errorMessage : string) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life : 4000});
      }
    });

    this.getUserNotificationSubscription = this.appService.getUserNotification().subscribe({
      next : (requestResult : RequestResult) => {
        this.userNotifications = requestResult.value;        
      }
    })
  }
  
  logout(){
    this.displayOverlaySpinner = true;
    this.userService.logout().subscribe({
      next : () => {
        sessionStorage.removeItem('role');
        this.userService.updateUserLoginStatus(false);
        this.router.navigate(['']);
      }
    })
  }

  markNotificationAsRead(event : any){
    this.displayOverlaySpinner = true;
    this.appService.markNotificationAsRead(event.notification.id).subscribe({
      next : (requestResult : RequestResult) => {
        this.appService.updateNotificationsDrawerVisisbleSubject(false);
        this.userNotifications[event.index].isRead = true;
        this.router.navigate([event.notification.actionUrl]);
      }
    })
  }

  ngOnDestroy(): void {
    this.displayOverlaySpinnerSubscription?.unsubscribe();
    this.userLoggedInSubscription?.unsubscribe();
    this.displayErrorToastSubscription?.unsubscribe();
    this.getUserNotificationSubscription?.unsubscribe();
    this.markNotificationAsReadSubscription?.unsubscribe();
  }
}
