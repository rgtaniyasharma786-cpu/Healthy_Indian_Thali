import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pricing } from '../../models/pricing/pricing.model';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  dbPath: string = "/pricing"

  priceRef: AngularFirestoreCollection<Pricing>

  constructor(private db: AngularFirestore) {
    this.priceRef = db.collection(this.dbPath)
  }


  addData(data: any) {

    data.createdAt = Date.now()
    data.status = true
    return this.priceRef.add({ ...data })
  }

  getAll() {
    // return this.priceRef;
    return this.db.collection(this.dbPath, (ref)=>(ref.where("status","==",true)))
  }

  getSingle(id:any) {
return this.priceRef.doc(id).valueChanges()
  }

  updateData(id:any,data:any) {
return this.priceRef.doc(id).update(data);
  }

  deleteData(id: any) {
    return this.priceRef.doc(id).delete()

  }
}
