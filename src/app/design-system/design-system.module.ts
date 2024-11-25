import { NgModule } from "@angular/core";
import { AtomModule } from "./atoms/atoms.module";
import { MoleculesModule } from "./molecules/molecules.module";
import { OrganismsModule } from "./organisms/organism.module";
import { CardProductComponent } from './organisms/card-product/card-product.component';
import { CardProductDetailsComponent } from './organisms/card-product-details/card-product-details.component';


@NgModule({
    imports: [
        AtomModule,
        MoleculesModule, 
        OrganismsModule
    ],
    exports: [
        AtomModule,
        MoleculesModule, 
        OrganismsModule
    ],
})
export class DesignSystemModule { }