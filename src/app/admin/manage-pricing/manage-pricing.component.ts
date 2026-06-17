import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pricing } from '../../models/pricing/pricing.model';
import { PricingService } from '../../shared/pricing/pricing.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-pricing',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './manage-pricing.component.html',
  styleUrl: './manage-pricing.component.css'
})
export class ManagePricingComponent {

  pricing: any[] = []

  managepricing: Pricing = {}

  constructor(private priceS: PricingService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllPricing()
  }

  getAllPricing() {
    this.priceS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Pricing })))
    ).subscribe(
      (res) => {
        this.pricing = res

        console.log(res);
      },
      (err) => {
        console.log("error in getting pricing", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }


  deleteFun(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        // this.priceS.deleteData(id).then(
        this.priceS.updateData(id, { status: false }).
          then(
            () => {
              this.spinner.hide()
              this.toastr.success("Document Deleted")
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            },
            (err) => {
              this.spinner.hide()
              this.toastr.error("Something Went Wrong", "Try Again")
              console.log("Error in deleting pricing", err);
            }
          )
      }
    });
  }
}
