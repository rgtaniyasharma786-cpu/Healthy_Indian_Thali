import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pricing} from '../../../models/pricing/pricing.model';
import { FormsModule } from '@angular/forms';
import { PricingService } from '../../../shared/pricing/pricing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pricing',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-pricing.component.html',
  styleUrl: './add-pricing.component.css'
})
export class AddPricingComponent {
  priceObj: Pricing = 
  {
    duration:'1',
    days:30
  }
  constructor(private priceS: PricingService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router){}

  addSubmit(){
    this.spinner.show()
    this.priceObj.days = 30*(Number(this.priceObj.duration))
    this.priceS.addData(this.priceObj)
    .then(
      () => {

        this.spinner.hide()
        this.toastr.success("New price Add", "Successful")
        this.router.navigateByUrl('/admin/manage-pricing')
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try again")
        console.log("Error in add price", err);

      }
    )
  }



}
