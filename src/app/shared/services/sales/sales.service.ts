import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private readonly url = `${environment.supply_base_path}${environment.sales_controller}`;

  private headers = AuthMethodsUtils.createAuthHeaders();
   
  constructor(private readonly http: HttpClient) { }

  buyCart(): Observable<string> {
    const headers = this.headers;

    return this.http.post<string>(this.url + environment.sales_post_buy_cart, {
      headers,
      observe: 'response',
    });
  }
}
