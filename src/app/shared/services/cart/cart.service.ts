import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';
import { map, Observable } from 'rxjs';
import { AddProductToCartRequestDto, CartDetailsResponseDto, CartPagination } from '../../models/cart.model';
import { SERVICES_GET_CART_DETAILS_SORT_DIRECTION, SERVICES_GET_CART_DETAILS_PAGE_NUMBER, SERVICES_GET_CART_DETAILS_PAGE_SIZE } from '../../constants/cart/cart.constants';

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

  getCartDetails(pageNUmber: number, pageSize: number, sortBy: string): Observable<CartPagination<CartDetailsResponseDto>> {
    const headers = this.headers;

    let params = new HttpParams()
    .set(SERVICES_GET_CART_DETAILS_SORT_DIRECTION, sortBy)
    .set(SERVICES_GET_CART_DETAILS_PAGE_NUMBER, pageNUmber.toString())
    .set(SERVICES_GET_CART_DETAILS_PAGE_SIZE, pageSize.toString());

    return this.http.get<CartPagination<CartDetailsResponseDto>>(this.url + environment.cart_get_pagination_cart, { params}).pipe(
      map(( response: CartPagination<CartDetailsResponseDto>) => ({
        ...response,
        content: response.content.map((cartDetail) => ({
          ...cartDetail,
          id: cartDetail.id,
          name: cartDetail.name,
          amountInStock: cartDetail.amountInStock,
          price: cartDetail.price,
          amountInCart: cartDetail.amountInCart,
          brandName: cartDetail.brandName,
          categoryNames: cartDetail.categoryNames,
          nextSupplyDate: cartDetail.nextSupplyDate,
          cartDetailsId: cartDetail.cartDetailsId
        })),
        subtotal: response.subtotal,
      }))
    )
  }
}
