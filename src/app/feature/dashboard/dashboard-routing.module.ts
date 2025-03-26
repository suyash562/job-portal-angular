import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { ManageJobsComponent } from './component/manage-jobs/manage-jobs.component';

const routes: Routes = [
  {path : '', redirectTo : 'component', pathMatch : 'full'},
  {path : 'component',  component : DashboardParentComponent, children : [
    {path : '', redirectTo : 'userProfile' , pathMatch : 'full'},
    {path : 'userProfile', component : ProfileComponent},
    {path : 'addJob', component : AddJobComponent},
    {path : 'manageJobs', component : ManageJobsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
