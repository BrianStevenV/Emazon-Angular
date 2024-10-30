import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly url = `${environment.stock_base_path}${environment.brand_controller}`;
  private readonly jwtToken = `${environment.auth_token}`;

  constructor(private readonly http: HttpClient) { }

  createBrand( brand: Brand ): Observable<HttpResponse<Brand>>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Brand>(this.url + environment.brand_post_create, brand, {
      headers,
      observe: 'response',
    })
  }
}
