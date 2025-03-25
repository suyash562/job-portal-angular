import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../feature/user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isUserLoggedIn : boolean = false;
  
  constructor(
    private userService : UserService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.userService.userLoggedInSubject.subscribe({
      next : (value : boolean) => {
        this.isUserLoggedIn = value
      }
    })
  }

  logout(){
    this.userService.logout().subscribe({
      next : () => {
        sessionStorage.removeItem('userToken');
        this.userService.userLoggedInSubject.next(false);
        this.router.navigate(['']);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
}
