import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './feature/dashboard/route-guard/dashboard';

const routes: Routes = [
  {path : '', redirectTo : 'jobs', pathMatch : 'full'},
  {path : 'jobs', loadChildren : () => import('../app/feature/job-list/job-list.module').then(m => m.JobListModule)},
  {path : 'dashboard', canActivate : [DashboardGuard] ,loadChildren : () => import('../app/feature/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path : 'user', loadChildren : () => import('./feature/user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
