import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/validators/formValidators';
import { InterviewService } from '../../service/interview/interview.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterviewSchedule } from '../../../../shared/entity/interviewSchedule';
import { RequestResult } from '../../../../shared/types/types';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-schedule-interview',
  standalone: false,
  templateUrl: './schedule-interview.component.html',
  styleUrl: './schedule-interview.component.css'
})
export class ScheduleInterviewComponent implements OnInit{
  applicationId! : number;
  minDate: Date = new Date();
  interviewType : any = {type : 'Online'};
  scheduleInterviewForm! : FormGroup;
  interviewScheduleOptions = [
    {type : 'Offline'},
    {type : 'Online'},
  ];
  activatedRouteSubcription! : Subscription;

  constructor(
    private customFormValidators : CustomFormValidators,
    private interviewService : InterviewService,
    private activatedRoute : ActivatedRoute,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.scheduleInterviewForm = new FormGroup({
      interviewAddress : new FormControl(''),
      meetingLink : new FormControl('', [this.customFormValidators.validateUrl]),
      interviewDate : new FormControl('', [this.customFormValidators.requiredValidator]),
      interviewTime : new FormControl('', [this.customFormValidators.defaultValidator]),
      instructions : new FormControl('', [this.customFormValidators.validateDescription]),
    });

    this.activatedRouteSubcription = this.activatedRoute.params.subscribe({
          next : (value) => {
            if(value['applicationId'] && parseInt(value['applicationId'])){
              this.applicationId = value['applicationId'];
            }
            else{
              console.log(('Job Id not found'));
            }
          }
        })
  }

  getErrorMessage(field : string){
    return this.scheduleInterviewForm.get(field)?.dirty && this.scheduleInterviewForm.get(field)?.errors ? this.scheduleInterviewForm.get(field)?.getError('error') : ''
  }

  interviewTypeChange(){
    if(this.interviewType.type === 'Online'){
      this.scheduleInterviewForm.controls['interviewAddress'].clearValidators();
      this.scheduleInterviewForm.controls['interviewAddress'].setValue('');
      this.scheduleInterviewForm.controls['meetingLink'].addValidators([this.customFormValidators.validateUrl]);
    }
    else{
      this.scheduleInterviewForm.controls['meetingLink'].clearValidators();
      this.scheduleInterviewForm.controls['meetingLink'].setValue('');
      this.scheduleInterviewForm.controls['interviewAddress'].addValidators([this.customFormValidators.defaultValidator]);
    }
  }

  onSubmit(){
    if(this.scheduleInterviewForm.invalid){
      this.scheduleInterviewForm.controls['interviewAddress'].markAsDirty();
      this.scheduleInterviewForm.controls['meetingLink'].markAsDirty();
      this.scheduleInterviewForm.controls['interviewDate'].markAsDirty();
      this.scheduleInterviewForm.controls['interviewTime'].markAsDirty();
    }
    else{
      const interviewSchedule : InterviewSchedule = new InterviewSchedule(
        this.interviewType.type,
        this.scheduleInterviewForm.controls['interviewDate'].value,
        this.scheduleInterviewForm.controls['interviewTime'].value,
        this.scheduleInterviewForm.controls['meetingLink'].value,
        this.scheduleInterviewForm.controls['interviewAddress'].value,
        this.scheduleInterviewForm.controls['instructions'].value
      )
      this.interviewService.addInterviewSchedule(this.applicationId, interviewSchedule).subscribe({
        next : (result : RequestResult) => {
          if(result.value){
            this.scheduleInterviewForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interview has been scheduled successfully' });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to schedule the interview' });
          }
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
  }
}
