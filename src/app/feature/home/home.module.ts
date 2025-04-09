import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HomeRoutingModule } from './home.routing.module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    CardModule
  ]
})
export class HomeModule { }
