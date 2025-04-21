import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobListService } from '../../service/jobList/job-list.service';
import { RequestResult } from '../../../../shared/types/types';
import { Job } from '../../../../shared/entity/job';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit, OnDestroy{
  jobs! : Job[];
  companies! : string[];
  totalJobsCount! : number;
  totalJobsCountAfterFiltering! : number;
  page : number =  1;
  limit : number = 3;
  firstJobInListNumber! : number;
  lastJobInListNumber! : number;
  filterEvent : any = null;
  getAllJobsSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router,
  ){}
  
  ngOnInit(): void {
    this.getJobs();
    
    this.jobListService.getTotalNumberOfJobs().subscribe({
      next : (requestResult : RequestResult) => {
        this.totalJobsCount = requestResult.value;
        this.totalJobsCountAfterFiltering = requestResult.value;
      }
    });
  }
  
  getJobs(){
    
    this.getAllJobsSubscription = this.jobListService.getAllJobs(this.page, this.limit, this.filterEvent).subscribe({
      next : (result : RequestResult) => {
        
        this.jobs = result.value;
        if(this.filterEvent && (this.filterEvent.company || this.filterEvent.workMode || this.filterEvent.employmentType)){
          this.totalJobsCountAfterFiltering = this.jobs.length;
        }
        else{
          this.companies = this.jobListService.getCompanies(this.jobs); 
          this.totalJobsCountAfterFiltering = this.totalJobsCount;
        }
      }
    });
    
  }

  filterJobsList(event : any) {
    this.filterEvent = event;
    this.getJobs();
  }

  clearFilters(){
    this.filterEvent = null;
    this.getJobs();
  }

  loadDescriptionPage(job : Job){
    this.jobListService.emitSelectedJobFromSubject(job);
    this.router.navigate(['jobs','description'])
  }

  getFirstJobInListNumber(){
    return this.totalJobsCountAfterFiltering === 0 ? 0 : (this.page * this.limit)-this.limit+1;
  }

  getLastJobInListNumber(){
    return (this.page * this.limit) < (this.totalJobsCountAfterFiltering) ? this.page * this.limit : (this.totalJobsCountAfterFiltering);
  }

  loadPreviousPage(){
    this.page--;
    this.getJobs();
  }

  loadNextPage(){
    this.page++;
    this.getJobs();
  }

  ngOnDestroy(): void {
    this.getAllJobsSubscription?.unsubscribe();
  }
}
