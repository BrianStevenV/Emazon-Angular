import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../../models/category.model';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'zone.js/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockCategory: Category = {
    name: 'Test Category',
    description: 'Description of test category'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category and return a response', () => {
    service.createCategory(mockCategory).subscribe((response: HttpResponse<Category>) => {
      expect(response.status).toEqual(201); 
      expect(response.body).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.category_controller}${environment.category_post_create}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toContain(`Bearer ${environment.auth_token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockCategory, { status: 201, statusText: 'Created' }); 
  });

  it('should handle error response', () => {
    const errorMessage = 'An error occurred';

    service.createCategory(mockCategory).subscribe(
      () => fail('expected an error, not a category'),
      (error) => {
        expect(error.status).toBe(400); 
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.stock_base_path}${environment.category_controller}${environment.category_post_create}`);
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' }); 
  });
});
