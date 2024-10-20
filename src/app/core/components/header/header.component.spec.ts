import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('should render app-logo component', () => {
    const logoElement = fixture.debugElement.nativeElement.querySelector('app-logo');
    expect(logoElement).toBeTruthy(); 
  });

  
  it('should render app-navbar component', () => {
    const navbarElement = fixture.debugElement.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy(); 
  });
});
