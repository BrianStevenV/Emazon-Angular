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
import { SortDirection } from 'src/app/shared/models/paginator.model';
import { 
  SUCCESS_MESSAGES_POST, 
  ERROR_MESSAGES_BY_CODE, 
  GENERIC_ERROR_MESSAGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  ERROR_SHOW_TOAST_MESSAGE_EXCEPTION
} from 'src/app/shared/constants/category/category.constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let toastService: jest.Mocked<ToastService>;

  const mockCategories = {
    content: [
      { name: 'Category 1', description: 'Description 1' },
      { name: 'Category 2', description: 'Description 2' }
    ],
    totalElements: 2,
    pageSize: DEFAULT_PAGE_SIZE
  };

  beforeEach(async () => {
    const mockCategoryService = {
      createCategory: jest.fn(),
      getCategories: jest.fn().mockReturnValue(of(mockCategories))
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

  // Modal Tests
  it('should open the modal', () => {
    component.openModal();
    expect(component.modalVisible).toBe(true);
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.modalVisible).toBe(false);
  });

  // Category Creation Tests
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
    expect(toastService.showToast).toHaveBeenCalledWith(
      SUCCESS_MESSAGES_POST.CATEGORY_CREATED, 
      ToastType.SUCCESS
    );
  });

  it('should handle error when creating a category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockError = { status: 400 };
    categoryService.createCategory.mockReturnValue(throwError(() => mockError));
    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(
      ERROR_MESSAGES_BY_CODE[400], 
      ToastType.ERROR
    );
  });

  it('should handle unexpected error response when creating a category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };
  
    const mockError = { status: 500 }; 
    categoryService.createCategory.mockReturnValue(throwError(() => mockError));
    component.onModalSubmit(formData);
  
    expect(toastService.showToast).toHaveBeenCalledWith(
      ERROR_MESSAGES_BY_CODE[500], 
      ToastType.ERROR
    );
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

    expect(toastService.showToast).toHaveBeenCalledWith(
      SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE, 
      ToastType.SUCCESS
    );
  });

  // Form Validation Tests
  it('should show a warning if categoryName is missing', () => {
    const formData = { 
      categoryName: '', 
      categoryDescription: 'Some Description' 
    };
    
    component.onModalSubmit(formData);

    expect(categoryService.createCategory).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith(
      'Category Name is required.', 
      ToastType.WARNING
    );
  });

  it('should show a warning if categoryDescription is missing', () => {
    const formData = { 
      categoryName: 'Some Name', 
      categoryDescription: '' 
    };
    
    component.onModalSubmit(formData);

    expect(categoryService.createCategory).not.toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalledWith(
      'Category Description is required.', 
      ToastType.WARNING
    );
  });

  // Get Categories Tests
  it('should load categories on init', () => {
    component.ngOnInit();
    
    expect(categoryService.getCategories).toHaveBeenCalledWith(
      DEFAULT_PAGE, 
      DEFAULT_PAGE_SIZE, 
      DEFAULT_SORT_BY
    );
    expect(component.categories).toEqual(mockCategories.content);
    expect(component.totalItems).toBe(mockCategories.totalElements);
    expect(component.itemsPerPage).toBe(mockCategories.pageSize);
    expect(component.tableData).toEqual([
      ['Category 1', 'Description 1'],
      ['Category 2', 'Description 2']
    ]);
  });

  it('should handle error when loading categories', () => {
    categoryService.getCategories.mockReturnValue(throwError(() => new Error()));
    
    component.loadCategories();

    expect(toastService.showToast).toHaveBeenCalledWith(
      ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, 
      ToastType.ERROR
    );
  });

  // Pagination Tests
  it('should change page and reload categories', () => {
    const newPage = 2;
    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage);
    expect(categoryService.getCategories).toHaveBeenCalledWith(
      newPage, 
      component.itemsPerPage, 
      component.sortDirection
    );
  });

  it('should not change page if new page is invalid', () => {
    const currentPage = component.currentPage;
    component.onPageChange(-1);

    expect(component.currentPage).toBe(currentPage);
  });

  it('should change items per page and reload categories', () => {
    const newSize = 20;
    component.onItemsPerPageChange(newSize);

    
    expect(categoryService.getCategories).toHaveBeenCalledWith(
      component.currentPage, 
      newSize, 
      component.sortDirection
    );
  });

  // Sort Direction Tests
  it('should change sort direction and reload categories', () => {
    const newDirection = SortDirection.DESC;
    component.onSortDirectionChange(newDirection);

    expect(component.sortDirection).toBe(newDirection);
    expect(categoryService.getCategories).toHaveBeenCalledWith(
      component.currentPage, 
      component.itemsPerPage, 
      newDirection
    );
  });

  it('should handle generic error when creating category', () => {
    const formData = {
      categoryName: 'New Category',
      categoryDescription: 'Category Description'
    };

    const mockError = { status: 999 }; 
    categoryService.createCategory.mockReturnValue(throwError(() => mockError));

    component.onModalSubmit(formData);

    expect(toastService.showToast).toHaveBeenCalledWith(
      GENERIC_ERROR_MESSAGE, 
      ToastType.ERROR
    );
  });
});