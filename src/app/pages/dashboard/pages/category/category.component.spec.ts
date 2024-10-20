import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Category } from 'src/app/shared/models/category.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { SUCCESS_MESSAGES_POST, ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE } from 'src/app/shared/constants/category/category.constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(async () => {
    
    const mockCategoryService = {
      createCategory: jest.fn()
    };

    const mockToastService = {
      showToast: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [CategoryComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ToastService, useValue: mockToastService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
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

  it('should create a category and show success toast', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockResponse: HttpResponse<Category> = new HttpResponse({
      status: HttpStatusCode.Created,
      body: {
        name: formData.categoryName,
        description: formData.categoryDescription
      }
    });

    categoryService.createCategory.mockReturnValue(of(mockResponse));

    component.onModalSubmit(formData);

    expect(categoryService.createCategory).toHaveBeenCalledWith({
      name: formData.categoryName,
      description: formData.categoryDescription
    });
    expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.CATEGORY_CREATED, ToastType.SUCCESS);
  });

  it('should handle error when creating a category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockError = { status: 400 };
    categoryService.createCategory.mockReturnValue(throwError(mockError));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(ERROR_MESSAGES_BY_CODE[400], ToastType.ERROR);
  });

  it('should handle unexpected error response when creating a category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };
  
    const mockError = { status: 500 }; 
    categoryService.createCategory.mockReturnValue(throwError(mockError));
  
    component.onModalSubmit(formData);
  
    
    expect(toastService.showToast).toHaveBeenCalledWith(ERROR_MESSAGES_BY_CODE[500], ToastType.ERROR);
  });
  

  it('should handle unexpected response code when creating a category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockUnexpectedResponse: HttpResponse<Category> = new HttpResponse({
      status: HttpStatusCode.NoContent, 
      body: {
        name: formData.categoryName,
        description: formData.categoryDescription
      }
    });

    categoryService.createCategory.mockReturnValue(of(mockUnexpectedResponse));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE, ToastType.SUCCESS);
  });

  it('should show a warning if categoryName is missing', () => {
    const formData = { categoryName: '', categoryDescription: 'Some Description' };
    component.onModalSubmit(formData);

    expect(categoryService.createCategory).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith('Category Name is required.', ToastType.WARNING);
  });

  it('should show a warning if categoryDescription is missing', () => {
    const formData = { categoryName: 'Some Name', categoryDescription: '' };
    component.onModalSubmit(formData);

    expect(categoryService.createCategory).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith('Category Description is required.', ToastType.WARNING);
  });

  it('should call createCategory if both categoryName and categoryDescription are provided', () => {
    const formData = { categoryName: 'Some Name', categoryDescription: 'Some Description' };
  
    // Mockear el servicio para que devuelva un Observable con una respuesta vacía o simulada.
    const mockResponse: HttpResponse<Category> = new HttpResponse({
      status: HttpStatusCode.Created,
      body: {
        name: formData.categoryName,
        description: formData.categoryDescription
      }
    });
    jest.spyOn(categoryService, 'createCategory').mockReturnValue(of(mockResponse)); 
  
    // Llamada a la función que estás probando
    component.onModalSubmit(formData);
  
    // Verificar que el servicio fue llamado
    expect(categoryService.createCategory).toHaveBeenCalled();
  });

  it('should handle unexpected error with status code 999', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockError = { status: 999 }; 
    categoryService.createCategory.mockReturnValue(throwError(mockError));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(GENERIC_ERROR_MESSAGE, ToastType.ERROR);
  });
});
