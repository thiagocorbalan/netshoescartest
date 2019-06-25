
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from './../cart/cart.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
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
