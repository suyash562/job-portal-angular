import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './component/job-list/job-list.component';
import { SharedModule } from "../../shared/shared.module";
import { JobDescriptionComponent } from './component/job-description/job-description.component';


@NgModule({
  declarations: [
    JobListComponent,
    JobDescriptionComponent
  ],
  imports: [
    CommonModule,
    JobListRoutingModule,
    SharedModule
]
})
export class JobListModule { }
