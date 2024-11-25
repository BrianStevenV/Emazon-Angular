import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductPaginator } from '../../models/product.model';
import { map, Observable } from 'rxjs';
import { Pagination } from '../../models/paginator.model';
import { SERVICES_GET_PRODUCT_SORT_DIRECTION, SERVICES_GET_PRODUCT_PAGE_NUMBER, SERVICES_GET_PRODUCT_PAGE_SIZE } from '../../constants/product/product.constants';
import { AuthMethodsUtils } from '../../utils/auth.methods.utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public readonly url = `${environment.stock_base_path}${environment.product_controller}`;


  constructor(private readonly http: HttpClient) { }

  createProduct(product: Product): Observable<HttpResponse<Product>> {
    const headers = AuthMethodsUtils.createAuthHeaders();
    return this.http.post<Product>(this.url + environment.product_post_create, product, {
      headers,
      observe: 'response',
    });
  }

  getProducts(pageNumber: number, pageSize: number, sortBy: string): Observable<Pagination<ProductPaginator>>{
    const headers = AuthMethodsUtils.createAuthHeaders();
    
    let params = new HttpParams()
      .set(SERVICES_GET_PRODUCT_SORT_DIRECTION, sortBy)
      .set(SERVICES_GET_PRODUCT_PAGE_NUMBER, pageNumber.toString())
      .set(SERVICES_GET_PRODUCT_PAGE_SIZE, pageSize.toString());

    return this.http.get<Pagination<ProductPaginator>>(this.url + environment.product_get_pagination, { params }).pipe(
      map((response: Pagination<ProductPaginator>) => ({
        ...response,
        content: response.content.map((product) => ({
          ...product,
          name: product.name,
          description: product.description,
          amount: product.amount,
          price: product.price,
          brand: product.brand,
          category: product.categories,
        }))
      }))
    )
  }

  getProductById(productId: number): Observable<ProductPaginator> {
    const headers = AuthMethodsUtils.createAuthHeaders();
    return this.http.get<ProductPaginator>(this.url + environment.product_get_one_product + '/' + productId, { headers });
  }
}
