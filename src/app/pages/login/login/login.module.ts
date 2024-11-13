import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { DesignSystemModule } from "src/app/design-system/design-system.module";
import { LoginRoutingModule } from "./login-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AtomsBrandIdentityModule } from "../../../core/brand-identity-design/atoms/atoms-brand-identity.module";


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
    CoreModule,
    CommonModule,
    DesignSystemModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    AtomsBrandIdentityModule
]
})
export class LoginModule{}