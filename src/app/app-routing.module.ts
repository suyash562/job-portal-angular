import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedIn } from './route-guard/loggedIn-guard';


const routes: Routes = [
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'home', loadChildren : () => import('../app/feature/home/home.module').then(m => m.HomeModule)},
  {path : 'jobs', loadChildren : () => import('../app/feature/job-list/job-list.module').then(m => m.JobListModule)},
  {path : 'dashboard', canActivate : [IsLoggedIn] ,loadChildren : () => import('../app/feature/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path : 'user', loadChildren : () => import('./feature/user/user.module').then(m => m.UserModule)},
  {path : '**', redirectTo : 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
