import { CartService } from './../cart/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from './product.model';
import { CartModel } from '../cart/cart.model';

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
    if (this.data.installments > 0) {
      this.installmentValue = this.data.price / this.data.installments;
    }

  }

  addCart() {
    this.cartService.add(this.data);
  }
}
