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
    // this.service.update.subscribe( (amount) => {
    //   this.installments = amount / 10;
    // });
  }

  ngOnInit() {
  }

  remove(item: CartModel) {
    if (item.amount > 1) {
      const index = this.service.cartStorage.list.findIndex( dataItem => dataItem.product.id === item.product.id );
      this.service.cartStorage.list[index].amount--;
      this.service.cartStorage.subtotal -= item.product.price;
      this.updateCarStorage(item.product.price);
      return;
    }
    this.updateCarStorage(item.product.price);
    this.service.removeCart(item.product.id);
  }

  private updateCarStorage(price){
    this.service.cartStorage.subtotal -= price;
    this.service.updateCartStorage();
  }
}
