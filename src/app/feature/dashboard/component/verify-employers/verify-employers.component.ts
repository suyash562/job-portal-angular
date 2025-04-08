import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestResult } from '../../../../shared/types/types';
import { UserService } from '../../../user/service/user.service';
import { AdminService } from '../../service/admin/admin.service';
import { User } from '../../../../shared/entity/user';
import { Router } from '@angular/router';
import { EmployeerCompany } from '../../../../shared/entity/employeerCompany';
import { AppService } from '../../../../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-employers',
  standalone: false,
  templateUrl: './verify-employers.component.html',
  styleUrl: './verify-employers.component.css'
})
export class VerifyEmployersComponent {
    userRole! : string | null;
    viewEmployerCompany : boolean = false;
    notVerifiedEmployers : User[] = [];
    employerCompany : EmployeerCompany | undefined;
    getNotVerifiedEmployersSubscription! : Subscription;
    employerData! : any[];
    employerDataTitle : string[] = [
      'E-mail',
      'Name',
      'Contact Numbers',
      'Address',
      'Actions'
    ];
    employerDataKey : string[] = [
      'email',
      'name',
      'contactNumbers',
      'address',
    ];
    actions : string[] = [
      'Company Info',
      'Approve',
    ];

    constructor(
      private userService : UserService,
      private appService : AppService,
      private adminService : AdminService,
      private messageService: MessageService,
      private router : Router,
    ){}

    ngOnInit(): void {
      this.userRole = this.userService.getUserRole();
      this.getNotVerifiedEmployers();
    }

    getNotVerifiedEmployers(){
      this.getNotVerifiedEmployersSubscription = this.adminService.getNotVerifiedEmployers().subscribe({
        next : (result : RequestResult) => {         
          this.employerData = [];
          this.notVerifiedEmployers = result.value;
          result.value.forEach((employer : User) => {
            this.employerData.push(
              {
                email : employer.email,
                name : employer.profile?.firstName+' '+employer.profile?.lastName,
                contactNumbers : employer.profile?.contactNumbers[0].number +' '+ (employer.profile?.contactNumbers[1] ? employer.profile?.contactNumbers[1].number : ''),
                address : employer.profile?.address
              }
            );
          });       
        }
      })
    }

    viewCompanyInfo(email : string){
      this.employerCompany = this.notVerifiedEmployers.find(employer => employer.email === email)?.employeerCompany;
      this.viewEmployerCompany= true;
    }

    disableCompanyInfo(){
      this.viewEmployerCompany= false;
      this.employerCompany = undefined;
    }
   
    approveRequest(email : string){
      this.appService.updateDisplayOverlaySpinnerSubject(true);
      this.adminService.approveEmployer(email).subscribe({
        next : (requestResult : RequestResult) => {
          const index = this.employerData.findIndex(employer => employer.email == email);
          this.employerData.splice(index, index+1);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: requestResult.message });
        }
      })
    }

    performSpecifiedAction(event : {actionType : string, dataObjectId : any}){
      if(event.actionType === 'Company Info'){      
        this.viewCompanyInfo(event.dataObjectId);
      }
      else if(event.actionType === 'Approve'){
        this.approveRequest(event.dataObjectId);
      }

    }
}
