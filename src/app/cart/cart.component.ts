import { CartModel } from './cart.model';
import { ProductModel } from './../product/product.model';
import { CartService } from './cart.service';
import { Component, OnInit } from '@angular/core';
import { CartEnum } from './cart.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  installments: number;

  constructor(private service: CartService) {
  }

  ngOnInit() {
  }

  remove(cartItem: CartModel) {
    this.service.remove(cartItem.product);
  }
}
