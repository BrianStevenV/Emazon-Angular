import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() nameProduct !: string;
  @Input() price !: number;
  @Input() image !: string;

  @Input() buttonViewDetailsName !: string;
  @Input() buttonViewDetailsType !: string;

  @Input() buttonAddToCartName !: string;
  @Input() buttonAddToCartType !: string;

  @Output() addToCart = new EventEmitter<{name: string, price: number, id: number}>();
  @Output() viewDetails = new EventEmitter<{productId: number}>();
  
  @Input() productId !: number;
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCartClick(): void {
    this.addToCart.emit({name: this.nameProduct, price: this.price, id: this.productId});
  }

  onViewDetailsClick(): void {
    this.viewDetails.emit({productId: this.productId});
  }

}
