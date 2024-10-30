import { NgModule } from "@angular/core";
import { BrandComponent } from "./brand.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrandRoutingModule } from "./brand-routing.module";
import { DesignSystemModule } from "src/app/design-system/design-system.module";


@NgModule({
    declarations: [
        BrandComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        BrandRoutingModule,
        FormsModule
    ]
})
export class BrandModule { }