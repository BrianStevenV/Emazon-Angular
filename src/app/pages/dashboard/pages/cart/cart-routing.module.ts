import { RouterModule, Routes } from "@angular/router";
import { ROUTE_CART } from "src/app/core/constants/routing.constants";
import { CartComponent } from "./cart.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
        path: ROUTE_CART,
        component: CartComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule {}