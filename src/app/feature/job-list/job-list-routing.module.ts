import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './component/job-list/job-list.component';

const routes: Routes = [
  {path : '', pathMatch : 'full', redirectTo : 'list'},
  {path : 'list', component : JobListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobListRoutingModule { }
