import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a warehouse user with correct headers', () => {
    
    const mockUser: User = { name: 'John Doe', surName: 'John Doing', dni:'3245465', phone: '3192621110', birthDate: new Date('2002-04-17'), email: 'john.doe@example.com', password: 'string' }; 
    const url = `${environment.user_base_path}${environment.user_controller}${environment.user_post_warehouse}`;
    const headers = {
      Authorization: `Bearer ${environment.auth_token}`,
      'Content-Type': 'application/json',
    };

   
    service.createWarehouseUser(mockUser).subscribe((response) => {
      expect(response.body).toEqual(mockUser); 
    });

   
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(headers.Authorization);
    expect(req.request.headers.get('Content-Type')).toBe(headers['Content-Type']);
    expect(req.request.body).toEqual(mockUser);

    req.flush(mockUser); 
  });
});
