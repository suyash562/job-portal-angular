import { Component, OnInit } from '@angular/core';
import { JobListService } from '../../service/jobList/job-list.service';
import { RequestResult } from '../../../../shared/types/types';
import { Job } from '../../../../shared/entity/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit{
  jobs! : Job[];
  page : number =  1;
  limit : number = 5;

  constructor(
    private jobListService : JobListService,
    private router : Router
  ){}
  
  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(){
    this.jobListService.getAllJobs(this.page, this.limit).subscribe({
      next : (result : RequestResult) => {
        this.jobs = result.value;     
      }
    })
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
}
