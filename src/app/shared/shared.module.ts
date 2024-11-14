
import { NgModule } from "@angular/core";
import { ServicesModule } from "./services/services.module";
import { DirectivesModule } from "./directives/directives.module";

@NgModule({
    imports: [
        ServicesModule,
        DirectivesModule
    ],
    exports: [
        ServicesModule,
        DirectivesModule
    ]
})
export class SharedModule{}