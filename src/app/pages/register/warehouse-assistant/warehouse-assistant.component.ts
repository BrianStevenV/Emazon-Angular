import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TOAST_ON_SUBMIT_MESSAGE_ERROR, TOAST_ON_SUBMIT_MESSAGE_SUCCESS, WAREHOUSE_SUBMIT_BUTTON_NAME, WAREHOUSE_SUBMIT_BUTTON_TYPE } from 'src/app/shared/constants/user/warehouse/warehouse.constants';
import { ToastType } from 'src/app/shared/models/toast.model';
import { User } from 'src/app/shared/models/user.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-warehouse-assistant',
  templateUrl: './warehouse-assistant.component.html',
  styleUrls: ['./warehouse-assistant.component.scss']
})
export class WarehouseAssistantComponent implements OnInit {

  public warehouseAssistantFormGroup!: FormGroup;

  submitButtonName = WAREHOUSE_SUBMIT_BUTTON_NAME;
  submitButtonType = WAREHOUSE_SUBMIT_BUTTON_TYPE;

  fields = [
    { nameLabel: 'Name', formControlName: 'userName', inputType: 'text', validators: [Validators.required, Validators.minLength(3)], maxLength: 50 },
    { nameLabel: 'Last Name', formControlName: 'userLastName', inputType: 'text', validators: [Validators.required, Validators.minLength(3)], maxLength: 50 },
    { nameLabel: 'Identity Document', formControlName: 'userIdentityDocument', inputType: 'text', validators: [Validators.required, Validators.minLength(8)], maxLength: 8 },
    { nameLabel: 'Phone', formControlName: 'userPhone', inputType: 'text', validators: [Validators.required, Validators.pattern(/^\+\d{1,3}\d{10}$/)], maxLength: 13 },
    { nameLabel: 'Email', formControlName: 'userEmail', inputType: 'email', validators: [Validators.required, Validators.email], maxLength: 130 },
    { nameLabel: 'Password', formControlName: 'userPassword', inputType: 'password', validators: [Validators.required, Validators.minLength(8)], maxLength: 90 },
    { nameLabel: 'Birthdate', formControlName: 'userBirthdate', inputType: 'date', validators: [Validators.required, this.ageValidator()], maxLength: 50 },
  ];

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.warehouseAssistantFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userLastName: ['', [Validators.required, Validators.minLength(3)]],
      userIdentityDocument: ['', [Validators.required, Validators.minLength(8)]],
      userPhone: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}\d{10}$/)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      userBirthdate: ['', [Validators.required, this.ageValidator()]],
    });
  }

  onSubmit(): void {
    const formData = this.warehouseAssistantFormGroup.value;
    const requiredFields = this.extractRequiredFields();
    const missingFields = this.findMissingFields(requiredFields, formData);

    if (missingFields.length > 0) {
      this.showMissingFieldsWarning(missingFields);
      return;
    } else {
      const user = this.mapToWarehouseUserData(formData);
      console.log(user);
      this.createWarehouseAssistantUser(user);
    }
  }

  createWarehouseAssistantUser(user: User) {
    this.userService.createWarehouseUser(user).subscribe({
      next: (response) => {
        console.log(`Response from onSubmit warehouse: ${response}`);
        this.toastService.showToast(TOAST_ON_SUBMIT_MESSAGE_SUCCESS, ToastType.SUCCESS);
        this.warehouseAssistantFormGroup.reset();
      },
      error: (error) => {
        console.error(`Error from onSubmit warehouse: ${error}`);
        this.toastService.showToast(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.warehouseAssistantFormGroup.get(name) as FormControl;
  }

  private ageValidator(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      if (!value) return null;
  
      const birthdate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthdate.getFullYear();
      const isAdult = age > 18 || (age === 18 && 
                    (currentDate.getMonth() > birthdate.getMonth() || 
                    (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() >= birthdate.getDate())));
  
      if (!isAdult) {
        this.toastService.showToast("The System only allows input Adult's people.", ToastType.WARNING);
        return { adult: false };
      }
  
      return { adult: true };
    };
  }
  

  private extractRequiredFields(): { name: string, label: string }[] {
    return this.fields.map(({ formControlName, nameLabel }) => ({ name: formControlName, label: nameLabel }));
  }

  private findMissingFields(requiredFields: { name: string, label: string }[], formData: any): string[] {
    return requiredFields
      .filter(({ name }) => !formData[name] || formData[name].trim() === '')
      .map(({ label }) => label);
  }

  private showMissingFieldsWarning(missingFields: string[]): void {
    const message = `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required.`;
    this.toastService.showToast(message, ToastType.WARNING);
  }

  private mapToWarehouseUserData(formData: any): User {

    return {
      name: formData.userName,
      surName: formData.userLastName,
      dni: formData.userIdentityDocument,
      phone: formData.userPhone,
      birthDate: formData.userBirthdate,
      email: formData.userEmail,
      password: formData.userPassword,
    };
  }
}
