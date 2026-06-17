import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user/user.service';


@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private router: Router, private auth:AuthService, private toastr:ToastrService, 
  private userS:UserService
  ){}
  
  logout() {
    this.userS.logout()
    }

}
