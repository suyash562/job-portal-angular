import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/service/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  userRole! : string | null;

  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
  }
}
