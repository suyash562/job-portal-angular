import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './feature/user/service/user.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { RequestResult } from './shared/types/types';
import { Notification } from './shared/entity/notification';
import { WebSocketService } from './service/web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  userLoggedIn! : boolean;
  displayOverlaySpinner : boolean = false;
  userNotifications! : Notification[];
  newNotificationsCount : number = 0;
  userLoggedInSubscription! : Subscription;
  displayOverlaySpinnerSubscription! : Subscription;
  displayErrorToastSubscription! : Subscription;
  displaySuccessToastSubscription! : Subscription;
  getUserNotificationSubscription! : Subscription;
  markNotificationAsReadSubscription! : Subscription;
  isRedirectedFromDashboardSubscription! : Subscription;
  webSocketClientSubscription! : Subscription;

  constructor(
    private appService : AppService,
    private userService : UserService,
    private router : Router,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private webSocketService : WebSocketService,
  ){}

  ngOnInit(): void {    

    this.userLoggedInSubscription = this.userService.userLoggedInObservable.subscribe({
      next : (value) => {
        this.userLoggedIn = value;
        if(value){
          this.getUserNotifications();
          this.connectToWebSocket();
        }
        else{
          this.webSocketClientSubscription?.unsubscribe();
        }
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

    this.displaySuccessToastSubscription = this.appService.displaySuccessToastObservable.subscribe({
      next : (successMessage : string) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: successMessage, life : 4000});
      }
    });

    this.isRedirectedFromDashboardSubscription = this.appService.isRedirectedFromDashboardObservable.subscribe({
      next : (isRedirected) => {
        if(isRedirected){
          this.confirmationService.confirm({
            header: 'Log In',
            message: 'Please Log In to proceed',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
            },
            acceptButtonProps: {
                label: 'Okay',
                severity : 'contrast'
            },
            accept: () => {
              this.appService.emitIsRedirectedFromDashboardSubject(false);
              this.router.navigate(['/user/login']);
            },
            reject: () => {
              this.appService.emitIsRedirectedFromDashboardSubject(false);
            },
          });
        }
      }
    })
  }
  
  getUserNotifications(){
    this.getUserNotificationSubscription = this.appService.getUserNotification().subscribe({
      next : (requestResult : RequestResult) => {
        this.userNotifications = requestResult.value.notifications; 
        this.newNotificationsCount = requestResult.value.newNotificationsCount;
      }
    });
  }

  connectToWebSocket(){
    this.webSocketService.connectToWebSocketServer();
    this.webSocketClientSubscription = this.webSocketService.webSocketClient.subscribe({
      next : (value) => {
        this.userNotifications?.unshift(value);
        this.newNotificationsCount++;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  logout(){
    this.displayOverlaySpinner = true;
    this.userService.logout().subscribe({
      next : () => {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('email');
        this.userService.updateUserLoginStatus(false);
        this.router.navigate(['']);
      }
    })
  }

  markNotificationAsRead(event : any){
    if(!event.notification.isRead){      
      this.displayOverlaySpinner = true;
      this.appService.markNotificationAsRead(event.notification.id).subscribe({
        next : (requestResult : RequestResult) => {
          this.userNotifications[event.index].isRead = true;
          this.newNotificationsCount--;
          this.appService.updateNotificationsDrawerVisisbleSubject(false);
          this.router.navigate([event.notification.actionUrl]);
        }
      })
    }
    else{
      this.appService.updateNotificationsDrawerVisisbleSubject(false);
      this.router.navigate([event.notification.actionUrl]);
    }
  }

  ngOnDestroy(): void {
    this.displayOverlaySpinnerSubscription?.unsubscribe();
    this.userLoggedInSubscription?.unsubscribe();
    this.displayErrorToastSubscription?.unsubscribe();
    this.getUserNotificationSubscription?.unsubscribe();
    this.markNotificationAsReadSubscription?.unsubscribe();
    this.isRedirectedFromDashboardSubscription?.unsubscribe();
    this.webSocketClientSubscription?.unsubscribe();
  }
}
