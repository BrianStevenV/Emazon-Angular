import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PRODUCT_DETAILS } from 'src/app/core/constants/routing.constants';
import { DEFAULT_AMOUNT_CART_DETAILS_PAGE_HOME, LOCAL_STORAGE_CART_NAME, PRODUCT_ADD_TO_CART_MESSAGE } from 'src/app/shared/constants/cart/cart.constants';
import { BUTTON_ADD_TO_CART_NAME, BUTTON_ADD_TO_CART_TYPE, BUTTON_VIEW_DETAILS_NAME, BUTTON_VIEW_DETAILS_TYPE, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, ERROR_SHOW_TOAST_MESSAGE_EXCEPTION } from 'src/app/shared/constants/home/home.constants';
import { AddProductToCartRequestDto, CartDetailsRequestDto, OperationTypeRequestDto } from 'src/app/shared/models/cart.model';
import { ProductPaginator } from 'src/app/shared/models/product.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CartMethodsUtils } from 'src/app/shared/utils/cart.methods.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cardInfoProducts !: any[];
  products !: ProductPaginator[];

  buttonAddToCartName = BUTTON_ADD_TO_CART_NAME;
  buttonAddToCartType = BUTTON_ADD_TO_CART_TYPE;

  buttonViewDetailsName = BUTTON_VIEW_DETAILS_NAME;
  buttonViewDetailsType = BUTTON_VIEW_DETAILS_TYPE;

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadFeed();
  }


  loadFeed(
    page: number = DEFAULT_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    sortBy: string = DEFAULT_SORT_BY,
  ) : void{
    this.productService.getProducts(page, size, sortBy).subscribe({
      next: (response) => {
        this.products = response.content;
        this.cardInfoProducts = this.products.map(({ name, price, id }) => [ name || 'N/A', price || 'N/A', id || 'N/A',]);
        console.log(this.cardInfoProducts);
      },
      error: (error) => {

        this.toastService.showToast(ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, ToastType.ERROR)
      }
    })
  }

  onViewDetails(productId: number): void {
    console.log(`View details for product with id: ${productId}`);
    this.productService.getProductById(productId);
    this.router.navigate([`/${ROUTE_PRODUCT_DETAILS}`, productId]);
  }

  
  onAddToCart(productName: string, productPrice: number, productId: number): void {
    this.postDataToCart(productId, productName, productPrice);
  }
  
  private postDataToCart(productId: number, productName: string, productPrice: number): void {
    const addProductToCart = this.createAddToCartObject(productId);
  
    this.cartService.addProductToCart(addProductToCart).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.handleCartStorage(productName, productPrice);
        } else {
          this.toastService.showToast(`Failed to add "${productName}" to cart. Please try again.`, ToastType.ERROR);
        }
      },
      error: (error) => {
        this.toastService.showToast(`Error occurred: ${error.message}`, ToastType.ERROR);
      }
    });
  }
  
  private handleCartStorage(productName: string, productPrice: number): void {
    const cartStorage = CartMethodsUtils.cartStorage(LOCAL_STORAGE_CART_NAME);
    const parsed = cartStorage ? JSON.parse(cartStorage) : [];
  
    const existingProduct = parsed.find((product: any) => product.name === productName);
  
    if (existingProduct) {
      this.toastService.showToast(`Product "${productName}" is already in your cart. Please review your cart to manage.`, ToastType.WARNING);
    } else {
      const productToAdd = { name: productName, price: productPrice };
      parsed.push(productToAdd);
      localStorage.setItem(LOCAL_STORAGE_CART_NAME, JSON.stringify(parsed));
      this.toastService.showToast(PRODUCT_ADD_TO_CART_MESSAGE, ToastType.SUCCESS);
    }
  }
  

  private createAddToCartObject(productId: number): AddProductToCartRequestDto {
    const cartDetailsRequestDto: CartDetailsRequestDto = {
      amount: DEFAULT_AMOUNT_CART_DETAILS_PAGE_HOME,
      productId: productId
    }

    const operationTypeRequestDto = OperationTypeRequestDto.ADD;

    const addToProductToCart: AddProductToCartRequestDto = {
      cartDetailsRequestDto: cartDetailsRequestDto,
      operationTypeRequestDto: operationTypeRequestDto
    }

    return addToProductToCart;
  }
  
}
