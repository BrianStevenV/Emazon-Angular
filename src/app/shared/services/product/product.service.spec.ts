import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../../models/product.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
});
