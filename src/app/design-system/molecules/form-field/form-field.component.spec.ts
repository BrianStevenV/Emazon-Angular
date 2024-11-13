import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and input components with correct input bindings', () => {
    
    component.nameLabel = 'Test Label';
    component.inputType = 'text';
    component.inputControl = new FormControl('');
    component.maxLength = 10;
    component.value = 'Initial Value';

   
    fixture.detectChanges(); 

    
    const labelComponent = fixture.debugElement.query(By.css('app-label')).componentInstance;
    const inputComponent = fixture.debugElement.query(By.css('app-input')).componentInstance;

    expect(labelComponent).toBeTruthy();
    expect(labelComponent.nameLabel).toBe('Test Label');
    
    expect(inputComponent).toBeTruthy();
    expect(inputComponent.value).toBe('Initial Value');
    expect(inputComponent.inputType).toBe('text');
    expect(inputComponent.maxLength).toBe(10);
  });

  it('should update the value in the input control when value input changes', () => {
    
    component.inputControl = new FormControl('');
    
    
    component.inputControl.setValue('New Value');
    
   
    fixture.detectChanges();
    
    expect(component.inputControl.value).toBe('New Value');
  });
  
});
