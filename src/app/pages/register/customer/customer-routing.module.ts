import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { ROUTE_CUSTOMER_REGISTER } from "src/app/core/constants/routing.constants";

const routes: Routes = [
    {
        path: ROUTE_CUSTOMER_REGISTER,
        component: CustomerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule{}