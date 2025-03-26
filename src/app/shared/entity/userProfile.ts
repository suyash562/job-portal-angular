import { User } from "./user";

export class UserProfile{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    address : string;
    resume : string | null;
    user : User | undefined;

    constructor(
        firstName : string,
        lastName : string,
        phoneNumber : string,
        address : string,
        resume : string | null
    ){
        this.firstName = firstName ,
        this.lastName = lastName ,
        this.phoneNumber = phoneNumber ,
        this.address = address ,
        this.resume = resume 
    }
}