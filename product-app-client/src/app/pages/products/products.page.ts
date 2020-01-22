import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit, OnDestroy {

  dtTrigger = new Subject();
  products: Product[];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe(products => {
      this.products = products;
      this.dtTrigger.next();
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(product => product.id !== res.id);
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
