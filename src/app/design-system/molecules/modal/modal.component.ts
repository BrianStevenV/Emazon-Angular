import { Component, OnInit, Output, EventEmitter, Input, ContentChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORM_CONTROL_NAME_DROPDOWN_BRAND, FORM_CONTROL_NAME_DROPDOWN_CATEGORY } from 'src/app/shared/constants/product/product.constants';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title!: string;
  @Input() closeButtonName!: string;
  @Input() submitButtonName!: string;
  @Input() formFields: { name: string, label: string, type: string, validators: any[], maxLength: number }[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<any>();

  @Input() requiredOthersCamps !: boolean;
  
  requiresBrandId: boolean = false;
  requiresCategoryId: boolean = false;

  @ContentChildren(DropdownComponent) dropdowns!: QueryList<DropdownComponent>;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.formFields.forEach(field => {
      this.form.addControl(field.name, new FormControl('', field.validators));
    });

    this.addFormControl(this.requiredOthersCamps);
  }

  ngAfterContentInit() {
    
    this.dropdowns.forEach(dropdown => {
      
      const controlName = dropdown.controlName;
      if (controlName && this.form.contains(controlName)) {
        
        dropdown.connectToForm(this.form.get(controlName) as FormControl);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onSubmit(): void {
    this.submitEvent.emit(this.form.value);
  }

  close(): void {
    this.closeModalEvent.emit();
  }


   addFormControl(flag: boolean): void {
    if (this.requiresBrandId) {
      this.form.addControl(FORM_CONTROL_NAME_DROPDOWN_BRAND, new FormControl('', Validators.required));
    }
    if (this.requiresCategoryId) {
      this.form.addControl(FORM_CONTROL_NAME_DROPDOWN_CATEGORY, new FormControl('', Validators.required));
    }
   }

  getBrandFormControl1(): FormControl {
    return this.form.get(FORM_CONTROL_NAME_DROPDOWN_BRAND) as FormControl;
  }

  getCategoryFormControl1(): FormControl {
    return this.form.get(FORM_CONTROL_NAME_DROPDOWN_CATEGORY) as FormControl;
  }
}
