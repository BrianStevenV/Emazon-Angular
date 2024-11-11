import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, ProductPaginator } from '../../models/product.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pagination, SortDirection } from '../../models/paginator.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a product', () => {
    const mockProduct: Product = { name: 'Test', description: 'Test', amount: 1, price: 1, brandId: 1, categoryId: [1] }; 
    const mockResponse = new HttpHeaders({
      Authorization: `Bearer ${environment.auth_token}`,
      'Content-Type': 'application/json'
    });

    service.createProduct(mockProduct).subscribe(response => {
      expect(response.body).toEqual(mockProduct);
      expect(response.status).toBe(201); 
    });

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.product_controller}${environment.product_post_create}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockProduct, { status: 201, statusText: 'Created' });
  });

  it('should send a GET request and map data successfully', async () => {
    const pageNumber = 1;
    const pageSize = 10;
    const sortBy = SortDirection.ASC;

    const mockResponse: Pagination<ProductPaginator> = {
      pageNumber,
      pageSize,
      totalElements: 2,
      totalPages: 1,
      content: [
        {
          name: 'Product 1',
          description: 'Description 1',
          amount: 10,
          price: 100,
          brand: { id: 1, name: 'Brand A', description: 'Brand A' },
          categories: [{ id: 1, name: 'Category X' }],
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          amount: 5,
          price: 50,
          brand: { id: 2, name: 'Brand B', description: 'Brand B' },
          categories: [{ id: 2, name: 'Category Y' }],
        },
      ],
    };

    service.getProducts(1, 10, 'ASC').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.content.length).toBe(2);
      expect(result.content[0]).toEqual({
        name: 'Product 1',
        description: 'Description 1',
        amount: 10,
        price: 100,
        brand: 'Brand A',
        category: ['Category X'],
      });
      expect(result.content[1]).toEqual({
        name: 'Product 2',
        description: 'Description 2',
        amount: 5,
        price: 50,
        brand: 'Brand B',
        category: ['Category Y'],
      });
    });

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.product_controller}${environment.product_get_pagination}?sortDirectionRequestDto=${sortBy}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle pagination and return the correct page data', (done) => {
    const pageNumber = 2;
    const pageSize = 5;
    const sortBy = SortDirection.DESC;
    const mockPaginatedResponse: Pagination<ProductPaginator> = {
      pageNumber,
      pageSize,
      totalElements: 20,
      totalPages: 4,
      content: [
        {
          name: 'Product 3',
          description: 'Description 3',
          amount: 12,
          price: 200,
          brand: { id: 3, name: 'Brand C', description: 'Brand C' },
          categories: [{ id: 3, name: 'Category Z' }],
        },
      ],
    };

    service.getProducts(pageNumber, pageSize, 'DESC').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.pageNumber).toBe(pageNumber);
      expect(result.pageSize).toBe(pageSize);
      expect(result.totalElements).toBe(20);
      expect(result.totalPages).toBe(4);
      expect(result.content.length).toBe(1);
      done();
    });

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.product_controller}${environment.product_get_pagination}?sortDirectionRequestDto=${sortBy}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedResponse);
  });

});
