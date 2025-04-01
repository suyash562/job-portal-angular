import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../../user/service/user.service";
import { Injectable } from "@angular/core";
import { JobListService } from "../../job-list/service/jobList/job-list.service";

@Injectable({
    providedIn : 'root'
})
export class DashboardGuard implements CanActivate{

    constructor(
        private userService : UserService,
        private router : Router,
        private jobListService : JobListService,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.isLoggedIn()){
            return true;
        }
        this.jobListService.emitIsRedirectedFromDashboardSubject(true);
        return this.router.navigate(['/']);
    }
}