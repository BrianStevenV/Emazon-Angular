import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { MoleculesModule } from "../molecules/molecules.module";
import { AtomModule } from "../atoms/atoms.module";
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
    declarations: [
        TableComponent,
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        AtomModule,
        MoleculesModule,
    ],
    exports: [
        TableComponent,
        PaginatorComponent
    ]
})
export class OrganismsModule{}