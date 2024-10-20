import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should render app-header component', () => {
    const headerElement = fixture.debugElement.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy(); 
  });

  it('should render router-outlet', () => {
    const routerOutletElement = fixture.debugElement.nativeElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy(); 
  });

  it('should render app-footer component', () => {
    const footerElement = fixture.debugElement.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy(); 
  });
});
