import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync,  Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../../user/service/user.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class OtpVerificationGuard implements CanActivate{

    constructor(
        private userService : UserService,
        private router : Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.userEmailForOtpVerification){
            return true;
        }
        return this.router.navigate(['user', 'register']);
    }
}