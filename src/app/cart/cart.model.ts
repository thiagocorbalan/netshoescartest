import { ProductModel } from './../product/product.model';

export class CartModel{
  product: ProductModel;
  amount: number;
  subTotal: number;
}
