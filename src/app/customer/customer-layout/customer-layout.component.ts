import { Component } from '@angular/core';
import { CustomerHeaderComponent } from "./customer-header/customer-header.component";
import { CustomerFooterComponent } from "./customer-footer/customer-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [CustomerHeaderComponent, CustomerFooterComponent, RouterOutlet],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
