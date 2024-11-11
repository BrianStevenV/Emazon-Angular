import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, BrandResponse } from '../../models/brand.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../models/paginator.model';
import { SERVICES_GET_BRAND_SORT_DIRECTION, SERVICES_GET_BRAND_PAGE_NUMBER, SERVICES_GET_BRAND_PAGE_SIZE } from '../../constants/brand/brand.constants';

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

  getBrands(pageNumber: number, pageSize: number, sortBy: string): Observable<Pagination<BrandResponse>>{
      
      let params = new HttpParams()
      .set(SERVICES_GET_BRAND_SORT_DIRECTION, sortBy)
      .set(SERVICES_GET_BRAND_PAGE_NUMBER, pageNumber.toString())
      .set(SERVICES_GET_BRAND_PAGE_SIZE, pageSize.toString());
  
      return this.http.get<Pagination<BrandResponse>>(this.url + environment.brand_get_pagination, { params }).pipe(
        map(( response: Pagination<BrandResponse>) => ({
          ...response,
          content: response.content.map((brand) => ({
            ...brand,
            name: brand.name,
            description: brand.description
          }))
        }))
      )
  }

  getAllBrands(): Observable<BrandResponse[]>{
    return this.http.get<BrandResponse[]>(this.url + environment.brand_get_all_brands);
  }
}
