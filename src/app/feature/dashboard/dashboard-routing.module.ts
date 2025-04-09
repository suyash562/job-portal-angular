import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { ManageJobsComponent } from './component/manage-jobs/manage-jobs.component';
import { ApplicationComponent } from './component/application/application.component';
import { ViewJobComponent } from './component/view-job/view-job.component';
import { CurrentUserApplicationComponent } from './component/current-user-application/current-user-application.component';
import { ViewSelectedApplicationComponent } from './component/view-selected-application/view-selected-application.component';
import { ScheduleInterviewComponent } from './component/schedule-interview/schedule-interview.component';
import { VerifyEmployersComponent } from './component/verify-employers/verify-employers.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { AdminGuard } from './guard/admin.guard';
import { EmployerGuard } from './guard/employer.guard';


const routes: Routes = [
  {path : '', redirectTo : 'component', pathMatch : 'full'},
  {path : 'component',  component : DashboardParentComponent, children : [
    {path : '', redirectTo : 'userProfile' , pathMatch : 'full'},
    {path : 'userProfile', component : ProfileComponent},

    {path : 'user', children : [
      {path : 'current-user-application', component : CurrentUserApplicationComponent},
      {path : 'userApplication/:applicationId', component : ViewSelectedApplicationComponent},
      {path : 'viewJob/:jobId', component : ViewJobComponent},
    ]},
    
    {path : 'employeer', canActivate : [EmployerGuard], children : [
      {path : 'addJob', component : AddJobComponent},
      {path : 'manageJobs', component : ManageJobsComponent},
      {path : 'updateJob/:jobId', component : AddJobComponent},
      {path : 'applications', component : ApplicationComponent},
      {path : 'schedule-interview/:applicationId', component : ScheduleInterviewComponent},
    ]},

    {path : 'admin', canActivate : [AdminGuard] ,children : [
      {path : 'verify-employeers', component : VerifyEmployersComponent},
      {path : 'manage-users', component : ManageUsersComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
