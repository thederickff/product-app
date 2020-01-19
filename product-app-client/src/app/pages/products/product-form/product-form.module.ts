import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormPage } from './product-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProductFormPage
  }
];

@NgModule({
  declarations: [ProductFormPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class ProductFormModule { }