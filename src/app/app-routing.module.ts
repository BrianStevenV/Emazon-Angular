import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./core/components/layout/layout.component";
import { ROUTE_LOGIN } from './core/constants/routing.constants';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
export class AppRoutingModule{}

