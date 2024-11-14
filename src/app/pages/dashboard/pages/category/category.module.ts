import { NgModule } from "@angular/core";
import { CategoryComponent } from "./category.component";
import { CoreModule } from "src/app/core/core.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CategoryRoutingModule } from "./category-routing.module";
import { DesignSystemModule } from "src/app/design-system/design-system.module";



@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        DesignSystemModule,
        CategoryRoutingModule,
        FormsModule,
        
    ]
})
export class CategoryModule { }