import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(
    private httpClient : HttpClient
  ) { }

  getUserRole(){
    return this.httpClient.get("http://localhost:3200/user/role",{withCredentials : true});
  }
}
