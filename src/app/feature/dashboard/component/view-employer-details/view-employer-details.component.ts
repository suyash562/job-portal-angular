import { Component, Input } from '@angular/core';
import { EmployeerCompany } from '../../../../shared/entity/employeerCompany';

@Component({
  selector: 'app-view-employer-details',
  standalone: false,
  templateUrl: './view-employer-details.component.html',
  styleUrl: './view-employer-details.component.css'
})
export class ViewEmployerDetailsComponent {
  @Input('employerCompany') employerCompany! : EmployeerCompany;
}
