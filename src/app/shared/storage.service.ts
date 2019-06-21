import { CartStorageModel } from './../cart/cart-storage.model';
import { CartModel } from './../cart/cart.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(atob(data)) : null;
  }

  save(key: string, data: CartStorageModel) {
    const dataParse = btoa(JSON.stringify(data));
    localStorage.setItem(key, dataParse);
  }
}
