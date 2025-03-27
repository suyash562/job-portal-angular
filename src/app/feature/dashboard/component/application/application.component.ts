import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeerService } from '../../service/employeer/employeer.service';
import { Application } from '../../../../shared/entity/application';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-application',
  standalone: false,
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit, OnDestroy{
  applications! : Application[];
  getApplicationsOfUserSubscription! : Subscription;
  
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

  ngOnDestroy(): void {
    this.getApplicationsOfUserSubscription?.unsubscribe();
  }

}
