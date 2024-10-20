import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should accept input properties', () => {
    component.value = 'Test';
    component.inputType = 'text';
    component.maxLength = 10;

    expect(component.value).toBe('Test');
    expect(component.inputType).toBe('text');
    expect(component.maxLength).toBe(10);
  });

  
  it('should update value on input', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    component.maxLength = 5; 
    component.value = 'Hello';
    fixture.detectChanges();

    
    inputElement.value = 'Hello World';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe('Hello'); 
  });

  
  it('should call onChange when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    jest.spyOn(component, 'onChange'); 

    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.onChange).toHaveBeenCalledWith('New Value'); 
  });


  it('should write value correctly', () => {
    component.writeValue('Initial Value');
    expect(component.value).toBe('Initial Value');
  });


  it('should register onChange and onTouch', () => {
    const onChangeSpy = jest.fn();
    const onTouchSpy = jest.fn();

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchSpy);

    component.onChange('Test Value');
    component.onTouch();

    expect(onChangeSpy).toHaveBeenCalledWith('Test Value');
    expect(onTouchSpy).toHaveBeenCalled();
  });


  it('should render textarea when inputType is textarea', () => {
    component.inputType = 'textarea';
    fixture.detectChanges();

    const textareaElement: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement).toBeTruthy(); 
  });

 
  it('should render input when inputType is not textarea', () => {
    component.inputType = 'text';
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy(); 
  });
});
