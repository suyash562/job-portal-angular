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


@NgModule({
  declarations: [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent
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
  ],
  exports : [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent
  ]
})
export class SharedModule { }
