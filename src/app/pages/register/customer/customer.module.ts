import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerRoutingModule } from "./customer-routing.module";


@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule{}