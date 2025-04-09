import { EmployeerCompany } from "./employeerCompany";
import { UserProfile } from "./userProfile";

export class User{
    email : string;
    password : string;
    newNotifications!  : number;
    isVerifiedByAdmin!  : boolean;
    role  : 'user' | 'employeer' | 'admin';
    employeerCompany : EmployeerCompany | undefined;
    profile : UserProfile | undefined;

    constructor(
        email : string,
        password : string,
        role : 'user' | 'employeer' | 'admin'
    ){
        this.email = email;
        this.password = password;
        this.role = role;
    }
}