import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NavbarPaths } from 'src/app/shared/types/navbar-path-enum';
import { ROUTE_LOGIN } from '../../constants/routing.constants';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CART_VISIBLE, CART_VISIBLE_CLOSE_BUTTON_NAME, CART_VISIBLE_CLOSE_BUTTON_TYPE } from '../../constants/header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navLinks = NavbarPaths;

  cartVisible = CART_VISIBLE;

  cartVisibleCloseButtonName = CART_VISIBLE_CLOSE_BUTTON_NAME;
  cartVisibleCloseButtonType = CART_VISIBLE_CLOSE_BUTTON_TYPE;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut();
  }

  navigateTo(path: string) {
    if(path === ROUTE_LOGIN) {
      this.logout();
    }
    this.route.navigate([path]);
  }


  openCart(): void {
    this.cartVisible = true;
  }

  closeCart(): void{
    this.cartVisible = false;
  }

  getItemsFromCart(){}
  deleteItemFromCart(){}
  buyItemsFromCart(){}
  updateAmountItemFromCart(){}

}
