import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageJobsComponent } from './component/manage-jobs/manage-jobs.component';
import { ApplicationComponent } from './component/application/application.component';
import { ViewJobComponent } from './component/view-job/view-job.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentUserApplicationComponent } from './component/current-user-application/current-user-application.component';
import { ViewSelectedApplicationComponent } from './component/view-selected-application/view-selected-application.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ScheduleInterviewComponent } from './component/schedule-interview/schedule-interview.component';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    DashboardParentComponent,
    SidebarComponent,
    ProfileComponent,
    AddJobComponent,
    ManageJobsComponent,
    ApplicationComponent,
    ViewJobComponent,
    CurrentUserApplicationComponent,
    ViewSelectedApplicationComponent,
    ScheduleInterviewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    SelectModule,
    InputTextModule,
    FloatLabel,
    DatePickerModule,
    TextareaModule,
    IftaLabelModule,
    AvatarModule,
    FileUploadModule
  ],
  providers : [
    ConfirmationService,
    MessageService
  ]
})
export class DashboardModule { }
