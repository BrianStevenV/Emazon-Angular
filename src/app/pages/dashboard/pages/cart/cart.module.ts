import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { CommonModule } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { CoreModule } from "src/app/core/core.module";
import { CartRoutingModule } from "./cart-routing.module";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        CartComponent
    ], 
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        CartRoutingModule,
        FormsModule
    ]
})
export class CartModule{}