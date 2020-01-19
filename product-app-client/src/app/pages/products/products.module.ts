import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPage } from './products.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'new',
    loadChildren: './product-form/product-form.module#ProductFormModule'
  },
  {
    path: ':id',
    loadChildren: './product-form/product-form.module#ProductFormModule'
  }
];

@NgModule({
  declarations: [ProductsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
