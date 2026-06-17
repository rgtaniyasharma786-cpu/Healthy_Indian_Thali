import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user/user.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  dbPath = "/users"
  userRef: AngularFirestoreCollection<User>

  constructor(private db: AngularFirestore,
    private authS: AuthService,
    private auth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.userRef = db.collection(this.dbPath)
  }


  createUser(data: any) {
    this.spinner.show()
    this.auth.createUserWithEmailAndPassword(data.email, data.password).then(
      (res) => {
        this.spinner.hide()
        data.uid = res.user?.uid
        this.saveData(data)
      },
      (err) => {
        this.spinner.hide()
        console.log("error in adding user in auth", err);
        this.toastr.error(err)
      })
  }


  saveData(data: any) {
    this.spinner.show()
    data.createdAt = Date.now()
    data.status = true
    data.userType = 2
    delete data.password
    this.userRef.add({ ...data }).then(
      () => {
        this.spinner.hide()
        this.toastr.success("New Account Created")
        this.router.navigateByUrl("/login")
      },
      (err) => {
        this.spinner.hide()
        console.log("error in saving user", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }

  login(data: any) {
    this.spinner.show()
    this.auth.signInWithEmailAndPassword(data.email, data.password).then(
      (res: any) => {
        this.spinner.hide()
        console.log(res.user.uid);
        this.checkUser(res.user.uid)


      },
      (err) => {
        this.spinner.hide()
        console.log("error in adding user in auth", err);
        this.toastr.error(err)
      })
  }


  checkUser(uid: any) {
    this.spinner.show()
    this.userRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    )
      .subscribe(
        (res) => {
          this.spinner.hide()
          let users = res
          let uData = users.filter((x) => {
            return x.uid == uid
          })[0]
          console.log(uData);

          if (uData.userType == 1) {
            this.authS.setData(uData)
            this.toastr.success("Welcome Admin")
            this.router.navigateByUrl("/admin/dashboard")
          }
          else if (uData.userType == 2) {
            console.log(uData);

            if (uData.status == true) {
              this.authS.setData(uData)
              this.toastr.success("Welcome Customer")
              this.router.navigateByUrl('/customer/home')
            }
            else {
              this.toastr.error("Account Inactive, Contact Admin")
            }
          }
          else {
            this.toastr.error("Invalid Credentials")
          }
        },
        (err) => {
          this.spinner.hide()
          console.log("error in checking user", err);
          this.toastr.error("Something Went Wrong")
        }
      )
  }

  updateData(id: any, data: any) {
    return this.userRef.doc(id).update(data)
  }

  logout() {
    this.auth.signOut().then(() => {
      this.authS.removeData()
      this.router.navigateByUrl('/login');
      this.toastr.success("Logged Out");
    })

  }


}
