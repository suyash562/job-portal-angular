import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-drawer',
  standalone: false,
  templateUrl: './notification-drawer.component.html',
  styleUrl: './notification-drawer.component.css'
})
export class NotificationDrawerComponent implements OnInit, OnDestroy{
  isDrawerVisible : boolean = false;
  notificationsDrawerVisisbleSubscription! : Subscription;

  constructor(
    private appService : AppService
  ){}

  ngOnInit(): void {
    this.notificationsDrawerVisisbleSubscription = this.appService.notificationsDrawerVisisble.subscribe({
      next : (value) => {
        this.isDrawerVisible = value;
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationsDrawerVisisbleSubscription?.unsubscribe();
  }
}
