import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal/modal.component";
import { CommonModule } from "@angular/common";
import { AtomModule } from "../atoms/atoms.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastComponent } from './toast/toast.component';


@NgModule({
    declarations: [
        ModalComponent,
        ToastComponent
    ],
    imports: [
        AtomModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ], 
    exports: [
        ModalComponent, 
        ToastComponent
    ]
})
export class MoleculesModule { }