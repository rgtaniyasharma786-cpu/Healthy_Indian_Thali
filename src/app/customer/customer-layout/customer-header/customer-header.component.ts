import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent implements OnInit{
  isLoggedIn: boolean = false

  constructor(private router: Router, private auth:AuthService, private toastr:ToastrService,
  private userS:UserService
  ) { }

  ngOnInit(): void {
    this.checkLogin()
  }

  isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}

  checkLogin() {
    if (this.auth.getLogin() == 'true') {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
  }


  logout() {
    this.userS.logout()
  }
}
