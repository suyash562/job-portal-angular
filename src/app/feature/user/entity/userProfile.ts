
export class UserProfile{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    address : string;
    resume : string | null;

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