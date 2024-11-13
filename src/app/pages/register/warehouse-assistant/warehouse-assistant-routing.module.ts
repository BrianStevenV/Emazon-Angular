import { RouterModule, Routes } from "@angular/router";
import { WarehouseAssistantComponent } from "./warehouse-assistant.component";
import { NgModule } from "@angular/core";
import { ROUTE_WAREHOUSE_ASSISTANT_REGISTER } from "src/app/core/constants/routing.constants";

const routes: Routes = [
    {
        path: ROUTE_WAREHOUSE_ASSISTANT_REGISTER,
        component: WarehouseAssistantComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseAssistantRoutingModule {}