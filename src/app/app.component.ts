import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, 
    CarComponent, 
    BrandComponent,
    CartSummaryComponent, 
    RentalComponent,
    ReactiveFormsModule, 
    NaviComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    ColorComponent, 
    CustomerComponent, 
    RentalComponent,
    HttpClientModule,
    CarDetailComponent,
    FormsModule,
    LoginComponent,
    RegisterComponent,
    FilterPipePipe, 
    ToastrModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  filterText:string="";
  title = 'Rent-A-Car';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
