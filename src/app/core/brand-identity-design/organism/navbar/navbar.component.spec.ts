import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Ignorar componentes hijos como <app-hamburguer-button> y <app-close-hamburguer-button>
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set isMobile based on window size', () => {
    jest.spyOn(component, 'checkScreenSize'); 

    
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    window.dispatchEvent(new Event('resize')); 
    fixture.detectChanges();
    expect(component.checkScreenSize).toHaveBeenCalled();
    expect(component.isMobile).toBe(true);

    
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize')); 
    fixture.detectChanges();
    expect(component.isMobile).toBe(false);
  });

  
  it('should toggle isMenuOpen when toggleMenu is called', () => {
    component.isMenuOpen = false;
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);

    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  
  it('should show hamburger button when isMobile is true and menu is closed', () => {
    component.isMobile = true;
    component.isMenuOpen = false;
    fixture.detectChanges();

    const hamburgerButton = fixture.debugElement.query(By.css('app-hamburguer-button'));
    expect(hamburgerButton).toBeTruthy();
  });

  
  it('should show close button when isMobile is true and menu is open', () => {
    component.isMobile = true;
    component.isMenuOpen = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('app-close-hamburguer-button'));
    expect(closeButton).toBeTruthy();
  });
});
