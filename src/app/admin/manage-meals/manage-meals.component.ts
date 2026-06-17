import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meal } from '../../models/meal/meal.model';
import { MealService } from '../../shared/meal/meal.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-meals',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './manage-meals.component.html',
  styleUrl: './manage-meals.component.css'
})
export class ManageMealsComponent {
  manageMeal: Meal = {}
  meal: any[] = []

  constructor(private mealS: MealService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllMeal()
  }

  getAllMeal() {
    this.mealS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Meal })))
    ).subscribe(
      (res) => {
        this.meal = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting meal", err);
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
        // this.mealS.deleteData(id).then(
        this.mealS.updateData(id, {status: false}).then(
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
            console.log("Error in deleting Meal", err);
          }
        )
      }
    });
  }
}
