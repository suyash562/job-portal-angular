import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/entity/user';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { RequestResult } from '../../../../shared/types/types';
import { JobListService } from '../../../job-list/service/jobList/job-list.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm! : FormGroup;
  customFormValidators! : CustomFormValidators;
  loginSubscription! : Subscription;
  
  constructor(
    private userService : UserService,
    private router : Router,
    private jobListService : JobListService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
    this.customFormValidators = new CustomFormValidators();

    this.loginForm = new FormGroup(
      {
        email : new FormControl('', [this.customFormValidators.validateEmail, this.customFormValidators.defaultValidator]),
        password : new FormControl('', [this.customFormValidators.defaultValidator]),
      }
    );
  }

  getErrorMessage(field : string){
    return this.loginForm.get(field)?.dirty && this.loginForm.get(field)?.errors ? this.loginForm.get(field)?.getError('error') : ''
  }

  submitForm(){
    if(!this.loginForm.invalid){

      const user : Partial<User> = {
        email : this.loginForm.controls['email'].value,
        password : this.loginForm.controls['password'].value,
      }

      this.loginSubscription = this.userService.login(user).subscribe(
        {
          next : (requestResult : RequestResult)=>{
            sessionStorage.setItem('role', requestResult.value.role);
            this.userService.updateUserLoginStatus(true);
            this.jobListService.emitIsRedirectedFromDashboardSubject(false);
            this.router.navigate(['/jobs']);
          },
          error : (response)=>{
            console.log(response);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.error, life: 3000 });
          }
        }
      )
    }
    else{
      this.loginForm.get('email')?.markAsDirty();
      this.loginForm.get('password')?.markAsDirty();
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
