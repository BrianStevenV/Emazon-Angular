import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal/modal.component";
import { CommonModule } from "@angular/common";
import { AtomModule } from "../atoms/atoms.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastComponent } from './toast/toast.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableHeaderRowComponent } from './table-header-row/table-header-row.component';
import { PaginatorNavigationComponent } from './paginator-navigation/paginator-navigation.component';


@NgModule({
    declarations: [
        ModalComponent,
        ToastComponent,
        TableRowComponent,
        TableHeaderRowComponent,
        PaginatorNavigationComponent
    ],
    imports: [
        AtomModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ], 
    exports: [
        ModalComponent, 
        ToastComponent,
        TableRowComponent,
        TableHeaderRowComponent,
        PaginatorNavigationComponent
    ]
})
export class MoleculesModule { }