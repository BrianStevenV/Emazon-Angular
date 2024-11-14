
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductComponent } from './product.component';
// import { ProductService } from 'src/app/shared/services/product/product.service';
// import { CategoryService } from 'src/app/shared/services/category/category.service';
// import { BrandService } from 'src/app/shared/services/brand/brand.service';
// import { ToastService } from 'src/app/shared/services/toast/toast.service';
// import { of, throwError } from 'rxjs';
// import { HttpResponse, HttpStatusCode } from '@angular/common/http';
// import { CategoryResponse } from 'src/app/shared/models/category.model';
// import { BrandResponse } from 'src/app/shared/models/brand.model';
// import { FormControl } from '@angular/forms';
// import { SortDirection } from 'src/app/shared/models/paginator.model';
// import { ToastType } from 'src/app/shared/models/toast.model';
// import { ERROR_MESSAGES_BY_CODE, ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, GENERIC_ERROR_MESSAGE, SUCCESS_MESSAGES_POST } from 'src/app/shared/constants/product/product.constants';
// import { Product } from 'src/app/shared/models/product.model';

// describe('ProductComponent Additional Tests', () => {
//   let component: ProductComponent;
//   let fixture: ComponentFixture<ProductComponent>;
//   let productService: jest.Mocked<ProductService>;
//   let categoryService: jest.Mocked<CategoryService>;
//   let brandService: jest.Mocked<BrandService>;
//   let toastService: jest.Mocked<ToastService>;

//   const mockCategories: CategoryResponse[] = [
//     { id: 1, name: 'Category1', description: 'Category1' },
//     { id: 2, name: 'Category2', description: 'Category2' }
//   ];
//   const mockBrands: BrandResponse[] = [
//     { id: 1, name: 'Brand1', description: 'Brand1' },
//     { id: 2, name: 'Brand2', description: 'Brand2' }
//   ];

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ProductComponent],
//       providers: [
//         {
//           provide: ProductService,
//           useValue: {
//             createProduct: jest.fn(),
//             getProducts: jest.fn().mockReturnValue(of({
//               totalElements: 10,
//               pageSize: 5,
//               content: []
//             }))
//           }
//         },
//         { provide: CategoryService, useValue: { getAllCategories: jest.fn() } },
//         { provide: BrandService, useValue: { getAllBrands: jest.fn() } },
//         { provide: ToastService, useValue: { showToast: jest.fn() } },
//       ],
//     }).compileComponents();
  
//     fixture = TestBed.createComponent(ProductComponent);
//     component = fixture.componentInstance;
//     productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
//     categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
//     brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
//     toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
  
//     categoryService.getAllCategories.mockReturnValue(of(mockCategories));
//     brandService.getAllBrands.mockReturnValue(of(mockBrands));
  
//     fixture.detectChanges();
//   });
  
//   describe('Getters', () => {
//     it('should return empty arrays when categories/brands are undefined', () => {
//       component.categories = undefined as any;
//       component.brands = undefined as any;
      
//       expect(component.categoriesNames).toEqual([]);
//       expect(component.categoriesId).toEqual([]);
//       expect(component.brandsNames).toEqual([]);
//       expect(component.brandsId).toEqual([]);
//     });

//     it('should return correct arrays when categories/brands are defined', () => {
//       component.categories = mockCategories;
//       component.brands = mockBrands;

//       expect(component.categoriesNames).toEqual(['Category1', 'Category2']);
//       expect(component.categoriesId).toEqual([1, 2]);
//       expect(component.brandsNames).toEqual(['Brand1', 'Brand2']);
//       expect(component.brandsId).toEqual([1, 2]);
//     });
//   });

//   describe('Form Control Getters', () => {
//     it('should return brand form control', () => {
//       const mockFormControl = new FormControl();
//       expect(component.getFormControlBrandId(mockFormControl)).toBeTruthy();
//     });

//     it('should return category form control', () => {
//       const mockFormControl = new FormControl();
//       expect(component.getFormControlCategoryId(mockFormControl)).toBeTruthy();
//     });
//   });

//   describe('Brand Selection', () => {
//     it('should select brand when below max selection', () => {
//       component.selectBrand(mockBrands[0]);
//       expect(component.selectedBrands).toContain(mockBrands[0]);
//     });

//     it('should not add duplicate brand', () => {
//       component.selectBrand(mockBrands[0]);
//       component.selectBrand(mockBrands[0]);
//       expect(component.selectedBrands.length).toBe(1);
//     });

//     it('should remove brand correctly', () => {
//       component.selectBrand(mockBrands[0]);
//       component.removeBrand(mockBrands[0]);
//       expect(component.selectedBrands).not.toContain(mockBrands[0]);
//     });
//   });

//   describe('Data Loading Error Handling', () => {
//     it('should handle error when loading categories', () => {
//       categoryService.getAllCategories.mockReturnValue(throwError(() => ({ status: HttpStatusCode.InternalServerError })));
//       component.loadCategories();
//       expect(toastService.showToast).toHaveBeenCalled();
//     });

//     it('should handle error when loading brands', () => {
//       brandService.getAllBrands.mockReturnValue(throwError(() => ({ status: HttpStatusCode.InternalServerError })));
//       component.loadBrands();
//       expect(toastService.showToast).toHaveBeenCalled();
//     });
//   });

//   describe('Form Submission Edge Cases', () => {
//     it('should handle form submission with empty string values', () => {
//       const formData = {
//         name: '   ',
//         description: '   ',
//         amount: 100,
//         price: 200
//       };
//       component.onModalSubmit(formData);
//       expect(toastService.showToast).toHaveBeenCalled();
//     });

//     it('should handle form submission with missing properties', () => {
//       const formData = {};
//       component.onModalSubmit(formData);
//       expect(toastService.showToast).toHaveBeenCalled();
//     });

//     it('should handle product creation with no selected brand', () => {
//       const formData = {
//         name: 'Product1',
//         description: 'Description',
//         amount: 100,
//         price: 200
//       };
//       component.selectedCategories = [mockCategories[0]];
//       component.selectedBrands = [];
      
//       productService.createProduct.mockReturnValue(of(new HttpResponse<any>({ status: HttpStatusCode.Created })));
      
//       component.onModalSubmit(formData);
//       expect(productService.createProduct).toHaveBeenCalledWith(expect.objectContaining({
//         brandId: null
//       }));
//     });

//     it('should handle unexpected success response code', () => {
//       const formData = {
//         name: 'Product1',
//         description: 'Description',
//         amount: 100,
//         price: 200
//       };
//       component.selectedCategories = [mockCategories[0]];
//       component.selectedBrands = [mockBrands[0]];
      
//       productService.createProduct.mockReturnValue(of(new HttpResponse<any>({ status: HttpStatusCode.Ok })));
      
//       component.onModalSubmit(formData);
//       expect(toastService.showToast).toHaveBeenCalled();
//     });
//   });

//   describe('Selection Handling', () => {
//     it('should handle removing the last category', () => {
//       component.selectCategory(mockCategories[0]);
//       expect(component.selectedCategories.length).toBe(1);
//       component.removeCategory(mockCategories[0]);
//       expect(component.selectedCategories.length).toBe(0);
//     });

//     it('should initialize filtered lists correctly', () => {
//       expect(component.filteredCategories).toEqual(mockCategories);
//       expect(component.filteredBrands).toEqual(mockBrands);
//     });
//   });




//   it('should handle page change at maximum total items', () => {
//     const totalPages = Math.ceil(component.totalItems / component.itemsPerPage);
    
//     component.onPageChange(totalPages);
    
//     expect(component.currentPage).toBe(totalPages);
//     expect(productService.getProducts).toHaveBeenCalledWith(
//       totalPages,
//       component.itemsPerPage,
//       component.sortDirection
//     );
//   });
  
//   it('should handle page change beyond maximum total items', () => {
    
//     component.totalItems = 10;
//     component.itemsPerPage = 5;
//     component.currentPage = 2;
    
//     const totalPages = Math.ceil(component.totalItems / component.itemsPerPage);
//     const invalidPage = totalPages;
//     const currentPage = component.currentPage;
    
//     jest.clearAllMocks();
    
//     component.onPageChange(invalidPage);
    
//     expect(component.currentPage).toBe(2); 
//   });

//   it('should handle invalid page size when changing items per page', () => {
    
//     component.itemsPerPage = 5;
//     const invalidSize = -1;
    
    
//     jest.clearAllMocks();
    
//     component.onItemsPerPageChange(invalidSize);
    
    
//     expect(component.itemsPerPage).toBe(5); 
    
//   });

//   it('should change sort direction and reload Products', () => {
//     const newDirection = SortDirection.DESC;
//     component.currentPage = 0;
//     component.itemsPerPage = 5;

//     component.onSortDirectionChange(newDirection);

//     expect(component.sortDirection).toBe(newDirection);
//     expect(productService.getProducts).toHaveBeenCalledWith(
//       component.currentPage, 
//       component.itemsPerPage, 
//       newDirection
//     );
// });

// it('should change items per page and reload Products', () => {
//     const newSize = 20;
//     component.currentPage = 0;
//     component.sortDirection = SortDirection.ASC;

//     component.onItemsPerPageChange(newSize);

//     expect(productService.getProducts).toHaveBeenCalledWith(
//       component.currentPage, 
//       newSize, 
//       component.sortDirection
//     );
// });

//   it('should not change page if new page is invalid', () => {
//     const currentPage = component.currentPage;
//     component.onPageChange(-1);

//     expect(component.currentPage).toBe(currentPage);
//   });

//   it('should change page and reload Products', () => {
//     const newPage = 2;
//     component.onPageChange(newPage);

//     expect(component.currentPage).toBe(newPage);
//     expect(productService.getProducts).toHaveBeenCalledWith(
//       newPage, 
//       component.itemsPerPage, 
//       component.sortDirection
//     );
//   });

//   it('should handle error when loading Products', () => {
//     productService.getProducts.mockReturnValue(throwError(() => new Error()));
    
//     component.loadProducts();

//     expect(toastService.showToast).toHaveBeenCalledWith(
//       ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, 
//       ToastType.ERROR
//     );
//   });

//   it('should open the modal', () => {
//     component.openModal();
//     expect(component.modalVisible).toBe(true);
//   });

//   it('should close the modal', () => {
//     component.closeModal();
//     expect(component.modalVisible).toBe(false);
//   });

  

//   describe('createProduct', () => {
//     it('should show success message when product is created successfully', () => {
//       const productData = { name: 'Test Product', description: 'Description', amount: 10, price: 100, brandId: 1, categoryId: [1] };
//       const successResponse = new HttpResponse<Product>({ status: HttpStatusCode.Created });
//       productService.createProduct.mockReturnValue(of(successResponse));
  
//       component.createProduct(productData);
  
//       expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.PRODUCT_CREATED, ToastType.SUCCESS);
//     });
  
//     it('should show unexpected response success message when response status is not 201 Created', () => {
//       const productData = { name: 'Test Product', description: 'Description', amount: 10, price: 100, brandId: 1, categoryId: [1] };
//       const unexpectedResponse = new HttpResponse<Product>({ status: HttpStatusCode.Ok });
//       productService.createProduct.mockReturnValue(of(unexpectedResponse));
  
//       component.createProduct(productData);
  
//       expect(toastService.showToast).toHaveBeenCalledWith(SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE, ToastType.SUCCESS);
//     });
  
//     it('should show specific error message when error status matches a predefined error code', () => {
//       const productData = { name: 'Test Product', description: 'Description', amount: 10, price: 100, brandId: 1, categoryId: [1] };
//       const errorResponse = { status: HttpStatusCode.InternalServerError };
//       productService.createProduct.mockReturnValue(throwError(() => errorResponse));
  
//       component.createProduct(productData);
  
//       const expectedErrorMessage = ERROR_MESSAGES_BY_CODE[HttpStatusCode.InternalServerError];
//       expect(toastService.showToast).toHaveBeenCalledWith(expectedErrorMessage, ToastType.ERROR);
//     });
  
//     it('should show generic error message when error status does not match predefined error codes', () => {
//       const productData = { name: 'Test Product', description: 'Description', amount: 10, price: 100, brandId: 1, categoryId: [1] };
//       const errorResponse = { status: 999 }; // Unhandled error status
//       productService.createProduct.mockReturnValue(throwError(() => errorResponse));
  
//       component.createProduct(productData);
  
//       expect(toastService.showToast).toHaveBeenCalledWith(GENERIC_ERROR_MESSAGE, ToastType.ERROR);
//     });
  
//     it('should log product data in console when an error occurs', () => {
//       const productData = { name: 'Test Product', description: 'Description', amount: 10, price: 100, brandId: 1, categoryId: [1] };
//       const errorResponse = { status: HttpStatusCode.BadRequest };
//       productService.createProduct.mockReturnValue(throwError(() => errorResponse));
//       console.log = jest.fn();
  
//       component.createProduct(productData);
  
//       expect(console.log).toHaveBeenCalledWith(`From product data: ${productData}`);
//     });
//   });
  




//   describe('loadProducts', () => {
//     const mockProducts = [
//       {
//         name: 'Product A',
//         description: 'Description A',
//         amount: 5,
//         price: 100,
//         brand: { name: 'Brand A' },
//         categories: [{ name: 'Category A' }, { name: 'Category B' }]
//       },
//       {
//         name: null,
//         description: undefined,
//         amount: null,
//         price: undefined,
//         brand: { name: null },
//         categories: []
//       }
//     ];
  
//     let response: any;
  
//     beforeEach(() => {
//       jest.clearAllMocks();
//       response = {
//         totalElements: 2,
//         pageSize: 2,
//         content: mockProducts
//       };
//     });
  
//     it('should load products with correct table data transformation', () => {
//       productService.getProducts.mockReturnValue(of(response));
  
//       component.loadProducts();
  
//       const expectedTableData = [
//         ['Product A', 'Description A', 5, 100, 'Brand A', 'Category A, Category B'],
//         ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']
//       ];
  
//       expect(component.tableData).toEqual(expectedTableData);
//       expect(component.totalItems).toBe(2);
//       expect(component.itemsPerPage).toBe(2);
//     });
  
//     it('should show toast message when there is an error loading products', () => {
//       productService.getProducts.mockReturnValue(throwError(() => new Error('Network Error')));
  
//       component.loadProducts();
  
//       expect(toastService.showToast).toHaveBeenCalledWith(ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, ToastType.ERROR);
//     });
  
//     it('should map name to "N/A" when product name is null or undefined', () => {
//       const productsWithNullName = [{ ...mockProducts[0], name: null }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithNullName }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][0]).toBe('N/A');
//     });
  
//     it('should map description to "N/A" when product description is null or undefined', () => {
//       const productsWithNullDescription = [{ ...mockProducts[0], description: null }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithNullDescription }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][1]).toBe('N/A');
//     });
  
//     it('should map amount to "N/A" when product amount is null or undefined', () => {
//       const productsWithNullAmount = [{ ...mockProducts[0], amount: null }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithNullAmount }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][2]).toBe('N/A');
//     });
  
//     it('should map price to "N/A" when product price is null or undefined', () => {
//       const productsWithNullPrice = [{ ...mockProducts[0], price: null }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithNullPrice }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][3]).toBe('N/A');
//     });
  
//     it('should map brand name to "N/A" when brand name is null or undefined', () => {
//       const productsWithNullBrandName = [{ ...mockProducts[0], brand: { name: null } }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithNullBrandName }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][4]).toBe('N/A');
//     });
  
//     it('should map categories to "N/A" when categories are empty', () => {
//       const productsWithEmptyCategories = [{ ...mockProducts[0], categories: [] }];
//       productService.getProducts.mockReturnValue(of({ ...response, content: productsWithEmptyCategories }));
  
//       component.loadProducts();
  
//       expect(component.tableData[0][5]).toBe('N/A');
//     });
//   });
  
  
// });



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
});