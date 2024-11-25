import { NgModule } from "@angular/core";
import { ProductDetailsComponent } from "./product-details.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { ProductDetailsRoutingModule } from "./product-details-routing.module";



@NgModule({
    declarations: [
        ProductDetailsComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        ProductDetailsRoutingModule,

    ]
})
export class ProductDetailsModule{}