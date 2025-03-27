import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageJobsComponent } from './component/manage-jobs/manage-jobs.component';
import { UpdateJobComponent } from './component/update-job/update-job.component';
import { ApplicationComponent } from './component/application/application.component';


@NgModule({
  declarations: [
    DashboardParentComponent,
    SidebarComponent,
    ProfileComponent,
    AddJobComponent,
    ManageJobsComponent,
    UpdateJobComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
