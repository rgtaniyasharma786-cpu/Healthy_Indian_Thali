import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './customer/home/home.component';
import { AboutComponent } from './customer/about/about.component';
import { RegisterComponent } from './customer/register/register.component';
import { UpdateProfileComponent } from './customer/update-profile/update-profile.component';
import { ViewMealsComponent } from './customer/view-meals/view-meals.component';
import { ViewMyBookingsComponent } from './customer/view-my-bookings/view-my-bookings.component';
import { ViewPricingsComponent } from './customer/view-pricings/view-pricings.component';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { CustomerHeaderComponent } from './customer/customer-layout/customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer/customer-layout/customer-footer/customer-footer.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin/admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/admin-layout/admin-footer/admin-footer.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageBookingsComponent } from './admin/manage-bookings/manage-bookings.component';
import { ManageCustombookingsComponent } from './admin/manage-custombookings/manage-custombookings.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageMealsComponent } from './admin/manage-meals/manage-meals.component';
import { ManagePricingComponent } from './admin/manage-pricing/manage-pricing.component';
import { AddMealsComponent } from './admin/manage-meals/add-meals/add-meals.component';
import { UpdateMealsComponent } from './admin/manage-meals/update-meals/update-meals.component';
import { AddPricingComponent } from './admin/manage-pricing/add-pricing/add-pricing.component';
import { UpdatePricingComponent } from './admin/manage-pricing/update-pricing/update-pricing.component';
import { CustomBookingsComponent } from './customer/custom-bookings/custom-bookings.component';
import { adminGuard } from './admin/guard/admin.guard';
import { customerGuard } from './customer/guard/customer.guard';
import { AddBookingsComponent } from './customer/add-bookings/add-bookings.component';

export const routes: Routes = [
    {path:'',redirectTo:'/customer/home', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'customer', component:CustomerLayoutComponent, children:[
        {path:'home', component:HomeComponent},
        {path:'about', component:AboutComponent},
        {path:'add-booking/:id', component:AddBookingsComponent,canActivate:[customerGuard]},
        {path:'register', component:RegisterComponent},
        {path:'update-profile',component:UpdateProfileComponent, canActivate:[customerGuard]},
        {path:'view-meals', component:ViewMealsComponent},
        {path:'view-my-bookings', component:ViewMyBookingsComponent},
        {path:'view-pricings', component:ViewPricingsComponent},
        {path:'custom-booking', component:CustomBookingsComponent,canActivate:[customerGuard]},
    ]},
    {path:'admin', component:AdminLayoutComponent, canActivate:[adminGuard],children:[
        {path:'dashboard', component:DashboardComponent},
        {path:'manage-bookings', component:ManageBookingsComponent},
        {path:'manage-custombookings', component:ManageCustombookingsComponent},
        {path:'manage-customer', component:ManageCustomersComponent},
        {path:'manage-meals', component:ManageMealsComponent},
        {path:'add-meals', component:AddMealsComponent},
        {path:'update-meals/:id', component:UpdateMealsComponent},
        {path:'manage-pricing', component:ManagePricingComponent},
        {path:'add-pricing', component:AddPricingComponent},
        {path:'update-pricing/:id', component:UpdatePricingComponent},

    ]},
    {path:'**', component:PageNotFoundComponent}
];
