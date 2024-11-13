import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastType } from 'src/app/shared/models/toast.model';
import { TOAST_ON_SUBMIT_MESSAGE_ERROR } from 'src/app/shared/constants/login/login.constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastService: ToastService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      logIn: jest.fn()
    };
    const toastServiceMock = {
      showToast: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the form group with username and password controls', () => {
    expect(component.loginFormGroup).toBeTruthy();
    expect(component.loginFormGroup.controls['username']).toBeTruthy();
    expect(component.loginFormGroup.controls['password']).toBeTruthy();
  });

  it('should show a warning message if required fields are missing', () => {
    component.loginFormGroup.controls['username'].setValue('');
    component.loginFormGroup.controls['password'].setValue('');

    const showToastSpy = jest.spyOn(toastService, 'showToast');
    component.onSubmit();

    expect(showToastSpy).toHaveBeenCalledWith(
      'Username and Password are required.',
      ToastType.WARNING
    );
  });

  it('should call loginUser with valid form data and navigate to dashboard on successful login', () => {
    const loginData = { username: 'testuser', password: 'password123' };
    component.loginFormGroup.setValue(loginData);

    const logInSpy = jest.spyOn(authService, 'logIn').mockReturnValue(of({ token: 'dummy_token' }));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(logInSpy).toHaveBeenCalledWith({ email: loginData.username, password: loginData.password });
    expect(navigateSpy).toHaveBeenCalledWith(['/category']);
  });

  it('should show an error toast if login fails', () => {
    const loginData = { username: 'testuser', password: 'password123' };
    component.loginFormGroup.setValue(loginData);

    const logInSpy = jest.spyOn(authService, 'logIn').mockReturnValue(throwError(() => new Error('Login failed')));
    const showToastSpy = jest.spyOn(toastService, 'showToast');

    component.onSubmit();

    expect(logInSpy).toHaveBeenCalledWith({ email: loginData.username, password: loginData.password });
    expect(showToastSpy).toHaveBeenCalledWith(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
  });

  it('should not call loginUser if the form is invalid', () => {
    component.loginFormGroup.controls['username'].setValue('');
    component.loginFormGroup.controls['password'].setValue('');

    const logInSpy = jest.spyOn(authService, 'logIn');

    component.onSubmit();

    expect(logInSpy).not.toHaveBeenCalled();
  });
});
