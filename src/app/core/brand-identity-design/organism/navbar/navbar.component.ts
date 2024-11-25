import { Component, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMobile!: boolean;
  isMenuOpen!: boolean;
  @Input()navLinks !: any;
  @Output() navigate = new EventEmitter<string>();

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

  onLinkClick(path: string) {
    this.navigate.emit(path); 
  }

}
