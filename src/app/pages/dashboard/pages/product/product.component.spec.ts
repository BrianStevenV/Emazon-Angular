
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { CategoryResponse } from 'src/app/shared/models/category.model';
import { BrandResponse } from 'src/app/shared/models/brand.model';
import { FormControl } from '@angular/forms';

describe('ProductComponent Additional Tests', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jest.Mocked<ProductService>;
  let categoryService: jest.Mocked<CategoryService>;
  let brandService: jest.Mocked<BrandService>;
  let toastService: jest.Mocked<ToastService>;

  const mockCategories: CategoryResponse[] = [
    { id: 1, name: 'Category1', description: 'Category1' },
    { id: 2, name: 'Category2', description: 'Category2' }
  ];
  const mockBrands: BrandResponse[] = [
    { id: 1, name: 'Brand1', description: 'Brand1' },
    { id: 2, name: 'Brand2', description: 'Brand2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: { createProduct: jest.fn() } },
        { provide: CategoryService, useValue: { getAllCategories: jest.fn() } },
        { provide: BrandService, useValue: { getAllBrands: jest.fn() } },
        { provide: ToastService, useValue: { showToast: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;

    categoryService.getAllCategories.mockReturnValue(of(mockCategories));
    brandService.getAllBrands.mockReturnValue(of(mockBrands));

    fixture.detectChanges();
  });

  // Testing getters
  describe('Getters', () => {
    it('should return empty arrays when categories/brands are undefined', () => {
      component.categories = undefined as any;
      component.brands = undefined as any;
      
      expect(component.categoriesNames).toEqual([]);
      expect(component.categoriesId).toEqual([]);
      expect(component.brandsNames).toEqual([]);
      expect(component.brandsId).toEqual([]);
    });

    it('should return correct arrays when categories/brands are defined', () => {
      component.categories = mockCategories;
      component.brands = mockBrands;

      expect(component.categoriesNames).toEqual(['Category1', 'Category2']);
      expect(component.categoriesId).toEqual([1, 2]);
      expect(component.brandsNames).toEqual(['Brand1', 'Brand2']);
      expect(component.brandsId).toEqual([1, 2]);
    });
  });

  // Testing form control getters
  describe('Form Control Getters', () => {
    it('should return brand form control', () => {
      const mockFormControl = new FormControl();
      expect(component.getFormControlBrandId(mockFormControl)).toBeTruthy();
    });

    it('should return category form control', () => {
      const mockFormControl = new FormControl();
      expect(component.getFormControlCategoryId(mockFormControl)).toBeTruthy();
    });
  });

  // Testing brand selection
  describe('Brand Selection', () => {
    it('should select brand when below max selection', () => {
      component.selectBrand(mockBrands[0]);
      expect(component.selectedBrands).toContain(mockBrands[0]);
    });

    it('should not add duplicate brand', () => {
      component.selectBrand(mockBrands[0]);
      component.selectBrand(mockBrands[0]);
      expect(component.selectedBrands.length).toBe(1);
    });

    it('should remove brand correctly', () => {
      component.selectBrand(mockBrands[0]);
      component.removeBrand(mockBrands[0]);
      expect(component.selectedBrands).not.toContain(mockBrands[0]);
    });
  });

  describe('Data Loading Error Handling', () => {
    it('should handle error when loading categories', () => {
      categoryService.getAllCategories.mockReturnValue(throwError(() => ({ status: HttpStatusCode.InternalServerError })));
      component.loadCategories();
      expect(toastService.showToast).toHaveBeenCalled();
    });

    it('should handle error when loading brands', () => {
      brandService.getAllBrands.mockReturnValue(throwError(() => ({ status: HttpStatusCode.InternalServerError })));
      component.loadBrands();
      expect(toastService.showToast).toHaveBeenCalled();
    });
  });

  describe('Form Submission Edge Cases', () => {
    it('should handle form submission with empty string values', () => {
      const formData = {
        name: '   ',
        description: '   ',
        amount: 100,
        price: 200
      };
      component.onModalSubmit(formData);
      expect(toastService.showToast).toHaveBeenCalled();
    });

    it('should handle form submission with missing properties', () => {
      const formData = {};
      component.onModalSubmit(formData);
      expect(toastService.showToast).toHaveBeenCalled();
    });

    it('should handle product creation with no selected brand', () => {
      const formData = {
        name: 'Product1',
        description: 'Description',
        amount: 100,
        price: 200
      };
      component.selectedCategories = [mockCategories[0]];
      component.selectedBrands = [];
      
      productService.createProduct.mockReturnValue(of(new HttpResponse<any>({ status: HttpStatusCode.Created })));
      
      component.onModalSubmit(formData);
      expect(productService.createProduct).toHaveBeenCalledWith(expect.objectContaining({
        brandId: null
      }));
    });

    it('should handle unexpected success response code', () => {
      const formData = {
        name: 'Product1',
        description: 'Description',
        amount: 100,
        price: 200
      };
      component.selectedCategories = [mockCategories[0]];
      component.selectedBrands = [mockBrands[0]];
      
      productService.createProduct.mockReturnValue(of(new HttpResponse<any>({ status: HttpStatusCode.Ok })));
      
      component.onModalSubmit(formData);
      expect(toastService.showToast).toHaveBeenCalled();
    });
  });

  describe('Selection Handling', () => {
    it('should handle removing the last category', () => {
      component.selectCategory(mockCategories[0]);
      expect(component.selectedCategories.length).toBe(1);
      component.removeCategory(mockCategories[0]);
      expect(component.selectedCategories.length).toBe(0);
    });

    it('should initialize filtered lists correctly', () => {
      expect(component.filteredCategories).toEqual(mockCategories);
      expect(component.filteredBrands).toEqual(mockBrands);
    });
  });
});