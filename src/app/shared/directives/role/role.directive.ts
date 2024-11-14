import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Directive({
    selector: '[appRole]'
})
export class RoleDirective {
    private readonly role!: string | null;

    constructor(
        private readonly templateRef: TemplateRef<unknown>, // or Any?
        private readonly viewContainer: ViewContainerRef,
        private readonly authService: AuthService
    ){
        this.role = this.authService.getRole();
    }

    @Input() set appRole(role: string) {    
        this.role === role ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
      }

}