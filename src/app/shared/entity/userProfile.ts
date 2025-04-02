import { User } from "./user";

export class UserProfile{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    address : string;
    resumeCount : number;
    user : User | undefined;

    constructor(
        firstName : string,
        lastName : string,
        phoneNumber : string,
        address : string,
        resumeCount : number
    ){
        this.firstName = firstName ,
        this.lastName = lastName ,
        this.phoneNumber = phoneNumber ,
        this.address = address ,
        this.resumeCount = resumeCount 
    }
}