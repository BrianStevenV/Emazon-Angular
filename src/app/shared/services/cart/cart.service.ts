import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';
import { Observable } from 'rxjs';
import { AddProductToCartRequestDto } from '../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly url = `${environment.cart_base_path}${environment.cart_controller}`;

  private headers = AuthMethodsUtils.createAuthHeaders();

  constructor(private readonly http: HttpClient) { }

  addProductToCart(cartDetails: AddProductToCartRequestDto): Observable<HttpResponse<AddProductToCartRequestDto>> {
    const headers = this.headers;
    console.log(cartDetails);
    console.log(headers);
    return this.http.post<AddProductToCartRequestDto>(this.url + environment.cart_post_add, cartDetails, {
      headers,
      observe: 'response',
    })
    
  }
}
