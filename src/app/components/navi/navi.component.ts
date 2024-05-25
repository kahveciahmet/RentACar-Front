import { Component } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navi',
    standalone: true,
    templateUrl: './navi.component.html',
    styleUrl: './navi.component.css',
    imports: [CommonModule,CartSummaryComponent]
})
export class NaviComponent {

}
