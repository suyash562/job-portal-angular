import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './feature/user/service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

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
  userLoggedInSubscription! : Subscription;
  displayOverlaySpinnerSubscription! : Subscription;
  displayErrorToastSubscription! : Subscription;

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
    })

    this.displayErrorToastSubscription = this.appService.displayErrorToast.subscribe({
      next : (errorMessage : string) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage});
      }
    })

  }
  
  logout(){
    this.userService.logout().subscribe({
      next : () => {
        localStorage.removeItem('role');
        this.userService.updateUserLoginStatus(false);
        this.router.navigate(['']);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.displayOverlaySpinnerSubscription?.unsubscribe();
    this.userLoggedInSubscription?.unsubscribe();
    this.displayErrorToastSubscription?.unsubscribe();
  }
}
