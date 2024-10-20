import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = `${environment.stock_base_path}${environment.category_controller}${environment.category_post_create}`;
  private readonly jwtToken = `${environment.auth_token}`;

  constructor(private readonly http: HttpClient) { }

  createCategory( category: Category): Observable<HttpResponse<Category>>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>(this.url, category, {
      headers,
      observe: 'response',
    })
  }
}
