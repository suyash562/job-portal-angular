import { User } from "./user";

export class Notification{
    id! : number;
    message : string;
    actionUrl : string;
    isRead : boolean;
    user! : User;

    constructor(
        message : string,
        actionUrl : string,
        isRead : boolean
    ){
        this.message = message;
        this.actionUrl = actionUrl;
        this.isRead = isRead;
    }
}