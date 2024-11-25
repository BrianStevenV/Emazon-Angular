import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss']
})
export class CardCartComponent implements OnInit {

  @Input() buttonName !: string;
  @Input() buttonType !: string;

  @Input() image !: string;
  @Input() amount !: number;

  @Input() buttonAddAmountName!: string;
  @Input() buttonAddAmountType!: string;

  @Input() buttonSubstractAmountName!: string;
  @Input() buttonSubstractAmountType!: string;

  @Output() amountChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  private validationAmountCounter(amount: number): number {
    if(amount <= 0){
      return 1;
    }
    return amount;
  }

  onAddAmount(): void {
    this.amount = this.validationAmountCounter(this.amount + 1);
    this.amountChange.emit(this.amount);
  }
  
  onSubstractAmount(): void {
    this.amount = this.validationAmountCounter(this.amount - 1);
    this.amountChange.emit(this.amount);
  }

}
