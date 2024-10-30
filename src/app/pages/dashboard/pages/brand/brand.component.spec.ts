import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './brand.component';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Brand } from 'src/app/shared/models/brand.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { SUCCESS_MESSAGES_POST, ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE } from 'src/app/shared/constants/brand/brand.constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let brandService: jest.Mocked<BrandService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(async () => {
    
    const mockBrandService = {
      createBrand: jest.fn()
    };

    const mockToastService = {
      showToast: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [BrandComponent],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: ToastService, useValue: mockToastService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    component.openModal();
    expect(component.modalVisible).toBe(true);
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.modalVisible).toBe(false);
  });

  it('should create a brand and show success toast', () => {
    const formData = {
      brandName: 'New Brand',
      brandDescription: 'Brand Description'
    };

    const mockResponse: HttpResponse<Brand> = new HttpResponse({
      status: HttpStatusCode.Created,
      body: {
        name: formData.brandName,
        description: formData.brandDescription
      }
    });

    brandService.createBrand.mockReturnValue(of(mockResponse));

    component.onModalSubmit(formData);

    expect(brandService.createBrand).toHaveBeenCalledWith({
      name: formData.brandName,
      description: formData.brandDescription
    });
    expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.BRAND_CREATED, ToastType.SUCCESS);
  });

  it('should handle error when creating a brand', () => {
    const formData = {
      brandName: 'New Brand',
      brandDescription: 'Brand Description'
    };

    const mockError = { status: 400 };
    brandService.createBrand.mockReturnValue(throwError(mockError));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(ERROR_MESSAGES_BY_CODE[400], ToastType.ERROR);
  });

  it('should handle unexpected error response when creating a brand', () => {
    const formData = {
      brandName: 'New Brand',
      brandDescription: 'Brand Description'
    };
  
    const mockError = { status: 500 }; 
    brandService.createBrand.mockReturnValue(throwError(mockError));
  
    component.onModalSubmit(formData);
  
    expect(toastService.showToast).toHaveBeenCalledWith(ERROR_MESSAGES_BY_CODE[500], ToastType.ERROR);
  });
  

  it('should handle unexpected response code when creating a brand', () => {
    const formData = {
      brandName: 'New Brand',
      brandDescription: 'Brand Description'
    };

    const mockUnexpectedResponse: HttpResponse<Brand> = new HttpResponse({
      status: HttpStatusCode.NoContent, 
      body: {
        name: formData.brandName,
        description: formData.brandDescription
      }
    });

    brandService.createBrand.mockReturnValue(of(mockUnexpectedResponse));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE, ToastType.SUCCESS);
  });

  it('should show a warning if brandName is missing', () => {
    const formData = { brandName: '', brandDescription: 'Some Description' };
    component.onModalSubmit(formData);

    expect(brandService.createBrand).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith('Brand Name is required.', ToastType.WARNING);
  });

  it('should show a warning if brandDescription is missing', () => {
    const formData = { brandName: 'Some Name', brandDescription: '' };
    component.onModalSubmit(formData);

    expect(brandService.createBrand).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith('Brand Description is required.', ToastType.WARNING);
  });

  it('should call createBrand if both brandName and brandDescription are provided', () => {
    const formData = { brandName: 'Some Name', brandDescription: 'Some Description' };
  
    const mockResponse: HttpResponse<Brand> = new HttpResponse({
      status: HttpStatusCode.Created,
      body: {
        name: formData.brandName,
        description: formData.brandDescription
      }
    });
    jest.spyOn(brandService, 'createBrand').mockReturnValue(of(mockResponse)); 
  
    component.onModalSubmit(formData);
  
    expect(brandService.createBrand).toHaveBeenCalled();
  });

  it('should handle unexpected error with status code 999', () => {
    const formData = {
      brandName: 'New Brand',
      brandDescription: 'Brand Description'
    };

    const mockError = { status: 999 }; 
    brandService.createBrand.mockReturnValue(throwError(mockError));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(GENERIC_ERROR_MESSAGE, ToastType.ERROR);
  });
});
