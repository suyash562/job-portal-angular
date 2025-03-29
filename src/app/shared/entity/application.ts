import { Job } from "./job";
import { User } from "./user";


export class Application{
    id! : number;
    applyDate : Date;
    status : 'Pending' | 'Interview' | 'Accepted' | 'Rejected';
    isActive! : boolean;
    user! : User;
    job! : Job;

    constructor(
        applyDate : Date,
        status : 'Pending' | 'Interview' | 'Accepted' | 'Rejected',
    ){
        this.applyDate = applyDate;
        this.status = status;
    }
}