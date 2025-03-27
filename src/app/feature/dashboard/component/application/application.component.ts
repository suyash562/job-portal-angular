import { Component, OnInit } from '@angular/core';
import { EmployeerService } from '../../service/employeer/employeer.service';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';

@Component({
  selector: 'app-application',
  standalone: false,
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit{
  applications! : Application[];
  
  constructor(
    private employeerService : EmployeerService
  ){}

  ngOnInit(): void {
    
    this.employeerService.getApplicationsOfUser().subscribe({
      next : (result : RequestResult) => {
        this.applications = result.value;
      }
    })
  }


}
