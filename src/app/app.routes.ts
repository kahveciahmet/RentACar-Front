import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', component: CarComponent },
    { path: "cars", component: CarComponent },
    { path: "cars/brand/:brandId", component: CarComponent },
    { path: "cars/color/:colorId", component: CarComponent },
    { path: "cars/:carId", component: CarDetailComponent },
    { path: "payment", component: PaymentComponent },
    { path: "payment-success", component: PaymentSuccessComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
