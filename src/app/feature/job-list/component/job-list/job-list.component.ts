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
  filteredJobs! : Job[];
  page : number =  1;
  limit : number = 3;
  getAllJobsSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router
  ){}
  
  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(){
    this.getAllJobsSubscription = this.jobListService.getAllJobs(this.page, this.limit).subscribe({
      next : (result : RequestResult) => {
        this.jobs = result.value;     
        this.filteredJobs = this.jobs;
        
        this.companies = this.jobListService.getCompanies(this.jobs);        
      },
      error : (err) => {
        console.log(err);
        
      }
    })
  }

  filterJobsList(event : any) {
    if(event.workMode || event.employementType || event.company){
      this.filteredJobs = this.jobListService.filterJobsBasedOnOptions(event, this.jobs);
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
  }

  loadDescriptionPage(job : Job){
    this.jobListService.emitSelectedJobFromSubject(job);
    this.router.navigate(['jobs','description'])
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
