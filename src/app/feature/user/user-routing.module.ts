import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OtpValidationComponent } from './component/otp-validation/otp-validation.component';
import { OtpVerificationGuard } from './guard/otp-verification-guard';


const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch :'full'},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'validateOtp', canActivate : [OtpVerificationGuard], canDeactivate : [OtpVerificationGuard] ,component : OtpValidationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
