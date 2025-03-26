import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';

const routes: Routes = [
  {path : '', redirectTo : 'component/userProfile', pathMatch : 'full'},
  {path : 'component',  component : DashboardParentComponent, children : [
    {path : 'userProfile', component : ProfileComponent},
    {path : 'addJob', component : AddJobComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
