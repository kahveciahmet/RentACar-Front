import { Component, inject } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navi',
    standalone: true,
    templateUrl: './navi.component.html',
    styleUrl: './navi.component.css',
    imports: [CommonModule,CartSummaryComponent,RouterModule]
})
export class NaviComponent {

    authService = inject(AuthService)

    logout(){
        this.authService.logout();
    }

}
