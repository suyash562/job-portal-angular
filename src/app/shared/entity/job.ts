
export class Job{
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
    deadlineForApplying : Date;
    workLocation : string;
    postingDate : Date;

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
        deadlineForApplying : Date,
        workLocation : string,
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