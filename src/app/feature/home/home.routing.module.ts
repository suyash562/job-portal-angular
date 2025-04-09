import { Route, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NgModule } from "@angular/core";


const routes : Route[] = [
    {path : '', redirectTo : 'snap-hire', pathMatch : 'full'},
    {path : 'snap-hire', component : LandingPageComponent},
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class HomeRoutingModule{

}