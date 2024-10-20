import { NgModule } from "@angular/core";
import { AtomsBrandIdentityModule } from "./atoms/atoms-brand-identity.module";
import { OrganismBrandIdentityModule } from "./organism/organism-brand-identity.module";


@NgModule({
    imports: [
        AtomsBrandIdentityModule,
        OrganismBrandIdentityModule
    ],
    exports: [
        AtomsBrandIdentityModule,
        OrganismBrandIdentityModule
    ]
})
export class BrandIdentityDesignModule{}