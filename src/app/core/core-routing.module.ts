import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from 'src/app/pages/dashboard/pages/category/category.component';
import { BrandComponent } from '../pages/dashboard/pages/brand/brand.component';



export const routes: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
        loadChildren: () => import('../pages/dashboard/pages/category/category.module').then(m => m.CategoryModule)
    },
    {
      path: 'brand',
      component: BrandComponent,
      loadChildren: () => import('../pages/dashboard/pages/brand/brand.module').then(m => m.BrandModule)
    }
]

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
  })
export class CoreRoutingModule{}