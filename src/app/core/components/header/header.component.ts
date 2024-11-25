import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NavbarPaths } from 'src/app/shared/types/navbar-path-enum';
import { ROUTE_LOGIN } from '../../constants/routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navLinks = NavbarPaths;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthService
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



}
