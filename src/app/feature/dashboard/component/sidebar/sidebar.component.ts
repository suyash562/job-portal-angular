import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  userRole! : string;

  constructor(
    private sidebarService : SidebarService
  ){}
  ngOnInit(): void {
    this.sidebarService.getUserRole().subscribe({
      next : (value : any) =>{
        this.userRole = value.role;
      }
    })
  }


}
