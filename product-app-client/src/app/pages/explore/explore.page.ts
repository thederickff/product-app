import { OnInit, Component } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss']
})
export class ExplorePage implements OnInit {

  sections: Product[][] = [];

  
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.fetchProducts().subscribe(products => {
      this.sections.push(products.slice(0, products.length / 2));
      this.sections.push(products.slice(products.length / 2, products.length));
    });
  }
}