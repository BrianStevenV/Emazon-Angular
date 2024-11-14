
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: DebugElement;
  let textareaElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.inputControl = new FormControl('');
    component.maxLength = 10;
    component.inputType = 'text';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a text input when inputType is "text"', () => {
    component.inputType = 'text';
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input[type="text"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should render a textarea when inputType is "textarea"', () => {
    component.inputType = 'textarea';
    fixture.detectChanges();

    textareaElement = fixture.debugElement.query(By.css('textarea'));
    expect(textareaElement).toBeTruthy();
  });

  it('should render a checkbox input when inputType is "checkbox"', () => {
    component.inputType = 'checkbox';
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should update value when typing in a text input', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    inputElement.value = 'Test value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe('Test value');
  });

  it('should limit the value to maxLength in a text input', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    inputElement.value = 'Test value exceeding max length';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe('Test value');
  });

  it('should update checkbox value correctly when checked', () => {
    component.inputType = 'checkbox';
    fixture.detectChanges();
    const checkboxElement: HTMLInputElement = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;

    checkboxElement.checked = true;
    checkboxElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe(true);
  });

  it('should update checkbox value correctly when unchecked', () => {
    component.inputType = 'checkbox';
    fixture.detectChanges();
    const checkboxElement: HTMLInputElement = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;

    checkboxElement.checked = false;
    checkboxElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe(false);
  });

  it('should call onChange when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    const onChangeSpy = jest.fn();
    component.onChange = onChangeSpy;

    inputElement.value = 'Test input';
    inputElement.dispatchEvent(new Event('input'));

    expect(onChangeSpy).toHaveBeenCalledWith('Test input');
  });

  it('should call writeValue correctly', () => {
    component.writeValue('New value');
    expect(component.value).toBe('New value');
  });

  it('should call registerOnChange with a function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should call registerOnTouched with a function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouch).toBe(fn);
  });
});
