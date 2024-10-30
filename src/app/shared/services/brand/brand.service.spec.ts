import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { Brand } from '../../models/brand.model';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'zone.js/testing';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  const mockBrand: Brand = {
    name: 'Test Brand',
    description: 'Description of test brand'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a brand and return a response', () => {
    service.createBrand(mockBrand).subscribe((response: HttpResponse<Brand>) => {
      expect(response.status).toEqual(201);
      expect(response.body).toEqual(mockBrand);
    });

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.brand_controller}${environment.brand_post_create}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toContain(`Bearer ${environment.auth_token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockBrand, { status: 201, statusText: 'Created' });
  });

  it('should handle error response', () => {
    const errorMessage = 'An error occurred';

    service.createBrand(mockBrand).subscribe(
      () => fail('expected an error, not a brand'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.brand_controller}${environment.brand_post_create}`);
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
