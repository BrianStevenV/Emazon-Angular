import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { HomeRoutingModule } from "./home-routing.module";
import { AtomModule } from "../../../../design-system/atoms/atoms.module";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
    CoreModule,
    CommonModule,
    DesignSystemModule,
    HomeRoutingModule,
]
})
export class HomeModule{}