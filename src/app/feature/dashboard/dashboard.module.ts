import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageJobsComponent } from './component/manage-jobs/manage-jobs.component';
import { ApplicationComponent } from './component/application/application.component';
import { ViewJobComponent } from './component/view-job/view-job/view-job.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentUserApplicationComponent } from './component/current-user-application/current-user-application.component';



@NgModule({
  declarations: [
    DashboardParentComponent,
    SidebarComponent,
    ProfileComponent,
    AddJobComponent,
    ManageJobsComponent,
    ApplicationComponent,
    ViewJobComponent,
    CurrentUserApplicationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
