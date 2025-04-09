import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';
import { AdminService } from '../../service/admin/admin.service';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit, OnDestroy{
  adminCount! : number;
  employersCount! : number;
  usersCount! : number;
  getUserInfoSubscription! : Subscription;

  constructor(
    private appService : AppService,
    private adminService : AdminService,
  ){}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.getUserInfoSubscription = this.adminService.getUserInfoEmployers().subscribe({
      next : (result : RequestResult) => {         
        this.adminCount = result.value[0].count;
        this.employersCount = result.value[1].count;
        this.usersCount = result.value[2].count;
      }
    })
  }

  ngOnDestroy(): void {
    this.getUserInfoSubscription?.unsubscribe();
  }
}
