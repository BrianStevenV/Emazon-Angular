import { NgModule } from "@angular/core";
import { AtomModule } from "./atoms/atoms.module";
import { MoleculesModule } from "./molecules/molecules.module";
import { TableComponent } from './organisms/table/table.component';
import { OrganismsModule } from "./organisms/organism.module";


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