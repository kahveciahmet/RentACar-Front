import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { Car } from '../../models/car';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];

  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }

  removeFromCart(car:Car){
    if(car){
      this.toastrService.error(car.description,"Sepetten silindi.");
      this.cartService.removeFromCart(car);
    }
    
  }

}
