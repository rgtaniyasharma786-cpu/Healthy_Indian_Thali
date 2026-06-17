import { Component, OnInit } from '@angular/core';
import { MealService } from '../../shared/meal/meal.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { Meal } from '../../models/meal/meal.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-meals',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './view-meals.component.html',
  styleUrl: './view-meals.component.css'
})
export class ViewMealsComponent implements OnInit{
   
  meal: any[] = []
constructor(private mealS:MealService, private toastr:ToastrService, private spinner:NgxSpinnerService){}

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
}
