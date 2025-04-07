import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../feature/user/service/user.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  @Input('isUserLoggedIn') isUserLoggedIn! : boolean;
  @Input('newNotificationsCount') newNotificationsCount : number = 0;
  @Output() logoutEvent : EventEmitter<void> = new EventEmitter();
  
  constructor(
    private appService : AppService,
  ){}

  enableNotificationsDrawer(){    
    this.appService.updateNotificationsDrawerVisisbleSubject(true);
  }

  logout(){
    this.logoutEvent.emit();
  } 
}
