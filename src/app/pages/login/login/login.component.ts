import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LOGIN_SUBMIT_BUTTON_NAME, LOGIN_SUBMIT_BUTTON_TYPE, TOAST_ON_SUBMIT_MESSAGE_ERROR, VALIDATORS_PASSWORD_MAX_LENGTH, VALIDATORS_USERNAME_MAX_LENGTH } from 'src/app/shared/constants/login/login.constants';
import { Login } from 'src/app/shared/models/login.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { Router } from '@angular/router';
import { ROUTE_HOME } from 'src/app/core/constants/routing.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;

  submitButtonName =LOGIN_SUBMIT_BUTTON_NAME;
  submitButtonType = LOGIN_SUBMIT_BUTTON_TYPE;
  fields = [
    {nameLabel: 'Username', formControlName: 'username', inputType: 'text', validators: [Validators.required, Validators.maxLength(VALIDATORS_USERNAME_MAX_LENGTH)], maxLength: VALIDATORS_USERNAME_MAX_LENGTH},
    {nameLabel: 'Password', formControlName: 'password', inputType: 'password', validators: [Validators.required, Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)], maxLength: VALIDATORS_PASSWORD_MAX_LENGTH}
  ]
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(VALIDATORS_USERNAME_MAX_LENGTH)]],
      password: ['', [Validators.required, Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)]]
    })
  }

  onSubmit(): void {
    const formData = this.loginFormGroup.value;
    const requiredFields = this.extractRequiredFields();
    const missingFields = this.findMissingFields(requiredFields, formData);

    if (missingFields.length > 0) {
      this.showMissingFieldsWarning(missingFields);
      return;
    } else {
      const login = this.mapToLoginData(formData);
      console.log(login);
      this.loginUser(login);
    }
  }

  loginUser(login: Login) {
    this.authService.logIn(login).subscribe({
      next: (response) => {
        response.token ? this.navigateToDashboard() : this.toastService.showToast(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
      },
      error: (error) => {
        this.toastService.showToast(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
      }
    });
  };
  

  getFormControl(name: string): FormControl {
    return this.loginFormGroup.get(name) as FormControl;
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

  private mapToLoginData(formData: any): Login {

    return {
      email: formData.username,
      password: formData.password,
    };
  }

  navigateToDashboard() {
    this.router.navigate([`/${ROUTE_HOME}`]);
  }
}
