import { NgModule } from "@angular/core";
import { AtomModule } from "./atoms/atoms.module";
import { MoleculesModule } from "./molecules/molecules.module";


@NgModule({
    imports: [
        AtomModule,
        MoleculesModule
    ],
    exports: [
        AtomModule,
        MoleculesModule
    ]
})
export class DesignSystemModule { }