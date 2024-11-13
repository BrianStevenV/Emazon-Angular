import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrandComponent } from "./brand.component";
import { ROUTE_BRAND } from "src/app/core/constants/routing.constants";

const routes: Routes = [
    {
        path: ROUTE_BRAND,
        component: BrandComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule { }