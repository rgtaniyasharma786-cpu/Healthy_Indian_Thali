import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Meal } from '../../models/meal/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  dbPath: string = "/Meals"

  mealRef: AngularFirestoreCollection<Meal>

  constructor(private db: AngularFirestore) {
    this.mealRef = db.collection(this.dbPath)
  }


  addData(data: any) {
    data.createdAt = Date.now()
    data.status = true
    return this.mealRef.add({ ...data })
  }

  getAll() {
    // return this.mealRef;
    return this.db.collection(this.dbPath, (ref)=>(ref.where("status","==",true)))
  }

  getSingle(id:any) {
return this.mealRef.doc(id).valueChanges()
  }

  updateData(id:any,data:any) {
return this.mealRef.doc(id).update(data);
  }

  deleteData(id: any) {
    return this.mealRef.doc(id).delete()
  }
}
