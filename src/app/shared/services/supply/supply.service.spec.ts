import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { SupplyService } from './supply.service';
import { environment } from 'src/environments/environment';
import { Supply } from '../../models/supply.model';
import { LOCAL_STORAGE_TOKEN_AUTH_NAME } from '../../constants/auth/auth.constants';

describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService]
    });

    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createSupply', () => {
    it('should send a POST request with the correct headers and body', () => {
      const mockToken = 'test-token';
      const mockSupply: Supply = { 
        price: 100,
        quantityTotal: 10,
        quantityAvailable: 10,
        isAvailable: true,
        replenishmentDate: '2021-12-12',
        productId: 1
      };
      const mockResponse: HttpResponse<Supply> = new HttpResponse({
        body: mockSupply,
        status: 201,
        statusText: 'Created'
      });

      // Configura el token en el almacenamiento local para la prueba
      localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, mockToken);

      service.createSupply(mockSupply).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockSupply);
      });

      const req = httpMock.expectOne(`${environment.supply_base_path}${environment.supply_controller}${environment.supply_post_add}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(mockSupply);

      req.event(mockResponse);
    });
  });
});
