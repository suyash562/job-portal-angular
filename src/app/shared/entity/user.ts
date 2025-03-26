
export class User{
    email : string;
    password : string;
    role  : 'user' | 'employeer' | 'admin';

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