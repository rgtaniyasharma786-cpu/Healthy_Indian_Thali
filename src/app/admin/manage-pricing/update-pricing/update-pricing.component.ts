import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pricing } from '../../../models/pricing/pricing.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from '../../../shared/pricing/pricing.service';

@Component({
  selector: 'app-update-pricing',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './update-pricing.component.html',
  styleUrl: './update-pricing.component.css'
})
export class UpdatePricingComponent implements OnInit {

  priceObj: Pricing = {}
  priceId: any;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private priceS: PricingService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.priceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPrice(this.priceId)
  }

  getPrice(id: any) {
    this.spinner.show()
    this.priceS.getSingle(id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.priceObj = res

      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went wrong")
        console.log("Error in getting single pricing", err);
      }
    )
  }

  updateSubmit() {
    this.spinner.show()
    this.priceObj.days = Number(this.priceObj.duration)*30
    this.priceS.updateData(this.priceId, this.priceObj).then(
      () => {
        this.spinner.hide()
        this.toastr.success("Pricing Updated", "Success")
        this.router.navigateByUrl('/admin/manage-pricing')
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went Wrong")
        console.log("Error in update pricing", err);
      }
    )
  }


}
