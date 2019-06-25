import { Component } from '@angular/core';
import { CartEnum } from './cart.enum';
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
  floatCartOpened: boolean;

  constructor(private service: CartService) {
    this.floatCartOpened = false;

    this.service.update.subscribe( (type: CartEnum) => {
      this.floatCartOpened = true;
    });
  }

  remove(cartItem: CartModel) {
    this.removeItem = null;
    this.service.remove(cartItem.product);
  }

  toggleOpened() {
    this.floatCartOpened = !this.floatCartOpened;
  }
}
