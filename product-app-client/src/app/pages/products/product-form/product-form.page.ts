import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss']
})
export class ProductFormPage implements OnInit {

  form: FormGroup;
  editMode = false;
  product: Product;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap => {
    //   if (paramMap.has('id')) {
    //     this.editMode = true;

    //     this.productService.getProduct(paramMap.get('id')).subscribe(product => {
    //       this.product = product;
    //       this.initForm();
    //     });
    //   } else {
        this.initForm();
      // }
    // })
  }

  initForm() {
    this.form = new FormGroup({
      barcode: new FormControl(this.product !== null ? this.product.barcode : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.product !== null ? this.product.description : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(this.product !== null ? this.product.price : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
}