import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { LoginComponent } from './components/login/login.component';
import { loginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: "cars", component: CarComponent, canActivate:[loginGuard] },
    { path: "cars/brand/:brandId", component: CarComponent, canActivate:[loginGuard] },
    { path: "cars/color/:colorId", component: CarComponent, canActivate:[loginGuard] },
    { path: "cars/:carId", component: CarDetailComponent, canActivate:[loginGuard] },
    { path: "payment", component: PaymentComponent, canActivate:[loginGuard] },
    { path: "payment-success", component: PaymentSuccessComponent, canActivate:[loginGuard]},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
