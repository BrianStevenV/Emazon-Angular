import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { LabelComponent } from "../../atoms/label/label.component";
import { InputComponent } from "../../atoms/input/input.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ModalComponent,
        LabelComponent,
        InputComponent, 
        ButtonComponent
    ], 
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule
    ], 
    exports: [
        ModalComponent
    ]
})
export class ModalModule {
}