import { CartService } from './../cart/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() data: ProductModel;
  installmentValue: number;
  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  addCart() {
    this.cartService.addCart(this.data);
  }
}
