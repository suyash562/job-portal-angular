import { User } from "./user";

export class Notification{
    id! : number;
    message : string;
    actionUrl : string;
    isRead : boolean;
    generatedAt : Date;
    user! : User;

    constructor(
        message : string,
        actionUrl : string,
        isRead : boolean,
        generatedAt : Date
    ){
        this.message = message;
        this.actionUrl = actionUrl;
        this.isRead = isRead;
        this.generatedAt = generatedAt;
    }
}