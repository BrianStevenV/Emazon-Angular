import { Component, OnInit } from '@angular/core';
import { BUTTON_DROPDOWN_NAME_BRAND, BUTTON_DROPDOWN_NAME_CATEGORY, 
  BUTTON_OPEN_MODAL_NAME, BUTTON_OPEN_MODAL_TYPE, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, 
  ERROR_MESSAGES_BY_CODE, ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, FORM_CONTROL_NAME_DROPDOWN_BRAND, 
  FORM_CONTROL_NAME_DROPDOWN_CATEGORY, GENERIC_ERROR_MESSAGE, MAX_SELECTION_BRANDS, MAX_SELECTION_CATEGORIES, 
  MODAL_CLOSE_BUTTON_NAME, MODAL_FORM_FIELDS_LABEL_PRODUCT_AMOUNT, MODAL_FORM_FIELDS_LABEL_PRODUCT_DESCRIPTION, 
  MODAL_FORM_FIELDS_LABEL_PRODUCT_NAME, MODAL_FORM_FIELDS_LABEL_PRODUCT_PRICE, 
  MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_AMOUNT, MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_DESCRIPTION, 
  MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_NAME, MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_PRICE, 
  MODAL_FORM_FIELDS_NAME_PRODUCT_AMOUNT, MODAL_FORM_FIELDS_NAME_PRODUCT_DESCRIPTION, MODAL_FORM_FIELDS_NAME_PRODUCT_NAME, MODAL_FORM_FIELDS_NAME_PRODUCT_PRICE,
  MODAL_FORM_FIELDS_TYPE_DATE, MODAL_FORM_FIELDS_TYPE_NUMBER, MODAL_FORM_FIELDS_TYPE_TEXT, MODAL_FORM_FIELDS_TYPE_TEXTAREA, MODAL_SUBMIT_BUTTON_NAME, 
  MODAL_TITLE, MODAL_VISIBLE, SUCCESS_MESSAGES_POST, TABLE_HEADERS_AMOUNT, TABLE_HEADERS_BRAND, 
  TABLE_HEADERS_CATEGORY, TABLE_HEADERS_DESCRIPTION, TABLE_HEADERS_NAME, TABLE_HEADERS_PRICE } from 'src/app/shared/constants/product/product.constants';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ToastType } from 'src/app/shared/models/toast.model';
import { Product, ProductPaginator } from 'src/app/shared/models/product.model';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { CategoryResponse } from 'src/app/shared/models/category.model';
import { BrandResponse } from 'src/app/shared/models/brand.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { Observable } from 'rxjs';
import { SortDirection } from 'src/app/shared/models/paginator.model';
import { Supply } from 'src/app/shared/models/supply.model';
import { SupplyService } from 'src/app/shared/services/supply/supply.service';
import { BUTTON_OPEN_MODAL_NAME_SUPPLY, BUTTON_OPEN_MODAL_TYPE_SUPPLY, MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_AVAILABLE, MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_TOTAL, MODAL_FORM_FIELDS_LABEL_SUPPLY_IS_AVAILABLE, MODAL_FORM_FIELDS_LABEL_SUPPLY_PRICE, MODAL_FORM_FIELDS_LABEL_SUPPLY_PRODUCT_ID, MODAL_FORM_FIELDS_LABEL_SUPPLY_REPLENISMENT_DATE, MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_AVAILABLE, MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_TOTAL, MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRICE, MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRODUCT_ID, MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_AVAILABLE, MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_TOTAL, MODAL_FORM_FIELDS_NAME_SUPPLY_IS_AVAILABLE, MODAL_FORM_FIELDS_NAME_SUPPLY_PRICE, MODAL_FORM_FIELDS_NAME_SUPPLY_PRODUCT_ID, MODAL_FORM_FIELDS_NAME_SUPPLY_REPLENISMENT_DATE, MODAL_TITLE_SUPPLY, ON_MODAL_SUBMIT_LENGTH_VALIDATION, SUPPLY_ERROR_MESSAGES_BY_CODE, SUPPLY_GENERIC_ERROR_MESSAGE, SUPPLY_SUCCESS_MESSAGES_POST } from 'src/app/shared/constants/supply/supply.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  sortDirection = SortDirection.ASC;
  currentPage!:number;
  totalItems!: number;
  itemsPerPage !: number;

  tableHeaders = [TABLE_HEADERS_NAME, TABLE_HEADERS_DESCRIPTION, TABLE_HEADERS_AMOUNT, TABLE_HEADERS_PRICE, TABLE_HEADERS_BRAND, TABLE_HEADERS_CATEGORY]
  tableData !: any[][];
  products!: ProductPaginator[];
  
  categories!: CategoryResponse[];
  brands!: BrandResponse[];

  selectedCategories: CategoryResponse[] = [];
  selectedBrands: BrandResponse[] = [];

  filteredCategories: CategoryResponse[] = [];
  filteredBrands: BrandResponse[] = []; 

  get categoriesNames(): string[] {
    return this.categories ? this.categories.map(category => category.name) : [];
  }
  
  get categoriesId(): number[] {
    return this.categories ? this.categories.map(category => category.id) : [];
  }
  
  get brandsNames(): string[] {
    return this.brands ? this.brands.map(brand => brand.name) : [];
  }
  
  get brandsId(): number[] {
    return this.brands ? this.brands.map(brand => brand.id) : [];
  }
  

  buttonOpenModalNameSupply = BUTTON_OPEN_MODAL_NAME_SUPPLY;
  buttonOpenModalTypeSupply = BUTTON_OPEN_MODAL_TYPE_SUPPLY;

  buttonOpenModalName = BUTTON_OPEN_MODAL_NAME;
  buttonOpenModalType = BUTTON_OPEN_MODAL_TYPE;
  modalVisible = MODAL_VISIBLE;

  modalTitle = MODAL_TITLE;
  modalCloseButtonName = MODAL_CLOSE_BUTTON_NAME;
  modalSubmitButtonName = MODAL_SUBMIT_BUTTON_NAME;
  modalFormFields = [
    {name: MODAL_FORM_FIELDS_NAME_PRODUCT_NAME, label: MODAL_FORM_FIELDS_LABEL_PRODUCT_NAME, type: MODAL_FORM_FIELDS_TYPE_TEXT, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_NAME)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_NAME},
    {name: MODAL_FORM_FIELDS_NAME_PRODUCT_DESCRIPTION, label: MODAL_FORM_FIELDS_LABEL_PRODUCT_DESCRIPTION, type: MODAL_FORM_FIELDS_TYPE_TEXTAREA, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_DESCRIPTION)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_DESCRIPTION},
    {name: MODAL_FORM_FIELDS_NAME_PRODUCT_AMOUNT, label: MODAL_FORM_FIELDS_LABEL_PRODUCT_AMOUNT, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_AMOUNT)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_AMOUNT},
    {name: MODAL_FORM_FIELDS_NAME_PRODUCT_PRICE, label: MODAL_FORM_FIELDS_LABEL_PRODUCT_PRICE, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_PRICE)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_PRICE},
  ];

  modalSupplyTitle = MODAL_TITLE_SUPPLY;
  modalSupplyFormFields = [
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_PRICE, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_PRICE, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRICE)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRICE},
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_TOTAL, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_TOTAL, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_TOTAL)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_TOTAL},
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_AVAILABLE, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_AVAILABLE, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.max(MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_AVAILABLE)], maxLength:MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_AVAILABLE},
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_IS_AVAILABLE, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_IS_AVAILABLE, type: 'checkbox', validators: [Validators.required], maxLength: 10, value: 'false'},
    
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_REPLENISMENT_DATE, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_REPLENISMENT_DATE, type: MODAL_FORM_FIELDS_TYPE_DATE, validators: [Validators.required], maxLength: 10},
    {name: MODAL_FORM_FIELDS_NAME_SUPPLY_PRODUCT_ID, label: MODAL_FORM_FIELDS_LABEL_SUPPLY_PRODUCT_ID, type: MODAL_FORM_FIELDS_TYPE_NUMBER, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRODUCT_ID)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRODUCT_ID}
  ]

  brandId = new FormControl(FORM_CONTROL_NAME_DROPDOWN_BRAND) as FormControl;
  categoryId = new FormControl(FORM_CONTROL_NAME_DROPDOWN_CATEGORY) as FormControl;

  brandIdName = FORM_CONTROL_NAME_DROPDOWN_BRAND;
  categoryIdName = FORM_CONTROL_NAME_DROPDOWN_CATEGORY;

  buttonNameDropdownBrand = BUTTON_DROPDOWN_NAME_BRAND;
  buttonNameDropdownCategory = BUTTON_DROPDOWN_NAME_CATEGORY;

  getFormControlBrandId(name: FormControl): FormControl {
    return this.brandId as FormControl;
  }
  getFormControlCategoryId(name: FormControl): FormControl {
    return this.categoryId as FormControl;
  }
  
  
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly toastService: ToastService,
    private readonly supplyService: SupplyService
  ) { }


  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
    this.loadProducts();
  }


  openModal(): void {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedCategories = [];
    this.selectedBrands = [];
  }

  modalSupplyVisible!: boolean;
  openSupplyModal(): void {
    this.modalSupplyVisible = true;
  }

  closeSupplyModal(): void {
    this.modalSupplyVisible = false;
  }

  onModalSubmit(formData: any): void {
    const requiredFields = this.extractRequiredFields(this.modalFormFields);
    const missingFields = this.findMissingFields(requiredFields, formData);
  
    console.log(requiredFields);
    console.log(missingFields);

    if (missingFields.length > ON_MODAL_SUBMIT_LENGTH_VALIDATION) {
      this.showMissingFieldsWarning(missingFields);
      return;
    }

    this.createProduct(this.mapToProductData(formData));
  }

  onModalSupplySubmit(formData: any): void {

    console.log(formData);
    const requiredFields = this.extractRequiredFields(this.modalSupplyFormFields);
    const missingFields = this.findMissingFields(requiredFields, formData);

    console.log(requiredFields);
    console.log(missingFields);
  
    if (missingFields.length > ON_MODAL_SUBMIT_LENGTH_VALIDATION) {
      this.showMissingFieldsWarning(missingFields);
      return;
    }
  
    const supplyData = this.mapToSupplyData(formData);
    if (supplyData) {
      this.createSupply(supplyData);
    }
  }
  
  createProduct(productData: Product): void {
    console.log(productData);
    this.productService.createProduct(productData).subscribe({
      
      next: (response: HttpResponse<Product>) => {
        const message = response.status === HttpStatusCode.Created ? SUCCESS_MESSAGES_POST.PRODUCT_CREATED : SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE;
        this.toastService.showToast(message, ToastType.SUCCESS);
      },
      error: (error) => {
        console.log(`From product data: ${productData}`)
        const message = 
          ERROR_MESSAGES_BY_CODE[
            error.status as keyof typeof ERROR_MESSAGES_BY_CODE
          ] || GENERIC_ERROR_MESSAGE;
          this.toastService.showToast(message, ToastType.ERROR);
      }
    })
  }

  createSupply(supplyData: Supply){
    console.log(supplyData);
    this.supplyService.createSupply(supplyData).subscribe({
      next: (response: HttpResponse<Supply>) => {
        const message = response.status === HttpStatusCode.Created ? SUPPLY_SUCCESS_MESSAGES_POST.SUPPLY_CREATED : SUPPLY_SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE;
        this.toastService.showToast(message, ToastType.SUCCESS);
      },
      error: (error) => {
        const message = SUPPLY_ERROR_MESSAGES_BY_CODE[error.status as keyof typeof SUPPLY_ERROR_MESSAGES_BY_CODE] || SUPPLY_GENERIC_ERROR_MESSAGE;
        this.toastService.showToast(message, ToastType.ERROR);
      }
    })
  }
  
  private extractRequiredFields(formFields: any[]): { name: string, label: string }[] {
     
    return formFields.map(({ name, label }) => ({ name, label }));
  }

  private findMissingFields(requiredFields: { name: string, label: string }[], formData: any): string[] {
    return requiredFields
      .filter(({ name }) => {
        const value = formData[name];
        return !formData.hasOwnProperty(name) || value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
      })
      .map(({ label }) => label);
  }
  
  
  private showMissingFieldsWarning(missingFields: string[]): void {
    const message = `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required.`;
    this.toastService.showToast(message, ToastType.WARNING);
  }
  
  private mapToProductData(formData: any): Product {
    const selectedCategories = this.selectedCategories || [];
  
    const productData : Product = {
      name: formData.name,
      description: formData.description,
      amount: formData.amount,
      price: formData.price,
      brandId: this.selectedBrands && this.selectedBrands.length > 0 ? this.selectedBrands[0].id : null,
      categoryId: selectedCategories.map(category => category.id)
    };
  
    
    return productData;
  }

  private mapToSupplyData(formData: any): Supply | null {
    return (formData.quantityAvailable > formData.quantityTotal)
      ? (this.toastService.showToast('The available quantity cannot be greater than the total quantity.', ToastType.WARNING), null)
      : {
          price: formData.price,
          quantityTotal: formData.quantityTotal,
          quantityAvailable: formData.quantityAvailable,
          isAvailable: formData.isAvailable,
          replenishmentDate: formData.replenishmentDate,
          productId: formData.productId
        };
  }
  
  private handleSelection<T>(item: T, selectedList: T[], maxSelection: number, itemName: string): void {
    if (selectedList.length >= maxSelection) {
      this.toastService.showToast(`You can only select up to ${maxSelection} ${itemName}.`, ToastType.WARNING);
      return;
    }
  
    if (!selectedList.includes(item)) {
      selectedList.push(item);
    }
  }
  
  selectCategory(category: CategoryResponse): void {
    this.handleSelection(category, this.selectedCategories, MAX_SELECTION_CATEGORIES, "categories");
  }
  
  selectBrand(brand: BrandResponse): void {
    this.handleSelection(brand, this.selectedBrands, MAX_SELECTION_BRANDS, "brands");
  }
  
  removeItem<T>(item: T, selectedList: T[]): T[] {
    return selectedList.filter(i => i !== item);
  }
  
  removeCategory(category: CategoryResponse): void {
    this.selectedCategories = this.removeItem(category, this.selectedCategories);
  }
  
  removeBrand(brand: BrandResponse): void {
    this.selectedBrands = this.removeItem(brand, this.selectedBrands);
  }
  
  private fetchData<T>(serviceMethod: () => Observable<T[]>, onSuccess: (data: T[]) => void): void {
    serviceMethod().subscribe({
      next: (data) => onSuccess(data),
      error: (error) => {
        const message = ERROR_MESSAGES_BY_CODE[error.status as keyof typeof ERROR_MESSAGES_BY_CODE] || GENERIC_ERROR_MESSAGE;
        this.toastService.showToast(message, ToastType.ERROR);
      }
    });
  }
  
  loadCategories(): void {
    this.fetchData(
      () => this.categoryService.getAllCategories(),
      (categories) => {
        this.categories = categories;
        this.filteredCategories = [...categories];
      }
    );
  }
  
  loadBrands(): void {
    this.fetchData(
      () => this.brandService.getAllBrands(),
      (brands) => {
        this.brands = brands;
        this.filteredBrands = [...brands];
      }
    );
  }
  

  loadProducts(
    page: number = DEFAULT_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    sortBy: string = DEFAULT_SORT_BY,
  ): void {
    this.productService.getProducts(page, size, sortBy).subscribe({
      next: (response) => {
        this.totalItems = response.totalElements;
        this.itemsPerPage = response.pageSize;
        this.products = response.content;
        this.tableData = this.products.map(({ name, description, amount, price, brand, categories }) => [name || 'N/A', description || 'N/A', amount || 'N/A', price || 'N/A', brand.name || 'N/A', categories.map(category => category.name).join(', ') || 'N/A']);
      },
      error: (error) => {

        this.toastService.showToast(ERROR_SHOW_TOAST_MESSAGE_EXCEPTION, ToastType.ERROR)
      }
    })
  }

  onPageChange(newPage: number): void {
    if(newPage >= DEFAULT_PAGE && newPage <= this.totalItems) {
      this.currentPage = newPage;
      this.loadProducts(this.currentPage, this.itemsPerPage, this.sortDirection); 
    }
  }

  onItemsPerPageChange(newSize: number): void {
    this.itemsPerPage = newSize;
    this.loadProducts(this.currentPage, this.itemsPerPage, this.sortDirection); 
  }

  onSortDirectionChange(newSortDirection: SortDirection): void {
    this.sortDirection = newSortDirection;
    this.loadProducts(this.currentPage, this.itemsPerPage, this.sortDirection); 
  }

}
