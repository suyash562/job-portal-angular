import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';
import { OtpValidationComponent } from './component/otp-validation/otp-validation.component';
import { CardModule } from 'primeng/card';
import { InputOtpModule } from 'primeng/inputotp';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpValidationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabel,
    SelectModule,
    Toast,
    SharedModule,
    CardModule,
    InputOtpModule,
    FormsModule,
    DialogModule
  ],
  providers: [
    MessageService
  ]
})
export class UserModule { }
