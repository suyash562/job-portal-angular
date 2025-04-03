import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FilterOptionsComponent } from './component/filter-options/filter-options.component';
import { JobDescriptionComponentComponent } from './component/job-description-component/job-description-component.component';
import { TableComponent } from './component/table/table.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerComponent } from './component/progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayProgressSpinnerComponent } from './component/overlay-progress-spinner/overlay-progress-spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent,
    ProgressSpinnerComponent,
    OverlayProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RadioButtonModule,
    ButtonModule,
    SelectModule,
    SelectButton,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TableModule,
    BadgeModule,
    ConfirmDialogModule,
    DialogModule,
    OverlayBadgeModule,
    CardModule,
    ProgressSpinnerModule
  ],
  exports : [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent,
    ProgressSpinnerComponent,
    OverlayProgressSpinnerComponent
  ],
  providers : [
    MessageService
  ]
})
export class SharedModule { }
