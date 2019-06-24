import { Component, OnInit } from '@angular/core';
import { CartModel } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  preserveWhitespaces: true
})
export class CartComponent {
  installments: number;
  removeItem: number;

  constructor(private service: CartService) {
  }

  remove(cartItem: CartModel) {
    this.removeItem = null;
    this.service.remove(cartItem.product);
  }
}
