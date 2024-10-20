import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { AtomsBrandIdentityModule } from "../atoms/atoms-brand-identity.module";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        AtomsBrandIdentityModule
    ],
    exports: [
        NavbarComponent
    ],
})
export class OrganismBrandIdentityModule{}