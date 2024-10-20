import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLinkComponent } from './nav-link.component';
import { By } from '@angular/platform-browser'; 

describe('NavLinkComponent', () => {
  let component: NavLinkComponent;
  let fixture: ComponentFixture<NavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavLinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should display the correct link text', () => { 
    component.link = 'Home';
    fixture.detectChanges(); 

    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.textContent.trim()).toBe('Home');
});


  
  it('should have an empty href attribute by default', () => {
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.getAttribute('href')).toBe('');
  });
});
