import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../feature/user/service/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input('isUserLoggedIn') isUserLoggedIn! : boolean;
  @Output() logoutEvent : EventEmitter<void> = new EventEmitter();
  
  constructor(
    private userService : UserService,
  ){}

  ngOnInit(): void {
    this.userService.userLoggedInSubject.subscribe({
      next : (value : boolean) => {
        this.isUserLoggedIn = value
      }
    })
  }

  logout(){
    this.logoutEvent.emit();
  } 
}
