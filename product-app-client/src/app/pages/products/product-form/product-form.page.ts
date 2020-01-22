import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;

        this.productService.getProduct(paramMap.get('id')).subscribe(product => {
          this.product = product;
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      barcode: new FormControl(this.product ? this.product.barcode : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(13), Validators.pattern('^(0|[1-9][0-9]*)$')]
      }),
      description: new FormControl(this.product ? this.product.description : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      price: new FormControl(this.product ? this.product.price : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]
      })
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const value: Product = {
      id: this.product ? this.product.id : null,
      ...this.form.value
    };

    this.productService.addProduct(value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}