import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supply } from '../../models/supply.model';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_TOKEN_AUTH_NAME } from '../../constants/auth/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  private readonly url = `${environment.supply_base_path}${environment.supply_controller}`;
  
  private getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
  }

  constructor(private readonly http: HttpClient) { }

  createSupply(supply: Supply): Observable<HttpResponse<Supply>>{
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Supply>(this.url + environment.supply_post_add, supply, {
      headers,
      observe: 'response',
    })
  }
}
