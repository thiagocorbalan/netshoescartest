import { StorageService } from './../shared/storage.service';
import { Injectable, EventEmitter } from '@angular/core';
import { ProductModel } from '../product/product.model';
import { CartModel } from './cart.model';
import { CartEnum } from './cart.enum';
import { CartStorageModel } from './cart-storage.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private KEYNAME_STORAGE = 'shop_cart';

  cartItems: CartModel;
  cartStorage: CartStorageModel;
  update: EventEmitter<number>;


  constructor(private storageService: StorageService) {
    this.update = new EventEmitter();
    this.cartItems = new CartModel();

    const storageData = this.storageService.get(this.KEYNAME_STORAGE);
    this.cartStorage = storageData ? storageData : {
      list: new Array(),
      subtotal: 0,
      installments: 0,
      installmentsValue: 0
    } as CartStorageModel;
  }

  public addCart(productItem: ProductModel) {
    const index = this.cartStorage.list.findIndex(item => item.product.id === productItem.id);

    let product: CartModel = null;

    if (index < 0) {
      product = new CartModel();
      product.product = productItem;
      product.amount = 1;
      this.cartStorage.list.push(product);
    } else {
      this.cartStorage.list[index].amount++;
    }

    this.cartStorage.subtotal += productItem.price;

    this.updateCartStorage();
  }

  public removeCart(id: number) {
    this.cartStorage.list = this.cartStorage.list.filter(item => item.product.id !== id);
    this.updateCartStorage();
  }

  public updateCartStorage() {
    this.calcInstallments();
    this.storageService.save(this.KEYNAME_STORAGE, this.cartStorage);
    this.update.emit(this.cartStorage.subtotal);
  }

  private calcInstallments() {
    const subtotal = this.cartStorage.subtotal;

    let inst = 0;
    if (subtotal > 0 && subtotal < 50) {
      inst = 3;
    } else if (subtotal >= 50 && subtotal < 120) {
      inst = 4;
    } else if ( subtotal >= 120 && subtotal < 135) {
      inst = 5;
    } else if ( subtotal >= 135 && subtotal < 200) {
      inst = 7;
    } else if ( subtotal >= 200 && subtotal < 230) {
      inst = 9;
    } else if (subtotal >= 230 ) {
      inst = 12;
    }

    this.cartStorage.installments = inst;
    this.cartStorage.installmentsValue = this.cartStorage.subtotal / inst;

  }

}
