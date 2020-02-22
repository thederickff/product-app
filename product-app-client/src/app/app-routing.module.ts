import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/explore',
    pathMatch: 'full'
  },
  {
    path: 'admin/products',
    loadChildren: () => import('./pages/admin/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
