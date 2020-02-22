import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  }
]

@NgModule({
  declarations: [ExplorePage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExplorePageModule { }