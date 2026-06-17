import { Component } from '@angular/core';
import { User} from '../../models/user/user.model';


@Component({
  selector: 'app-manage-customers',
  standalone: true,
  imports: [],
  templateUrl: './manage-customers.component.html',
  styleUrl: './manage-customers.component.css'
})
export class ManageCustomersComponent {
  manageuser : User={}

  customer:any[]=[
    {
      name:"Taniya",email:"taniya@gmail.com",contact:"9878727647",address:"Model Town",joinedAt:"2:00am"
    }
  ]

}
