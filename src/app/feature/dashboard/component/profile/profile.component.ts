import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { UserProfile } from '../../../../shared/entity/userProfile';
import { RequestResult } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  userProfile! : UserProfile;
  getUserProfileSubscription! : Subscription;
  
  constructor(
    private profileService : ProfileService
  ){}
  
  ngOnInit(): void {
    this.getUserProfileSubscription = this.profileService.getUserProfile().subscribe({
      next : (requestResult : RequestResult) => {       
        this.userProfile = requestResult.value;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.getUserProfileSubscription?.unsubscribe();
  }
}
