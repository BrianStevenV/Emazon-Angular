import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "./product.component";
import { ROUTE_PRODUCT } from "src/app/core/constants/routing.constants";

const routes: Routes = [
    {
        path: ROUTE_PRODUCT,
        component: ProductComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }