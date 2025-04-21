import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync,  Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../../user/service/user.service";
import { Injectable } from "@angular/core";
import { OtpValidationComponent } from "../component/otp-validation/otp-validation.component";

@Injectable({
    providedIn : 'root'
})
export class OtpVerificationGuard implements CanActivate, CanDeactivate<OtpValidationComponent>{

    constructor(
        private userService : UserService,
        private router : Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.emailForOtpVerification){
            return true;
        }
        return this.router.navigate(['user', 'register']);
    }

    canDeactivate(component: OtpValidationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.exitFromOtpComponent){
            this.userService.exitFromOtpComponent = false;
            return true;
        }
        this.userService.updateNextUrlForExitFromOtpComponent(nextState.url);
        return false;
    }
}