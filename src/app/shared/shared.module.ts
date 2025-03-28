import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FilterOptionsComponent } from './component/filter-options/filter-options.component';
import { JobDescriptionComponentComponent } from './component/job-description-component/job-description-component.component';
import { TableComponent } from './component/table/table.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [
    HeaderComponent,
    FilterOptionsComponent,
    JobDescriptionComponentComponent,
    TableComponent
  ]
})
export class SharedModule { }
