import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supply } from '../../models/supply.model';
import { Observable } from 'rxjs';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  private readonly url = `${environment.supply_base_path}${environment.supply_controller}`;
  
  private headers = AuthMethodsUtils.createAuthHeaders();

  constructor(private readonly http: HttpClient) { }

  createSupply(supply: Supply): Observable<HttpResponse<Supply>>{
    const headers = this.headers;

    return this.http.post<Supply>(this.url + environment.supply_post_add, supply, {
      headers,
      observe: 'response',
    })
  }
}
