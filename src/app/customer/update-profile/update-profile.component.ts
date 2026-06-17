import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../models/user/user.model';
import { UserService } from '../../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  userObj: User = {}
  userId: any
  
  constructor(private userS: UserService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router, private authS: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authS.getId()
    this.userObj = this.authS.getData()
  }



  updateSubmit() {
    this.spinner.show()
    this.userS.updateData(this.userId, this.userObj).then(() => { 
      this.spinner.hide()
        this.toastr.success("User Updated")
        
        this.authS.setData(this.userObj)
    },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went Wrong")
        console.log("Error in updating user", err)
      })
  }

}
