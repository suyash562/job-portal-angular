import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../shared/entity/user';
import { AdminService } from '../../service/admin/admin.service';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { AppService } from '../../../../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit , OnDestroy{
  users! : User[];
  getUsersSubscription! : Subscription;
  userData! : any[];
  usersDataTitle : string[] = [
    'Name',
    'E-mail',
    'Contact Number',
    'Role',
    'Status',
    'Actions'
  ];
  userDataKey : string[] = [
    'name',
    'email',
    'contactNumber',
    'role',
    'status',
  ];
  actions : string[] = [
    'Activate',
    'Deactivate',
  ];
  

  constructor(
    private appService : AppService,
    private messageService: MessageService,
    private adminService : AdminService,
  ){}

  ngOnInit(): void {

    this.getUsersSubscription = this.adminService.getAllVerifiedEmployers().subscribe({
      next : (requestResult : RequestResult) => {
        console.log(requestResult);
        this.userData = [];
        
        requestResult.value.forEach((user : User) => {
          this.userData.push(
            {
              name : user.profile?.firstName +' '+ user.profile?.lastName,
              email : user.email,
              contactNumber : user.profile?.contactNumbers[0].number +' '+ ( user.profile?.contactNumbers[1]?.number ?? '' ),
              role : user.role,
              status : user.isVerifiedByAdmin ? 'Active' : 'Inactive'
            }
          );
        });       
      }
    });
  }

  updateUserAccountStatus(email : string, status : string){
    this.appService.updateDisplayOverlaySpinnerSubject(true);
    this.adminService.updateUserAccountStatus(email, status).subscribe({
      next : (requestResult : RequestResult) => {
        this.userData.forEach((user : any) => {
          if(user.email === email){
            user.status = status === 'Activate' ? 'Active' : 'Inactive';
          }
        })
           
        this.messageService.add({ severity: 'success', summary: 'Success', detail: requestResult.message });
      }
    });
  }

  performSpecifiedAction(event : {actionType : string, dataObjectId : string}){
    if(event.actionType == 'Activate' || event.actionType == 'Deactivate'){
      this.updateUserAccountStatus(event.dataObjectId, event.actionType);
    }
  }

  ngOnDestroy(): void {
    this.getUsersSubscription?.unsubscribe();
  }
}
