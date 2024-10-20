import { NgModule } from "@angular/core";
import { LabelComponent } from "./label/label.component";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        LabelComponent,
        InputComponent,
        ButtonComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        LabelComponent,
        InputComponent,
        ButtonComponent
    ]
})
export class AtomModule { }