import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meal } from '../../../models/meal/meal.model';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MealService } from '../../../shared/meal/meal.service';

@Component({
  selector: 'app-update-meals',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './update-meals.component.html',
  styleUrl: './update-meals.component.css'
})
export class UpdateMealsComponent implements OnInit {
  mealId: any;
  mealObj: Meal = {}

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private mealS: MealService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMeal(this.mealId)
  }

  getMeal(id:any) {
    this.spinner.show()
    this.mealS.getSingle(id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.mealObj = res
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Somethinng Went Wrong")
        console.log("Error in getting single meal", err);
      }
    )
  }
  updateSubmit() {
this.spinner.show()
this.mealS.updateData(this.mealId, this.mealObj).then(
  ()=>{
    this.spinner.hide()
    this.toastr.success("Meal Updated", "Success")
    this.router.navigateByUrl('/admin/manage-meals')
  },
  (err)=>{
    this.spinner.hide()
    this.toastr.error("Somethinng Went Wrong")
    console.log("Error in update meal",err);
  }
)
  }

}
