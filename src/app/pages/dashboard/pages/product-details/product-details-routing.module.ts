import { RouterModule, Routes } from "@angular/router";
import { ProductDetailsComponent } from "./product-details.component";
import { NgModule } from "@angular/core";
import { ROUTE_PRODUCT_DETAILS } from "src/app/core/constants/routing.constants";



const routes: Routes = [
    {
        path: ROUTE_PRODUCT_DETAILS,
        component: ProductDetailsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductDetailsRoutingModule {}