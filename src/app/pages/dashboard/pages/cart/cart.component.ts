import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_HOME } from 'src/app/core/constants/routing.constants';
import { BUTTON_CLOSE_MODAL_DELETE_NAME, BUTTON_CLOSE_MODAL_DELETE_TYPE, BUTTON_OPEN_MODAL_DELETE_NAME, BUTTON_OPEN_MODAL_DELETE_TYPE, BUTTON_PAY_NAME, BUTTON_PAY_TYPE, BUTTON_SUBMIT_MODAL_DELETE_NAME, BUTTON_SUBMIT_MODAL_DELETE_TYPE, BUY_CART_SUCESSFULLY_MESSAGE, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, LABEL_DELETE_ITEM_FORM_CART, LOCAL_STORAGE_CART_NAME, MODAL_VISIBLE, TABLE_HEADERS_AMOUNT_IN_CART, TABLE_HEADERS_AMOUNT_IN_STOCK, TABLE_HEADERS_BRAND_NAME, TABLE_HEADERS_CART_DETAILS_ID, TABLE_HEADERS_CATEGORY_NAMES, TABLE_HEADERS_ID, TABLE_HEADERS_NAME, TABLE_HEADERS_NEXT_SUPPLY_DATE, TABLE_HEADERS_PRICE } from 'src/app/shared/constants/cart/cart.constants';
import { CartDetailsResponseDto } from 'src/app/shared/models/cart.model';
import { SortDirection } from 'src/app/shared/models/paginator.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { SalesService } from 'src/app/shared/services/sales/sales.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CartMethodsUtils } from 'src/app/shared/utils/cart.methods.utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  inputValue!: string;

  buttonPayName = BUTTON_PAY_NAME;
  buttonPayType = BUTTON_PAY_TYPE;

  buttonOpenModalDeleteName = BUTTON_OPEN_MODAL_DELETE_NAME;
  buttonOpenModalDeleteType = BUTTON_OPEN_MODAL_DELETE_TYPE;

  buttonCloseModalDeleteName = BUTTON_CLOSE_MODAL_DELETE_NAME;
  buttonCloseModalDeleteType = BUTTON_CLOSE_MODAL_DELETE_TYPE;

  buttonSubmitModalDeleteName = BUTTON_SUBMIT_MODAL_DELETE_NAME;
  buttonSubmitModalDeleteType = BUTTON_SUBMIT_MODAL_DELETE_TYPE;

  modalItemDeleteVisible = MODAL_VISIBLE;

  labelModalDeleteItem = LABEL_DELETE_ITEM_FORM_CART; 

  sortDirection = SortDirection.ASC;
  currentPage!:number;
  totalItems!: number;
  itemsPerPage !: number;

  subtotal !: number;
  
  cartDetails!: CartDetailsResponseDto[];
  tableData !: any[][];
  tableHeaders = [TABLE_HEADERS_ID, TABLE_HEADERS_NAME, TABLE_HEADERS_AMOUNT_IN_STOCK, TABLE_HEADERS_PRICE, TABLE_HEADERS_AMOUNT_IN_CART, TABLE_HEADERS_BRAND_NAME, TABLE_HEADERS_CATEGORY_NAMES, TABLE_HEADERS_NEXT_SUPPLY_DATE, TABLE_HEADERS_CART_DETAILS_ID];

  constructor(
    private readonly cartService: CartService,
    private readonly toastService: ToastService,
    private readonly salesService: SalesService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails(
    page: number = DEFAULT_PAGE,
    size: number = DEFAULT_PAGE_SIZE, 
    sortBy: string = DEFAULT_SORT_BY,
  ): void {
    this.cartService.getCartDetails(page, size, sortBy).subscribe({
      next: ( response ) => {
        this.totalItems = response.totalElements; 
        this.itemsPerPage = response.pageSize; 
        this.cartDetails = response.content;
        this.tableData = this.cartDetails.map(({id, name, amountInStock, price, amountInCart, brandName, categoryNames, nextSupplyDate, cartDetailsId}) => [id || 'N/A', name || 'N/A', amountInStock || 'N/A', price || 'N/A', amountInCart || 'N/A', brandName || 'N/A',categoryNames || 'N/A', nextSupplyDate || 'N/A', cartDetailsId || 'N/A']);
        this.subtotal = response.subtotal;
      },
      error: (error) => {
        this.toastService.showToast(error.error.message, ToastType.WARNING);
      }
    })
  }


  onPageChange(newPage: number): void {
    if(newPage >= DEFAULT_PAGE && newPage <= this.totalItems) {
      this.currentPage = newPage;
      this.loadCartDetails(this.currentPage, this.itemsPerPage, this.sortDirection); 
    }
  }

  onItemsPerPageChange(newSize: number): void {
    this.itemsPerPage = newSize;
    this.loadCartDetails(this.currentPage, this.itemsPerPage, this.sortDirection); 
  }

  onSortDirectionChange(newSortDirection: SortDirection): void {
    this.sortDirection = newSortDirection;
    this.loadCartDetails(this.currentPage, this.itemsPerPage, this.sortDirection); 
  }

  openDeleteModal(){
    this.modalItemDeleteVisible = true;
  }

  closeDeleteModal(){
    this.modalItemDeleteVisible = false;
  }

  onSubmitDeleteModal(): void {
    if (this.inputValue && this.inputValue.trim() !== '') {
      this.deleteItemFromCart(Number(this.inputValue));
      this.toastService.showToast(`Product was deleted: ${this.inputValue}`, ToastType.SUCCESS);
      this.closeDeleteModal();
    } else {
      this.toastService.showToast('Please, Input a value before to send', ToastType.WARNING);
    }
  }

  deleteItemFromCart(productId: number): void {
    this.cartService.deleteProductFromCartByProductId(productId).subscribe({
      next: () => {
        this.loadCartDetails(this.currentPage, this.itemsPerPage, this.sortDirection);
      },
      error: (error) => {
        this.toastService.showToast(error.error.message, ToastType.WARNING);
      }
    });
  }
  
  buyCart(): void {
    this.salesService.buyCart().subscribe({
      next: () => {
        this.navigateToHome();
        this.deleteCartStorage();
        this.toastService.showToast(BUY_CART_SUCESSFULLY_MESSAGE, ToastType.SUCCESS);
      },
      error: (error) => {
        this.toastService.showToast(error.error.message, ToastType.ERROR);
      }
    })
  }

  navigateToHome() {
    this.route.navigate([`/${ROUTE_HOME}`]);
  }

  deleteCartStorage(){
    CartMethodsUtils.removeCartStorage(LOCAL_STORAGE_CART_NAME); 
  }

}
