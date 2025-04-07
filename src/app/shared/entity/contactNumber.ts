import { UserProfile } from "./userProfile";


export class ContactNumber{
    id! : number;
    number : string;
    userProfile! : UserProfile;
  
    constructor(
        number : string,
    ){
        this.number = number
    }
}