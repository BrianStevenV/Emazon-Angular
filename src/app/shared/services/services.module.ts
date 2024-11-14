import { NgModule } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { BrandService } from "./brand/brand.service";
import { CategoryService } from "./category/category.service";
import { ProductService } from "./product/product.service";
import { ToastService } from "./toast/toast.service";
import { UserService } from "./user/user.service";


@NgModule({
    declarations: [
        AuthService,
        BrandService,
        CategoryService,
        ProductService,
        ToastService,
        UserService
    ],
    exports: [
        AuthService,
        BrandService,
        CategoryService,
        ProductService,
        ToastService,
        UserService
    ]
})
export class ServicesModule{}