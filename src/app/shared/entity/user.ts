import { EmployeerCompany } from "./employeerCompany";

export class User{
    email : string;
    password : string;
    role  : 'user' | 'employeer' | 'admin';
    employeerCompany : EmployeerCompany | undefined;

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