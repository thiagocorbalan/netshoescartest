import { StorageService } from './../shared/storage.service';
import { Injectable, EventEmitter, ɵConsole } from '@angular/core';
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
  storage: CartStorageModel;
  update: EventEmitter<number>;


  constructor(private storageService: StorageService) {
    this.update = new EventEmitter();
    this.cartItems = new CartModel();

    const storageData = this.storageService.get(this.KEYNAME_STORAGE);
    this.storage = storageData ? storageData : {
      list: new Array(),
      subtotal: 0,
      installments: 0,
      installmentsValue: 0
    } as CartStorageModel;
  }

  /**
   * Add Product to Cart
   * @param product
   */
  public add(product: ProductModel) {
    const indexProductCart = this.hasProductCart(product);
    let cartItem: CartModel;

    if (indexProductCart >= 0) {
      cartItem = this.storage.list[indexProductCart];
      cartItem.amount++;
    } else {
      cartItem = new CartModel();
      cartItem.product = product;
      cartItem.amount = 1;
      this.storage.list.push(cartItem);
    }

    const price = Math.round(product.price * 100) / 100;
    this.storage.subtotal = this.storage.subtotal + price;
    this.updateCartStorage();
  }

  /**
   * Remove product to Cart
   * @param product
   */
  public remove(product: ProductModel) {

    const indexProductCart = this.hasProductCart(product);
    const cartItem = this.storage.list[indexProductCart];

    if (cartItem.amount === 1) {
      this.storage.list = this.storage.list.filter(item => item.product.id !== cartItem.product.id);
    }

    if (cartItem.amount > 1) {
      cartItem.amount--;
    }
    const price = Math.round(product.price * 100) / 100;
    this.storage.subtotal = this.storage.subtotal - price;
    this.updateCartStorage();
  }

  private hasProductCart(product: ProductModel): number {

    const index = this.storage.list.findIndex(item => item.product.id === product.id);

    return index;
  }

  private updateCartStorage() {
    this.calcInstallments();

    this.storage.subtotal = this.storage.subtotal >= 1 ? this.storage.subtotal : 0;

    this.storageService.save(this.KEYNAME_STORAGE, this.storage);
    this.update.emit(this.storage.subtotal);
  }

  private calcInstallments() {
    const subtotal = this.storage.subtotal;

    let inst = 0;
    if (subtotal > 50 && subtotal < 100) {
      inst = 3;
    }
    if (subtotal >= 100 && subtotal < 120) {
      inst = 4;
    }
    if (subtotal >= 120 && subtotal < 135) {
      inst = 5;
    }
    if (subtotal >= 135 && subtotal < 200) {
      inst = 7;
    }
    if (subtotal >= 200 && subtotal < 349) {
      inst = 9;
    }
    if (subtotal >= 349) {
      inst = 12;
    }

    this.storage.installments = inst;
    if (inst > 0) {
      this.storage.installmentsValue = this.storage.subtotal / inst;
    }else{
      this.storage.installmentsValue = 0;
    }

  }

}
