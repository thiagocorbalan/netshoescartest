import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  data: ProductModel;
  installmentValue: number;
  constructor() { }

  ngOnInit() {

    this.installmentValue = this.data.price / this.data.installments;

  }

}
