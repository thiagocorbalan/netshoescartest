import { CartModel } from './cart.model';

export class CartStorageModel {
  list: Array<CartModel>;
  subtotal: number;
  installments: number;
  installmentsValue: number;
}
