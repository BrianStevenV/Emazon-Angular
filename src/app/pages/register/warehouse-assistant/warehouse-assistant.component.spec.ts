import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseAssistantComponent } from './warehouse-assistant.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TOAST_ON_SUBMIT_MESSAGE_ERROR, TOAST_ON_SUBMIT_MESSAGE_SUCCESS } from 'src/app/shared/constants/user/warehouse/warehouse.constants';
import { ToastType } from 'src/app/shared/models/toast.model';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/app/shared/models/user.model';

describe('WarehouseAssistantComponent', () => {
  let component: WarehouseAssistantComponent;
  let fixture: ComponentFixture<WarehouseAssistantComponent>;
  let toastService: ToastService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseAssistantComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, ToastService, UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseAssistantComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls and validators', () => {
    const formGroup = component.warehouseAssistantFormGroup;
    expect(formGroup.contains('userName')).toBeTruthy();
    expect(formGroup.contains('userLastName')).toBeTruthy();
    expect(formGroup.contains('userIdentityDocument')).toBeTruthy();
    expect(formGroup.contains('userPhone')).toBeTruthy();
    expect(formGroup.contains('userEmail')).toBeTruthy();
    expect(formGroup.contains('userPassword')).toBeTruthy();
    expect(formGroup.contains('userBirthdate')).toBeTruthy();

    const userNameControl = formGroup.get('userName');
    expect(userNameControl?.hasValidator(Validators.required)).toBeTruthy();
  });

  it('should show a warning message when required fields are missing on submit', () => {
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    component.warehouseAssistantFormGroup.patchValue({
      userName: '',
      userEmail: ''
    });
    
    component.onSubmit();
    
    expect(showToastSpy).toHaveBeenCalledWith('Name and Last Name and Identity Document and Phone and Email and Password and Birthdate are required.', ToastType.WARNING);
  });

  it('should call createWarehouseAssistantUser with the mapped user data if form is valid', () => {
    const createWarehouseAssistantUserSpy = jest.spyOn(component, 'createWarehouseAssistantUser');
    component.warehouseAssistantFormGroup.patchValue({
      userName: 'John',
      userLastName: 'Doe',
      userIdentityDocument: '12345678',
      userPhone: '+1234567890123',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      userBirthdate: '1990-01-01'
    });

    component.onSubmit();

    expect(createWarehouseAssistantUserSpy).toHaveBeenCalledWith({
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+1234567890123',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123'
    });
  });

  it('should show a success toast on successful user creation', () => {
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    
    const mockResponse = new HttpResponse<User>({
      body: {
        name: 'John',
        surName: 'Doe',
        dni: '12345678',
        phone: '+1234567890123',
        birthDate: new Date('1990-01-01'),
        email: 'john.doe@example.com',
        password: 'password123'
      },
      status: 200,
      statusText: 'OK'
    });
  
    jest.spyOn(userService, 'createWarehouseUser').mockReturnValue(of(mockResponse));
  
    component.createWarehouseAssistantUser({
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+1234567890123',
      birthDate: new Date('1990-01-01'),
      email: 'john.doe@example.com',
      password: 'password123'
    });
  
    expect(showToastSpy).toHaveBeenCalledWith(TOAST_ON_SUBMIT_MESSAGE_SUCCESS, ToastType.SUCCESS);
  });

  it('should show an error toast on user creation failure', () => {
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    jest.spyOn(userService, 'createWarehouseUser').mockReturnValue(throwError(() => new Error('Error')));

    component.createWarehouseAssistantUser({
      name: 'John',
      surName: 'Doe',
      dni: '12345678',
      phone: '+1234567890123',
      birthDate: new Date('1990-01-01'),
      email: 'john.doe@example.com',
      password: 'password123'
    });

    expect(showToastSpy).toHaveBeenCalledWith(TOAST_ON_SUBMIT_MESSAGE_ERROR, ToastType.ERROR);
  });

  
});
