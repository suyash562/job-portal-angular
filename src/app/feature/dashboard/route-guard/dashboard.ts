import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../../user/service/user.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class DashboardGuard implements CanActivate{

    constructor(private userService : UserService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.isLoggedIn()){
            return true;
        }
        return this.router.navigate(['user','login']);
    }
}