import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./core/components/layout/layout.component";
import { RoutePathEnum } from "./shared/types/route-path-enum";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        // children: [
        //     {
        //         path: RoutePathEnum.Category,
        //         loadChildren: () => import('./pages/dashboard/pages/category/category.module').then(m => m.CategoryModule)
        //     },
        // ]
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
export class AppRoutingModule{}

