import { User } from "./user";

export class Job{
    id! : number;
    title : string;
    description : string;
    requiredSkills : string;
    vacancies : number;
    preferredSkills : string;
    employementType : "Full Time" | "Part Time";
    workMode : 'Offline' | 'Online' | 'Hybrid';
    salaryRange : string; 
    facilities : string;
    experienceLevel : string;
    workLocation : string;
    deadlineForApplying : Date;
    postingDate : Date;
    employeer : User | undefined;

    constructor(
        title : string,
        description : string,
        requiredSkills : string,
        vacancies : number,
        preferredSkills : string,
        employementType : "Full Time" | "Part Time",
        workMode : 'Offline' | 'Online' | 'Hybrid',
        salaryRange : string,
        facilities : string,
        experienceLevel : string,
        workLocation : string,
        deadlineForApplying : Date,
        postingDate : Date,
    ){
        this.title = title;
        this.description = description;
        this.requiredSkills = requiredSkills;
        this.vacancies = vacancies;
        this.preferredSkills = preferredSkills;
        this.employementType = employementType;
        this.workMode = workMode;
        this.salaryRange = salaryRange;
        this.facilities = facilities;
        this.experienceLevel = experienceLevel;
        this.deadlineForApplying = deadlineForApplying;
        this.workLocation = workLocation;
        this.postingDate = postingDate;
    }
}