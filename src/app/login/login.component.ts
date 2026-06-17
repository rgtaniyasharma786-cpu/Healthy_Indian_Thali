import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = 'example@gmail.com';
  password: string = '';

  constructor(private router: Router, private auth: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService, private userS: UserService) { }

  loginSubmit() {
    this.userS.login({email:this.email, password:this.password})
  }
}
