import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url = `${environment.stock_base_path}${environment.product_controller}`;
  private readonly jwtToken = `${environment.auth_token}`;

  constructor(private readonly http: HttpClient) { }

  createProduct(product: Product): Observable<HttpResponse<Product>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>(this.url + environment.product_post_create, product, {
      headers,
      observe: 'response',
    });
  }
}
