import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url  = `${environment.user_base_path}${environment.user_controller}`;
  

  constructor(private readonly http: HttpClient) { }

  createWarehouseUser(user: User){
    const headers = AuthMethodsUtils.createAuthHeaders();

    return this.http.post<User>(this.url + environment.user_post_warehouse, user, {
      headers,
      observe: 'response',
    });
  }

  createCustomerUser(user: User){
    return this.http.post<User>(this.url + environment.user_post_customer, user, {
      observe: 'response',
    });
  }
  
}
