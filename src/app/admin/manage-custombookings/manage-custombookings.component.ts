import { Component } from '@angular/core';
import { Custombooking } from '../../models/custombooking/custombooking.model';
import { CustomBookingService } from '../../shared/custom-Booking/custom-booking.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-custombookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-custombookings.component.html',
  styleUrl: './manage-custombookings.component.css'
})
export class ManageCustombookingsComponent {
manageCustomBooking : Custombooking={}
custom:any[]=[]
constructor(private customS: CustomBookingService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllBooking()
  }

  getAllBooking() {
    this.customS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Custombooking })))
    ).subscribe(
      (res) => {
        this.custom = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting bookings", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }

  changeStatusFun(id: any,status:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, perform it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        // this.mealS.deleteData(id).then(
        this.customS.updateData(id, {status: status}).then(
          () => {
            this.spinner.hide()
            this.toastr.success("Status Changed")
            Swal.fire({
              title: "Booking!",
              text: "Status has been Changed.",
              icon: "success"
            });
          },
          (err) => {
            this.spinner.hide()
            this.toastr.error("Something Went Wrong", "Try Again")
            console.log("Error in deleting Meal", err);
          }
        )
      }
    });
  }
}
