import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { UserProfile } from '../../../../shared/entity/userProfile';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userProfile! : UserProfile;
  
  constructor(
    private profileService : ProfileService
  ){}
  
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next : (userProfile : UserProfile) => {
        this.userProfile = userProfile;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  
}
