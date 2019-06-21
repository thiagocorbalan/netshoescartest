import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './../shared/crud.service';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<ProductModel>{

  constructor(protected http: HttpClient) {
    super(http, '/products');
  }

}
