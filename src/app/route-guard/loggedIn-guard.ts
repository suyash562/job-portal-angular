import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../feature/user/service/user.service";
import { AppService } from "../app.service";


@Injectable({
    providedIn : 'root'
})
export class IsLoggedIn implements CanActivate{

    constructor(
        private userService : UserService,
        private appService : AppService,
        private router : Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.userService.isLoggedIn()){
            return true;
        }
        if(route.url[0].path === 'dashboard'){
            this.appService.emitIsRedirectedFromDashboardSubject(true);
        }
        
        return this.router.navigate(['/']);
    }
}