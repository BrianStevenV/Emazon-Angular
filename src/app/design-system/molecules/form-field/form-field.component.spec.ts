import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label/label.component';
import { InputComponent } from '../../atoms/input/input.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;
  let nameLabelInput: DebugElement;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormFieldComponent, LabelComponent, InputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.nameLabel = 'Test Label';
    component.inputType = 'text';
    component.inputControl = new FormControl('');
    component.maxLength = 10;
    component.value = '';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label component with the correct name', () => {
    nameLabelInput = fixture.debugElement.query(By.css('.form__field--container__label app-label'));
    expect(nameLabelInput.nativeElement.textContent).toBe('Test Label');
  });

  it('should render the input component with the correct type and maxLength', () => {
    inputElement = fixture.debugElement.query(By.css('.form__field--container__input app-input'));
    const inputComponent = inputElement.componentInstance;

    expect(inputComponent.inputType).toBe('text');
    expect(inputComponent.maxLength).toBe(10);
  });

  it('should bind the value to the input control', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('app-input input')).nativeElement;
    inputElement.value = 'Test Value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.inputControl.value).toBe('Test Value');
  });

  it('should pass input control to app-input component', () => {
    const inputComponent = fixture.debugElement.query(By.css('app-input')).componentInstance;
    expect(inputComponent.inputControl).toBe(component.inputControl);
  });

  it('should bind maxLength to the app-input component', () => {
    const inputComponent = fixture.debugElement.query(By.css('app-input')).componentInstance;
    expect(inputComponent.maxLength).toBe(component.maxLength);
  });
});
