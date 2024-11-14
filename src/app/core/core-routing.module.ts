import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from 'src/app/pages/dashboard/pages/category/category.component';
import { BrandComponent } from '../pages/dashboard/pages/brand/brand.component';
import { ProductComponent } from '../pages/dashboard/pages/product/product.component';
import { WarehouseAssistantComponent } from '../pages/register/warehouse-assistant/warehouse-assistant.component';
import { ROUTE_CATEGORY, ROUTE_BRAND, ROUTE_PRODUCT, ROUTE_WAREHOUSE_ASSISTANT_REGISTER, ROUTE_LOGIN } from './constants/routing.constants';
import { LoginComponent } from '../pages/login/login/login.component';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthGuard } from './auth/guards/auth.guard';



export const routes: Routes = [
    {
        path: ROUTE_LOGIN,
        component: LoginComponent,
        loadChildren: () => import('../pages/login/login/login.module').then(m => m.LoginModule), 
        canActivate: [LoginGuard]
    },
    {
        path: ROUTE_CATEGORY,
        component: CategoryComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('../pages/dashboard/pages/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: ROUTE_BRAND,
        component: BrandComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('../pages/dashboard/pages/brand/brand.module').then(m => m.BrandModule)
    },
    {
        path: ROUTE_PRODUCT,
        component: ProductComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('../pages/dashboard/pages/product/product.module').then(m => m.ProductModule)
    },
    {
        path: ROUTE_WAREHOUSE_ASSISTANT_REGISTER,
        component: WarehouseAssistantComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('../pages/register/warehouse-assistant/warehouse-assistant.module').then(m => m.WarehouseAssistantModule)
    },
    
    
]


@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports:[RouterModule],
  })
export class CoreRoutingModule{}