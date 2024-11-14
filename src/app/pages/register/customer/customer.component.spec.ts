import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { of, throwError } from 'rxjs';
import { ToastType } from 'src/app/shared/models/toast.model';
import { CUSTOMER_SUBMIT_BUTTON_NAME, CUSTOMER_SUBMIT_BUTTON_TYPE, TOAST_ON_SUBMIT_MESSAGE_SUCCESS, TOAST_ON_SUBMIT_MESSAGE_ERROR } from 'src/app/shared/constants/user/customer/customer.constants';
import { HttpResponse } from '@angular/common/http';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let toastService: ToastService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ToastService, useValue: { showToast: jest.fn() } },
        { provide: UserService, useValue: { createCustomerUser: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined customerFormGroup', () => {
    expect(component.customerFormGroup).toBeDefined();
  });

  it('should call createCustomerUser on submit when form is valid', () => {
    // Arrange
    const formData = {
      userName: 'John',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+123456789012',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '2000-01-01'
    };
    component.customerFormGroup.setValue(formData);
    const user: User = {
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+123456789012',
      birthDate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };
  
    // Simula un HttpResponse<User> en lugar de una cadena de texto
    const mockResponse = new HttpResponse({
      status: 200,
      body: user,
    });
  
    jest.spyOn(userService, 'createCustomerUser').mockReturnValue(of(mockResponse));  // Aquí devolvemos el HttpResponse simulado
    jest.spyOn(toastService, 'showToast');
  
    // Act
    component.onSubmit();
  
    // Assert
    expect(userService.createCustomerUser).toHaveBeenCalledWith(user);
    expect(toastService.showToast).toHaveBeenCalledWith(TOAST_ON_SUBMIT_MESSAGE_SUCCESS, ToastType.SUCCESS);
    expect(component.customerFormGroup.reset).toHaveBeenCalled();
  });

  it('should show warning if required fields are missing', () => {
    // Arrange
    const formData = {
      userName: '',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+123456789012',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '2000-01-01'
    };
    component.customerFormGroup.setValue(formData);
    jest.spyOn(toastService, 'showToast');

    // Act
    component.onSubmit();

    // Assert
    expect(toastService.showToast).toHaveBeenCalledWith('Name is required.', ToastType.WARNING);
  });

  it('should call showToast with error message when createCustomerUser fails', () => {
    // Arrange
    const formData = {
      userName: 'John',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+123456789012',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '2000-01-01'
    };
    component.customerFormGroup.setValue(formData);
    const user = {
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+123456789012',
      birthDate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    jest.spyOn(userService, 'createCustomerUser').mockReturnValue(throwError('Error'));
    jest.spyOn(toastService, 'showToast');

    // Act
    component.onSubmit();

    // Assert
    expect(userService.createCustomerUser).toHaveBeenCalledWith(user);
    expect(toastService.showToast).toHaveBeenCalledWith(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
  });

  it('should show toast warning if the user is not an adult', () => {
    // Arrange
    const formData = {
      userName: 'John',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+123456789012',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '2010-01-01' // Under 18 years old
    };
    component.customerFormGroup.setValue(formData);
    jest.spyOn(toastService, 'showToast');

    // Act
    component.onSubmit();

    // Assert
    expect(toastService.showToast).toHaveBeenCalledWith("The System only allows input Adult's people.", ToastType.WARNING);
  });

  it('should correctly map form data to user model', () => {
    // Arrange
    const formData = {
      userName: 'John',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+123456789012',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '2000-01-01'
    };

    // Act
    const user = component.mapToCustomerUserData(formData);

    // Assert
    expect(user).toEqual({
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+123456789012',
      birthDate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password123'
    });
  });

  it('should call getFormControl and return the correct form control', () => {
    // Act
    const formControl = component.getFormControl('userName');

    // Assert
    expect(formControl).toBe(component.customerFormGroup.get('userName'));
  });
});
