import { NgModule } from "@angular/core";
import { LabelComponent } from "./label/label.component";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';
import { SelectComponent } from './select/select.component';
import { SpanComponent } from './span/span.component';


@NgModule({
    declarations: [
        LabelComponent,
        InputComponent,
        ButtonComponent,
        TableCellComponent,
        TableHeaderCellComponent,
        SelectComponent,
        SpanComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        LabelComponent,
        InputComponent,
        ButtonComponent,
        TableCellComponent,
        TableHeaderCellComponent,
        SelectComponent, 
        SpanComponent
    ]
})
export class AtomModule { }