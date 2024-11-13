import { NgModule } from "@angular/core";
import { WarehouseAssistantComponent } from "./warehouse-assistant.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { WarehouseAssistantRoutingModule } from "./warehouse-assistant-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        WarehouseAssistantComponent
    ], 
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        WarehouseAssistantRoutingModule,
        ReactiveFormsModule
    ]
})
export class WarehouseAssistantModule { }