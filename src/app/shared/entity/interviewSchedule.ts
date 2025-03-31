import { Application } from "./application";

export class InterviewSchedule{
    interviewType : string;
    interviewDate : Date;
    interviewTime : Date;
    meetingUrl : string;
    address : string;
    instructions : string;
    userApplication! : Application;

    constructor(
        interviewType : string,
        interviewDate : Date,
        interviewTime : Date,
        meetingUrl : string,
        address : string,
        instructions : string
    ){
        this.interviewType = interviewType;
        this.interviewDate = interviewDate;
        this.interviewTime = interviewTime;
        this.meetingUrl = meetingUrl;
        this.address = address;
        this.instructions = instructions;
    }
}