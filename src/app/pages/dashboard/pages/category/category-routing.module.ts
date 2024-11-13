import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { ROUTE_CATEGORY } from "src/app/core/constants/routing.constants";

const routes: Routes = [
    {
        path: ROUTE_CATEGORY,
        component: CategoryComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }