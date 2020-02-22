import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPage } from './products.page';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'new',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule)
  }
];

@NgModule({
  declarations: [ProductsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule
  ]
})
export class ProductsModule { }
