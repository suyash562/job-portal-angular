import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardParentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
