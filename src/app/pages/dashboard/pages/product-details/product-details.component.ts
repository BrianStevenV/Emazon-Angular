import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PRODUCT_DETAILS } from 'src/app/core/constants/routing.constants';
import { DEFAULT_AMOUNT_CART_DETAILS_PAGE_HOME, LOCAL_STORAGE_CART_NAME, PRODUCT_ADD_TO_CART_MESSAGE } from 'src/app/shared/constants/cart/cart.constants';
import { BUTTON_ADD_TO_CART_NAME, BUTTON_ADD_TO_CART_TYPE } from 'src/app/shared/constants/home/home.constants';
import { BUTTON_ADD_FROM_AMOUNT_NAME, BUTTON_ADD_FROM_AMOUNT_TYPE, BUTTON_MAIN_ADD_TO_CART_NAME, BUTTON_MAIN_ADD_TO_CART_TYPE, BUTTON_SUBTRACT_FROM_AMOUNT_NAME, BUTTON_SUBTRACT_FROM_AMOUNT_TYPE, BUTTON_VIEW_DETAILS_NAME, BUTTON_VIEW_DETAILS_TYPE, DEFAULT_AMOUNT_COUNTER_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, VALIDATION_AMOUNT_COUNTER_INVALID } from 'src/app/shared/constants/product-details/product-details.constants';
import { AddProductToCartRequestDto, CartDetailsRequestDto, OperationTypeRequestDto } from 'src/app/shared/models/cart.model';
import { ProductPaginator } from 'src/app/shared/models/product.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CartMethodsUtils } from 'src/app/shared/utils/cart.methods.utils';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductPaginator;

  relatedProducts!: any[];
  moreProducts!: ProductPaginator[];
  relatedProductsRandom !: any[];
  
  
  buttonMainAddToCartName = BUTTON_MAIN_ADD_TO_CART_NAME;
  buttonMainAddToCartType = BUTTON_MAIN_ADD_TO_CART_TYPE;

  buttonAddAmountName = BUTTON_ADD_FROM_AMOUNT_NAME;
  buttonAddAmountType = BUTTON_ADD_FROM_AMOUNT_TYPE;

  buttonSubstractAmountName = BUTTON_SUBTRACT_FROM_AMOUNT_NAME;
  buttonSubstractAmountType = BUTTON_SUBTRACT_FROM_AMOUNT_TYPE;

  buttonAddToCartName = BUTTON_ADD_TO_CART_NAME;
  buttonAddToCartType = BUTTON_ADD_TO_CART_TYPE;

  buttonViewDetailsName = BUTTON_VIEW_DETAILS_NAME;
  buttonViewDetailsType = BUTTON_VIEW_DETAILS_TYPE;

  defaultAmountCount = DEFAULT_AMOUNT_COUNTER_NUMBER;


  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAllInformations(productId);
  }

  loadProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response;
        console.log('products: ', this.relatedProducts);
        setTimeout(() => {
          this.selectRandomProducts();
        }, 0.1);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  selectRandomProducts(): void {
    console.log('RelatedProducts: ',this.relatedProducts);
    const shuffled = [...this.relatedProducts].sort(() => Math.random() - 0.5);  
    this.relatedProductsRandom = shuffled.slice(0, 4);  
    console.log('selectRandomProducts',this.relatedProductsRandom);
    console.log('shuffle ', shuffled);
  }

  onAddMainToCart(amount: number, productId: number): void {
    const addProductToCart = this.createAddMainToCartObject(amount, productId);
    const findProduct = this.relatedProducts.find((product) => product.id === productId);

    this.cartService.addProductToCart(addProductToCart).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.handleCartStorage(findProduct.name, findProduct.price);
        } else {
          this.toastService.showToast(`Failed to add "${findProduct.name}" to cart. Please try again.`, ToastType.ERROR);
        }
      },
      error: (error) => {
        this.toastService.showToast(`Error occurred: ${error.message}`, ToastType.ERROR);
      }
    });

  }

  onAddToCart(productName: string, productPrice: number, productId: number): void {
    this.postDataToCart(productId, productName, productPrice);
  }

  private numberRandom(){
    return Math.floor(Math.random() * 3) + 1;
  }
  loadFeed(
    page: number = this.numberRandom(),
    size: number = this.numberRandom(),
    sortBy: string = DEFAULT_SORT_BY,
  ): void {
    this.productService.getProducts(page, size, sortBy).subscribe({
      next: (response) => {
        this.moreProducts = response.content;
        this.relatedProducts = this.moreProducts.map(({ name, price, id }) => ({
          name: name || 'N/A',
          price: price || 'N/A',
          id: id || 'N/A',
        }));
        console.log('loadFeed',this.relatedProducts);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
  



  onViewDetails(productId: number): void {
    this.productService.getProductById(productId);
    this.router.navigate([`/${ROUTE_PRODUCT_DETAILS}`, productId]);
    this.loadAllInformations(productId);
  }

  private loadAllInformations(productId: number): void {
    if(productId){
      this.loadFeed();
      setTimeout(() => {
        this.loadProductDetails(productId);
      }, 0.1)
      
    } else{
      console.error('Product id not found');
    }
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

  private createAddMainToCartObject(amount:number, productId: number): AddProductToCartRequestDto {
    const cartDetailsRequestDto: CartDetailsRequestDto = {
      amount: amount,
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
