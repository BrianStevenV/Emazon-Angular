import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryResponse, Pagination } from '../../models/category.model';
import { SERVICES_GET_CATEGORIES_SORT_DIRECTION, SERVICES_GET_CATEGORIES_PAGE_NUMBER, SERVICES_GET_CATEGORIES_PAGE_SIZE } from '../../constants/category/category.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = `${environment.stock_base_path}${environment.category_controller}`;
  private readonly jwtToken = `${environment.auth_token}`;

  constructor(private readonly http: HttpClient) { }

  createCategory( category: Category): Observable<HttpResponse<Category>>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>(this.url + environment.category_post_create, category, {
      headers,
      observe: 'response',
    })
  }

  getCategories(pageNumber: number, pageSize: number ,sortBy: string): Observable<Pagination<CategoryResponse>>{

    let params = new HttpParams()
    .set(SERVICES_GET_CATEGORIES_SORT_DIRECTION, sortBy)
    .set(SERVICES_GET_CATEGORIES_PAGE_NUMBER, pageNumber.toString())
    .set(SERVICES_GET_CATEGORIES_PAGE_SIZE, pageSize.toString());


    return this.http.get<Pagination<CategoryResponse>>(this.url + environment.category_get_pagination, { params }).pipe(
      map(( response: Pagination<CategoryResponse>) => ({
        ...response,
        content: response.content.map((category) => ({
          ...category,
          name: category.name,
          description: category.description
        }))
      }))
    )
  }
}
