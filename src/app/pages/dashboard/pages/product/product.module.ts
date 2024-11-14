import { NgModule } from "@angular/core";
import { ProductComponent } from "./product.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductRoutingModule } from "./product-routing.module";
import { DesignSystemModule } from "src/app/design-system/design-system.module";

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        ProductRoutingModule,
        ReactiveFormsModule,
    ]
})
export class ProductModule { }