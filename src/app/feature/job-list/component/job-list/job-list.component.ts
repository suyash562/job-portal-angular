import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobListService } from '../../service/jobList/job-list.service';
import { RequestResult } from '../../../../shared/types/types';
import { Job } from '../../../../shared/entity/job';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit, OnDestroy{
  jobs! : Job[];
  filteredJobs! : Job[];
  companies! : string[];
  totalJobsCount! : number;
  totalJobsCountAfterFiltering! : number;
  page : number =  1;
  limit : number = 3;
  firstJobInListNumber! : number;
  lastJobInListNumber! : number;
  getAllJobsSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router,
    private messageService : MessageService,
  ){}
  
  ngOnInit(): void {
    this.getJobs();

    this.jobListService.getTotalNumberOfJobs().subscribe({
      next : (requestResult : RequestResult) => {
        this.totalJobsCount = requestResult.value;
        this.totalJobsCountAfterFiltering = requestResult.value;
      },
      error : (err) => {
        this.totalJobsCount = 0;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(err.error) === 'string' ? err.error : 'Unable to reach server', life: 3000 });
      }
    });
  }

  getJobs(){
    
    this.getAllJobsSubscription = this.jobListService.getAllJobs(this.page, this.limit).subscribe({
      next : (result : RequestResult) => {
        this.jobs = result.value;     
        this.filteredJobs = this.jobs;
        this.companies = this.jobListService.getCompanies(this.jobs); 
      }
    });
    
  }

  filterJobsList(event : any) {
    if(event.workMode || event.employementType || event.company){
      this.filteredJobs = this.jobListService.filterJobsBasedOnOptions(event, this.jobs);
      this.totalJobsCountAfterFiltering = this.filteredJobs.length;
    }
    if(event.sort){
      this.filteredJobs = this.filteredJobs.sort((job1 , job2) => {
        if(event.sort === 'A-Z'){
          return job1.title < job2.title ? -1 : 1;
        }
        return job1.title < job2.title ? 1 : -1;
      });      
    }
  }

  clearFilters(){
    this.filteredJobs = this.jobs;
    this.totalJobsCountAfterFiltering = this.totalJobsCount;
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
