import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppService } from '../../../app.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../entity/notification';


@Component({
  selector: 'app-notification-drawer',
  standalone: false,
  templateUrl: './notification-drawer.component.html',
  styleUrl: './notification-drawer.component.css'
})
export class NotificationDrawerComponent implements OnInit, OnDestroy{
  pDrawerStyle = {
    width : '30%', 
    'background-color' : 'rgb(245, 245, 245)',
    'border-radius' : '14px'
  };
  isDrawerVisible : boolean = false;
  notificationsDrawerVisisbleSubscription! : Subscription;
  @Input('notifications') notifications! : Notification[];
  @Output() markNotificationAsReadEvent : EventEmitter<{index : number, notification : Notification}> = new EventEmitter();

  constructor(
    private appService : AppService,
  ){}

  ngOnInit(): void {
    this.notificationsDrawerVisisbleSubscription = this.appService.notificationsDrawerVisisble.subscribe({
      next : (value) => {
        this.isDrawerVisible = value;
      }
    });   
  }

  onNotificationSelected(index : number, notification : Notification){
    this.markNotificationAsReadEvent.emit({index : index, notification : notification})
  }

  getStyleForReadNotifications(isRead : boolean){
    if(isRead){
      return {
        'background-color': 'rgb(120, 161, 182)'
      };
    }
    return null;
  }

  getLocalTime(date : Date){
    return new Date(date).toLocaleString().split(',');
  }

  ngOnDestroy(): void {
    this.notificationsDrawerVisisbleSubscription?.unsubscribe();
  }
}
