import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FilterOptionsComponent } from './component/filter-options/filter-options.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FilterOptionsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [
    HeaderComponent,
    FilterOptionsComponent
  ]
})
export class SharedModule { }
