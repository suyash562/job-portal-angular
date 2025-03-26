
export class EmployeerCompany{
    name : string;
    description : string;
    industry : string;
    companySize : number; 
    website : string;
    location : string;
    averageRating : number;

    constructor(
        name : string,
        description : string,
        industry : string,
        companySize : number,
        website : string,
        location : string,
        averageRating : number,
    ){
        this.name = name;
        this.description = description;
        this.industry = industry;
        this.companySize = companySize; 
        this.website = website;
        this.location = location;
        this.averageRating = averageRating;
    }
}