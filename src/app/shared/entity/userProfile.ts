import { ContactNumber } from "./contactNumber";
import { User } from "./user";

export class UserProfile{
    id! : number;
    firstName : string;
    lastName : string;
    address : string;
    contactNumbers : ContactNumber[];
    resumeCount : number;
    primaryResume : number;
    user : User | undefined;

    constructor(
        firstName : string,
        lastName : string,
        contactNumbers : ContactNumber[],
        address : string,
        resumeCount : number,
        primaryResume : number
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.resumeCount = resumeCount;
        this.primaryResume = primaryResume;
        this.contactNumbers = contactNumbers;
    }
}