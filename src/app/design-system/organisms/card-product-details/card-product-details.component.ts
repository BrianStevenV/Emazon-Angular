import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MAXIMUM_AMOUNT_COUNTER_NUMBER, MINIMUM_AMOUNT_COUNTER_NUMBER } from 'src/app/shared/constants/design-system/organism/card-product-details.constants';
import { ProductPaginator, ProductResponse } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-card-product-details',
  templateUrl: './card-product-details.component.html',
  styleUrls: ['./card-product-details.component.scss']
})
export class CardProductDetailsComponent implements OnInit {

  @Input()product !: ProductPaginator;

  @Input() image !: string;

  @Input() buttonAddAmountName!: string;
  @Input() buttonAddAmountType!: string;

  @Input() buttonSubstractAmountName!: string;
  @Input() buttonSubstractAmountType!: string;

  @Input() defaultAmountCount!: number;

  @Input() buttonAddToCartName!: string;
  @Input() buttonAddToCartType!: string;

  @Output() productAddToCart = new EventEmitter<{amount: number, productId: number}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddAmount(): void {
    if (this.defaultAmountCount < MAXIMUM_AMOUNT_COUNTER_NUMBER) {
      this.defaultAmountCount = this.validationAmountCounter(this.defaultAmountCount + 1);
    }
  }
  
  onSubstractAmount(): void {
    if (this.defaultAmountCount > MINIMUM_AMOUNT_COUNTER_NUMBER) {
      this.defaultAmountCount = this.validationAmountCounter(this.defaultAmountCount - 1);
    }
  }
  

  private validationAmountCounter(amount: number): number {
    if(amount <= 0){
      return 1;
    }
    return amount;
  }

  onAddToCartClick(): void {
    this.productAddToCart.emit({amount: this.defaultAmountCount, productId: this.product.id});
  }
}
