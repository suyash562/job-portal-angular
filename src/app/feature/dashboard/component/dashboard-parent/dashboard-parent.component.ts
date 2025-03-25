import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-parent',
  standalone: false,
  templateUrl: './dashboard-parent.component.html',
  styleUrl: './dashboard-parent.component.css'
})
export class DashboardParentComponent implements OnInit{

  constructor(private activatedRoute : ActivatedRoute, private router : Router){}
  
  ngOnInit(): void {
    // if(!this.activatedRoute.snapshot.data['isLoggedIn']){

    // }
  }
  
}
