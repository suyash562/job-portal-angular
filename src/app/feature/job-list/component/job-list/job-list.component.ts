import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobListService } from '../../service/jobList/job-list.service';
import { RequestResult } from '../../../../shared/types/types';
import { Job } from '../../../../shared/entity/job';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit, OnDestroy{
  jobs! : Job[];
  totalJobsCount! : number;
  totalJobsCountAfterFiltering! : number;
  companies! : string[];
  filteredJobs! : Job[];
  page : number =  1;
  limit : number = 2;
  firstJobInListNumber! : number;
  lastJobInListNumber! : number;
  getAllJobsSubscription! : Subscription;
  isRedirectedFromDashboardSubscription! : Subscription;

  constructor(
    private jobListService : JobListService,
    private router : Router,
    private confirmationService : ConfirmationService
  ){}
  
  ngOnInit(): void {
    this.getJobs();

    this.isRedirectedFromDashboardSubscription = this.jobListService.isRedirectedFromDashboardObservable.subscribe({
      next : (isRedirected) => {
        if(isRedirected){
          this.confirmationService.confirm({
            header: 'Log In',
            message: 'Please Log In to proceed',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
            },
            acceptButtonProps: {
                label: 'Okay',
                severity : 'contrast'
            },
              accept: () => {
                this.jobListService.emitIsRedirectedFromDashboardSubject(false);
                this.router.navigate(['/user/login']);
            },
            reject: () => {
              this.jobListService.emitIsRedirectedFromDashboardSubject(false);
            },
          });
        }
      }
    })

    this.jobListService.getTotalNumberOfJobs().subscribe({
      next : (requestResult : RequestResult) => {
        this.totalJobsCount = requestResult.value;
        this.totalJobsCountAfterFiltering = requestResult.value;
      },
      error : (err) => {
        console.log(err);
        this.totalJobsCount = 0;
      }
    })

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
    // const maximumJobs = this.totalJobsCount < this.filteredJobs?.length ? this.totalJobsCount : this.filteredJobs?.length;
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
    this.isRedirectedFromDashboardSubscription?.unsubscribe();
  }
}
