import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Meal } from '../../../models/meal/meal.model';
import { MealService } from '../../../shared/meal/meal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-meals',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-meals.component.html',
  styleUrl: './add-meals.component.css'
})
export class AddMealsComponent {
  mealObj: Meal = {}
  constructor(private mealS: MealService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) { }

  addSubmit() {
    this.spinner.show()
    this.mealS.addData(this.mealObj)
      .then(
        () => {

          this.spinner.hide()
          this.toastr.success("New Meal Add", "Successful")
          this.router.navigateByUrl('/admin/manage-meals')
        },
        (err) => {
          this.spinner.hide()
          this.spinner.hide()
          this.toastr.error("Something went wrong", "Try again")
          console.log("Error in add meal", err);

        }
      )
  }
}
