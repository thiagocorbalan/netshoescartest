import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product/product.model';
import { ProductService } from './product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  products: Array<ProductModel>;


  constructor(
    private http: HttpClient,
    private service: ProductService
  ) {
    this.service.list().subscribe( products => this.products = products );
  }

  ngOnInit() {
  }




}
