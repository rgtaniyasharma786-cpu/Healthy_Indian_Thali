import { Component } from '@angular/core';
import { Booking } from '../../models/booking/booking.model';
import { BookingService } from '../../shared/booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomBookingService } from '../../shared/custom-Booking/custom-booking.service';
import { Custombooking } from '../../models/custombooking/custombooking.model';

@Component({
  selector: 'app-view-my-bookings',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './view-my-bookings.component.html',
  styleUrl: './view-my-bookings.component.css'
})
export class ViewMyBookingsComponent {
  manageBooking: Booking = {}
  bookings: any[] = []
  manageCustomBooking: Custombooking = {}
  custombookings: any[] = []

  constructor(private bookingS: BookingService, private toastr: ToastrService, private spinner: NgxSpinnerService, private customS: CustomBookingService) { }

  ngOnInit(): void {
    this.getAllBooking()
    this.getCustomBooking()
  }

  getAllBooking() {
    this.bookingS.getMyAll().snapshotChanges().pipe(
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
  
  getCustomBooking() {
    this.customS.getMyAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Custombooking })))
    ).subscribe(
      (res) => {
        this.custombookings = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting custom bookings", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }
}
