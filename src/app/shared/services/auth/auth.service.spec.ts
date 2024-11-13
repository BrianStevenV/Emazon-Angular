import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Login, TokenResponse } from '../../models/login.model';
import { LOCAL_STORAGE_TOKEN_AUTH_NAME, NAVIGATE_LOG_OUT_PATH } from '../../constants/auth/auth.constants';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: Router;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logIn', () => {
    it('should store the token in local storage and set role', () => {
      const loginData = { email: 'user@example.com', password: 'password' };
      const login: Login = loginData;
      const tokenResponse: TokenResponse = { token: 'valid.mock.token' };

      service.logIn(login).subscribe(response => {
        expect(response).toEqual(tokenResponse);
        expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME)).toBe('valid.mock.token');
        expect(service['role']).toBe('fake-role');  
      });

      const req = httpMock.expectOne(`${service['url']}`);
      expect(req.request.method).toBe('POST');
      req.flush(tokenResponse);
    });

    it('should handle error response', () => {
      const loginData = { email: 'user@example.com', password: 'password' };
      const login: Login = loginData;

      service.logIn(login).subscribe(response => {
        expect(response).toBeInstanceOf(Error);
      });

      const req = httpMock.expectOne(`${service['url']}`);
      req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logOut', () => {
    it('should remove token and navigate to login', () => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, 'valid.mock.token');
      service.logOut();

      expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME)).toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith([NAVIGATE_LOG_OUT_PATH]);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token is in localStorage', () => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, 'valid.mock.token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if token is not in localStorage', () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getRole', () => {
    it('should return role from decoded token if token exists', () => {
      const validMockToken = 'header.payload.signature'; 
      localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, validMockToken);

      service['role'] = 'fake-role'; 

      const role = service.getRole();
      expect(role).toBe('fake-role');
    });

    it('should return undefined if no token in localStorage', () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
      expect(service.getRole()).toBeUndefined();
    });
  });
});

