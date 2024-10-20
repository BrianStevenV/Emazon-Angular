import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { CoreRoutingModule } from "./core-routing.module";
import { BrandIdentityDesignModule } from "./brand-identity-design/brand-identity-design.module";


@NgModule({
    declarations: [
        HeaderComponent,
        LayoutComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        CoreRoutingModule,
        BrandIdentityDesignModule
    ],
    exports: [
        HeaderComponent,
        LayoutComponent,
        FooterComponent,
    ]
})
export class CoreModule{}