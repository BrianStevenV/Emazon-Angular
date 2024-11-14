
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SupplyService } from 'src/app/shared/services/supply/supply.service';
import { FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { ToastType } from 'src/app/shared/models/toast.model';
import { SortDirection } from 'src/app/shared/models/paginator.model';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceMock: jest.Mocked<ProductService>;
  let categoryServiceMock: jest.Mocked<CategoryService>;
  let brandServiceMock: jest.Mocked<BrandService>;
  let toastServiceMock: jest.Mocked<ToastService>;
  let supplyServiceMock: jest.Mocked<SupplyService>;

  const mockCategories = [
    { id: 1, name: 'Category 1', description: 'Description 1' },
    { id: 2, name: 'Category 2', description: 'Description 2' }
  ];

  const mockBrands = [
    { id: 1, name: 'Brand 1', description: 'Description 1' },
    { id: 2, name: 'Brand 2', description: 'Description 2' }
  ];

  const mockProducts = {
    content: [
      {
        name: 'Product 1',
        description: 'Description 1',
        amount: 10,
        price: 100,
        brand: mockBrands[0],
        categories: [mockCategories[0]]
      }
    ],
    totalElements: 1,

    pageSize: 5,

    pageNumber: 1,

    totalPages: 1

  };

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jest.fn(),
      createProduct: jest.fn()
    } as any;

    categoryServiceMock = {
      getAllCategories: jest.fn()
    } as any;

    brandServiceMock = {
      getAllBrands: jest.fn()
    } as any;

    toastServiceMock = {
      showToast: jest.fn()
    } as any;

    supplyServiceMock = {
      createSupply: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: SupplyService, useValue: supplyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      categoryServiceMock.getAllCategories.mockReturnValue(of(mockCategories));
      brandServiceMock.getAllBrands.mockReturnValue(of(mockBrands));
      productServiceMock.getProducts.mockReturnValue(of(mockProducts));
    });

    it('should load categories, brands and products on init', () => {
      component.ngOnInit();
      
      expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();
      expect(brandServiceMock.getAllBrands).toHaveBeenCalled();
      expect(productServiceMock.getProducts).toHaveBeenCalled();
      expect(component.categories).toEqual(mockCategories);
      expect(component.brands).toEqual(mockBrands);
      expect(component.products).toEqual(mockProducts.content);
    });

    it('should handle error when loading categories', () => {
      categoryServiceMock.getAllCategories.mockReturnValue(throwError(() => ({ status: 500 })));
      
      component.ngOnInit();
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Server error. Please try again later.',
        ToastType.ERROR
      );
    });

    it('should handle error when loading brands', () => {
      brandServiceMock.getAllBrands.mockReturnValue(throwError(() => ({ status: 500 })));
      
      component.ngOnInit();
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Server error. Please try again later.',
        ToastType.ERROR
      );
    });
  });

  describe('Modal operations', () => {
    it('should open modal', () => {
      component.openModal();
      expect(component.modalVisible).toBeTruthy();
    });

    it('should close modal and reset selections', () => {
      component.selectedCategories = [mockCategories[0]];
      component.selectedBrands = [mockBrands[0]];
      
      component.closeModal();
      
      expect(component.modalVisible).toBeFalsy();
      expect(component.selectedCategories).toEqual([]);
      expect(component.selectedBrands).toEqual([]);
    });

    it('should open supply modal', () => {
      component.openSupplyModal();
      expect(component.modalSupplyVisible).toBeTruthy();
    });

    it('should close supply modal', () => {
      component.closeSupplyModal();
      expect(component.modalSupplyVisible).toBeFalsy();
    });
  });

  describe('onModalSubmit', () => {
    const mockFormData = {

      name: 'Test Product',
    
      description: 'Test Description',
    
      amount: 10,
    
      price: 100,
    
      brandId: 1,
    
      categoryId: [1]
    
    };

    beforeEach(() => {
      productServiceMock.createProduct.mockReturnValue(
        of(new HttpResponse({ status: HttpStatusCode.Created, body: mockFormData }))
      );
    });

    it('should create product successfully', () => {
      component.selectedBrands = [mockBrands[0]];
      component.selectedCategories = [mockCategories[0]];
      
      component.onModalSubmit(mockFormData);
      
      expect(productServiceMock.createProduct).toHaveBeenCalled();
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Product created successfully',
        ToastType.SUCCESS
      );
    });

    it('should show warning for missing required fields', () => {
      const incompleteFormData = { name: 'Test' };
      
      component.onModalSubmit(incompleteFormData);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        expect.any(String),
        ToastType.WARNING
      );
    });

    it('should handle error when creating product', () => {
      productServiceMock.createProduct.mockReturnValue(
        throwError(() => ({ status: 400 }))
      );
      
      component.onModalSubmit(mockFormData);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'An error occurred while creating the Product.',
        ToastType.ERROR
      );
    });
  });

  describe('onModalSupplySubmit', () => {
    const mockSupplyFormData = {
      price: 100,
      quantityTotal: 10,
      quantityAvailable: 5,
      isAvailable: true,
      replenishmentDate: '2024-11-14',
      productId: 1
    };

    beforeEach(() => {
      supplyServiceMock.createSupply.mockReturnValue(
        of(new HttpResponse({ status: HttpStatusCode.Created, body: mockSupplyFormData }))
      );
    });

    it('should create supply successfully', () => {
      component.onModalSupplySubmit(mockSupplyFormData);
      
      expect(supplyServiceMock.createSupply).toHaveBeenCalled();
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Supply created successfully',
        ToastType.SUCCESS
      );
    });

    it('should show warning when available quantity is greater than total', () => {
      const invalidSupplyData = {
        ...mockSupplyFormData,
        quantityAvailable: 15
      };
      
      component.onModalSupplySubmit(invalidSupplyData);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'The available quantity cannot be greater than the total quantity.',
        ToastType.WARNING
      );
    });

    it('should handle error when creating supply', () => {
      supplyServiceMock.createSupply.mockReturnValue(
        throwError(() => ({ status: 400 }))
      );
      
      component.onModalSupplySubmit(mockSupplyFormData);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'An error occurred while creating the Supply.',
        ToastType.ERROR
      );
    });
  });

  describe('Selection operations', () => {
    it('should select category within limit', () => {
      const category = mockCategories[0];
      
      component.selectCategory(category);
      
      expect(component.selectedCategories).toContain(category);
    });

    it('should show warning when exceeding category selection limit', () => {
      component.selectedCategories = [...mockCategories, mockCategories[0]];
      
      component.selectCategory(mockCategories[1]);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'You can only select up to 3 categories.',
        ToastType.WARNING
      );
    });

    it('should select brand within limit', () => {
      const brand = mockBrands[0];
      
      component.selectBrand(brand);
      
      expect(component.selectedBrands).toContain(brand);
    });

    it('should show warning when exceeding brand selection limit', () => {
      component.selectedBrands = [mockBrands[0]];
      
      component.selectBrand(mockBrands[1]);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'You can only select up to 1 brands.',
        ToastType.WARNING
      );
    });

    it('should remove category', () => {
      const category = mockCategories[0];
      component.selectedCategories = [category];
      
      component.removeCategory(category);
      
      expect(component.selectedCategories).not.toContain(category);
    });

    it('should remove brand', () => {
      const brand = mockBrands[0];
      component.selectedBrands = [brand];
      
      component.removeBrand(brand);
      
      expect(component.selectedBrands).not.toContain(brand);
    });
  });

  describe('Pagination and sorting', () => {
    beforeEach(() => {
      productServiceMock.getProducts.mockReturnValue(of(mockProducts));
    });

    it('should handle page change', () => {
      component.totalItems = 10;
      
      component.onPageChange(2);
      
      expect(productServiceMock.getProducts).toHaveBeenCalledWith(
        2,
        expect.any(Number),
        expect.any(String)
      );
    });

    it('should handle items per page change', () => {
      component.onItemsPerPageChange(5);
      
      expect(component.itemsPerPage).toBe(5);
      expect(productServiceMock.getProducts).toHaveBeenCalled();
    });

    it('should handle sort direction change', () => {
      component.onSortDirectionChange(SortDirection.DESC);
      
      expect(component.sortDirection).toBe(SortDirection.DESC);
      expect(productServiceMock.getProducts).toHaveBeenCalled();
    });
  });

  describe('Form control getters', () => {
    it('should get brand form control', () => {
      const control = new FormControl();
      
      const result = component.getFormControlBrandId(control);
      
      expect(result).toBeInstanceOf(FormControl);
    });

    it('should get category form control', () => {
      const control = new FormControl();
      
      const result = component.getFormControlCategoryId(control);
      
      expect(result).toBeInstanceOf(FormControl);
    });
  });

  describe('Getters', () => {
    it('should get categories names', () => {
      component.categories = mockCategories;
      
      expect(component.categoriesNames).toEqual(['Category 1', 'Category 2']);
    });

    it('should get categories ids', () => {
      component.categories = mockCategories;
      
      expect(component.categoriesId).toEqual([1, 2]);
    });

    it('should get brands names', () => {
      component.brands = mockBrands;
      
      expect(component.brandsNames).toEqual(['Brand 1', 'Brand 2']);
    });

    it('should get brands ids', () => {
      component.brands = mockBrands;
      
      expect(component.brandsId).toEqual([1, 2]);
    });
  });


  describe('Empty array getters', () => {
    it('should return empty array when categories is null for categoriesNames', () => {
      component.categories = [];
      expect(component.categoriesNames).toEqual([]);
    });

    it('should return empty array when categories is null for categoriesId', () => {
      component.categories = [];
      expect(component.categoriesId).toEqual([]);
    });

    it('should return empty array when brands is null for brandsNames', () => {
      component.brands = [];
      expect(component.brandsNames).toEqual([]);
    });

    it('should return empty array when brands is null for brandsId', () => {
      component.brands = [];
      expect(component.brandsId).toEqual([]);
    });
  });

  
  describe('onModalSupplySubmit validation', () => {
    it('should show warning message when there are missing required fields', () => {
      const mockFormData = {}; 
      const mockRequiredFields = [
        { name: 'price', label: 'Price' },
        { name: 'quantityTotal', label: 'Total Quantity' }
      ];
      
      
      component.onModalSupplySubmit(mockFormData);
      
      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        expect.any(String),
        ToastType.WARNING
      );
    });
  });

  
  describe('createProduct additional cases', () => {
    it('should show unexpected response message when status is not Created', () => {
      const mockProductData = {
        name: 'Test Product',
        description: 'Test Description',
        amount: 10,
        price: 100,
        brandId: 1,
        categoryId: [1]
      };

      productServiceMock.createProduct.mockReturnValue(
        of(new HttpResponse({ status: HttpStatusCode.Ok, body: mockProductData }))
      );

      component.createProduct(mockProductData);

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Unexpected response',
        ToastType.SUCCESS
      );
    });

    it('should show generic error message when error status is not in ERROR_MESSAGES_BY_CODE', () => {
      const mockProductData = {
        name: 'Test Product',
        description: 'Test Description',
        amount: 10,
        price: 100,
        brandId: 1,
        categoryId: [1]
      };

      productServiceMock.createProduct.mockReturnValue(
        throwError(() => ({ status: 999 })) 
      );

      component.createProduct(mockProductData);

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Error creating Product',
        ToastType.ERROR
      );
    });
  });

  
  describe('createSupply additional cases', () => {
    it('should show unexpected response message when status is not Created', () => {
      const mockSupplyData = {
        price: 100,
        quantityTotal: 10,
        quantityAvailable: 5,
        isAvailable: true,
        replenishmentDate: '2024-11-14',
        productId: 1
      };

      supplyServiceMock.createSupply.mockReturnValue(
        of(new HttpResponse({ status: HttpStatusCode.Ok, body: mockSupplyData }))
      );

      component.createSupply(mockSupplyData);

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Unexpected response',
        ToastType.SUCCESS
      );
    });

    it('should show generic error message when error status is not in SUPPLY_ERROR_MESSAGES_BY_CODE', () => {
      const mockSupplyData = {
        price: 100,
        quantityTotal: 10,
        quantityAvailable: 5,
        isAvailable: true,
        replenishmentDate: '2024-11-14',
        productId: 1
      };

      supplyServiceMock.createSupply.mockReturnValue(
        throwError(() => ({ status: 999 })) 
      );

      component.createSupply(mockSupplyData);

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(
        'Error creating Supply.',
        ToastType.ERROR
      );
    });
  });

  
});