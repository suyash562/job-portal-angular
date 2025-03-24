import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardParentComponent } from './component/dashboard-parent/dashboard-parent.component';

const routes: Routes = [
  {path : '', pathMatch : 'full', component : DashboardParentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
