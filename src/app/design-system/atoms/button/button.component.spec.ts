import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input properties', () => {
    component.buttonName = 'Click Me';
    component.buttonType = 'submit';
    fixture.detectChanges();

    expect(component.buttonName).toBe('Click Me');
    expect(component.buttonType).toBe('submit');
  });

  
  it('should render the button with the correct name', () => {
    component.buttonName = 'Click Me';
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Click Me');
  });

  
  it('should render the button with the correct type', () => {
    component.buttonType = 'submit';
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.type).toBe('submit');
  });

  it('should emit onClick event when button is clicked', () => {
    jest.spyOn(component.onClick, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
