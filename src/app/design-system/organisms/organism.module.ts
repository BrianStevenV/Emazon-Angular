import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { MoleculesModule } from "../molecules/molecules.module";
import { AtomModule } from "../atoms/atoms.module";
import { PaginatorComponent } from './paginator/paginator.component';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { CardProductComponent } from "./card-product/card-product.component";
import { CardProductDetailsComponent } from "./card-product-details/card-product-details.component";

@NgModule({
    declarations: [
        TableComponent,
        PaginatorComponent,
        FormSubmitComponent,
        CardProductComponent,
        CardProductDetailsComponent
    ],
    imports: [
        CommonModule,
        AtomModule,
        MoleculesModule,
    ],
    exports: [
        TableComponent,
        PaginatorComponent,
        FormSubmitComponent,
        CardProductComponent,
        CardProductDetailsComponent
    ]
})
export class OrganismsModule{}