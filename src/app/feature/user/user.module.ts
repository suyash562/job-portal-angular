import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { EmployeerRegistrationFormComponent } from './component/employeer-registration-form/employeer-registration-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmployeerRegistrationFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
