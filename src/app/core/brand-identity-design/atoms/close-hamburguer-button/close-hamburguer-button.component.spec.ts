import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseHamburguerButtonComponent } from './close-hamburguer-button.component';
import { By } from '@angular/platform-browser'; // Importa para hacer queries en el DOM

describe('CloseHamburguerButtonComponent', () => {
  let component: CloseHamburguerButtonComponent;
  let fixture: ComponentFixture<CloseHamburguerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseHamburguerButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CloseHamburguerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should contain the fa-square-xmark icon', () => {
    const iconElement = fixture.debugElement.query(By.css('li.fa-square-xmark'));
    expect(iconElement).toBeTruthy();
  });


  it('should have the correct selector', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li.fa-solid.fa-square-xmark')).toBeTruthy(); 
  });

});
