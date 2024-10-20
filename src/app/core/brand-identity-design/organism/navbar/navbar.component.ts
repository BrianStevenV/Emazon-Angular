import { Component, HostListener, OnInit } from '@angular/core';
import { NavbarPaths } from 'src/app/shared/types/navbar-path-enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMobile!: boolean;
  isMenuOpen!: boolean;
  navLinks = NavbarPaths;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
