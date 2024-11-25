import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { ROUTE_HOME } from "src/app/core/constants/routing.constants";


const routes: Routes = [
    {
        path: ROUTE_HOME,
        component: HomeComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }