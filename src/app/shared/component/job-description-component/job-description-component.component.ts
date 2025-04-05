import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../entity/job';

@Component({
  selector: 'app-job-description-component',
  standalone: false,
  templateUrl: './job-description-component.component.html',
  styleUrl: './job-description-component.component.css'
})
export class JobDescriptionComponentComponent{
  @Input('job') job! : Job;
  @Input('userRole') userRole! : string | null;
  @Input('userAppliedJobs') userAppliedJobs : number[] = [];
  @Output() applyForJobEventEmitter : EventEmitter<number> = new EventEmitter();

  applyForJob(jobId : number){
    this.applyForJobEventEmitter.emit(jobId);
  }
}
