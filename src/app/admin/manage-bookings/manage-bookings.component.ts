import { Component } from '@angular/core';
import { Booking } from '../../models/booking/booking.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BookingService } from '../../shared/booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
  manageBooking: Booking = {}
  bookings: any[] = []

  constructor(private bookingS: BookingService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllBooking()
  }

  getAllBooking() {
    this.bookingS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Booking })))
    ).subscribe(
      (res) => {
        this.bookings = res
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
        this.bookingS.updateData(id, {status: status}).then(
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
