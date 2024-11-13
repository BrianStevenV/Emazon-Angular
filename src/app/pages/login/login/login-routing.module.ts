import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { NgModule } from "@angular/core";
import { ROUTE_LOGIN } from "src/app/core/constants/routing.constants";


const routes: Routes = [
    {
        path: ROUTE_LOGIN,
        component: LoginComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule{}