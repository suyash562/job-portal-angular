import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './component/job-list/job-list.component';
import { SharedModule } from "../../shared/shared.module";
import { JobDescriptionComponent } from './component/job-description/job-description.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';

@NgModule({
  declarations: [
    JobListComponent,
    JobDescriptionComponent
  ],
  imports: [
    CommonModule,
    JobListRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    Toast,
    
  ],
  providers : [
    ConfirmationService
  ]
})
export class JobListModule { }
