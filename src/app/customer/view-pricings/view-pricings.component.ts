import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pricing } from '../../models/pricing/pricing.model';
import { PricingService } from '../../shared/pricing/pricing.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-view-pricings',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './view-pricings.component.html',
  styleUrl: './view-pricings.component.css'
})
export class ViewPricingsComponent {
  isLoggedIn: boolean = false
  pricing: any[] = []

  managepricing: Pricing = {}

  constructor(private priceS: PricingService, private toastr: ToastrService, private spinner: NgxSpinnerService, private authS : AuthService) { }

  ngOnInit(): void {
    this.getAllPricing()
    this.checkLogin()
  }

  checkLogin() {
    if (this.authS.getLogin() == 'true') {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
  }

  getAllPricing() {
    this.priceS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Pricing })))
    ).subscribe(
      (res) => {
        this.pricing = res

        // console.log(res);
      },
      (err) => {
        console.log("error in getting pricing", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }
  
}
