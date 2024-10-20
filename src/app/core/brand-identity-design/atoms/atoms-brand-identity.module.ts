import { NgModule } from "@angular/core";
import { HamburguerButtonComponent } from "./hamburguer-button/hamburguer-button.component";
import { LogoComponent } from "./logo/logo.component";
import { NavLinkComponent } from "./nav-link/nav-link.component";
import { CommonModule } from "@angular/common";
import { CloseHamburguerButtonComponent } from './close-hamburguer-button/close-hamburguer-button.component';


@NgModule({
    declarations: [
        HamburguerButtonComponent,
        LogoComponent,
        NavLinkComponent,
        CloseHamburguerButtonComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HamburguerButtonComponent,
        LogoComponent,
        NavLinkComponent,
        CloseHamburguerButtonComponent
    ]
})
export class AtomsBrandIdentityModule{}