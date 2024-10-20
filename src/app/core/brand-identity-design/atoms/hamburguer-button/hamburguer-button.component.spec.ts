import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburguerButtonComponent } from './hamburguer-button.component';
import { By } from '@angular/platform-browser'; // Para consultar elementos en el DOM

describe('HamburguerButtonComponent', () => {
  let component: HamburguerButtonComponent;
  let fixture: ComponentFixture<HamburguerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburguerButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HamburguerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should contain the fa-bars icon', () => {
    const iconElement = fixture.debugElement.query(By.css('li.fa-bars.hamburger-button'));
    expect(iconElement).toBeTruthy();
  });

  
  it('should have the correct selector', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li.hamburger-button')).toBeTruthy(); 
  });

});
