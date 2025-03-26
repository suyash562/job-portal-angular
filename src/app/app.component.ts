import { Component, OnInit } from '@angular/core';
import { UserService } from './feature/user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'job-portal';
  userLoggedIn! : boolean;

  constructor(
    private userService : UserService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.userService.userLoggedInSubject.subscribe({
      next : (value) => {
        this.userLoggedIn = value;
      }
    });
  }

  logout(){
    this.userService.logout().subscribe({
      next : () => {
        sessionStorage.removeItem('role');
        this.userService.updateUserLoginStatus(false);
        this.router.navigate(['']);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
}
