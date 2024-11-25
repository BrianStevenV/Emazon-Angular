import { Component, OnInit } from '@angular/core';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, TABLE_HEADERS_AMOUNT_IN_CART, TABLE_HEADERS_AMOUNT_IN_STOCK, TABLE_HEADERS_BRAND_NAME, TABLE_HEADERS_CART_DETAILS_ID, TABLE_HEADERS_CATEGORY_NAMES, TABLE_HEADERS_ID, TABLE_HEADERS_NAME, TABLE_HEADERS_NEXT_SUPPLY_DATE, TABLE_HEADERS_PRICE } from 'src/app/shared/constants/cart/cart.constants';
import { CartDetailsResponseDto } from 'src/app/shared/models/cart.model';
import { SortDirection } from 'src/app/shared/models/paginator.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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
    private readonly toastService: ToastService
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


}
