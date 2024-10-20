import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from './modal.component';
import 'zone.js/testing';
import { MoleculesModule } from '../molecules.module';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule, MoleculesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form controls based on formFields input', () => {
    component.formFields = [
      { name: 'firstName', label: 'First Name', type: 'text', validators: [Validators.required], maxLength: 50 },
      { name: 'age', label: 'Age', type: 'number', validators: [], maxLength: 3 },
    ];

    component.ngOnInit();

    expect(component.form.contains('firstName')).toBe(true);
    expect(component.form.contains('age')).toBe(true);
  });


  it('should emit submitEvent with form value on valid form submission', () => {
    jest.spyOn(component.submitEvent, 'emit');

    component.formFields = [
      { name: 'firstName', label: 'First Name', type: 'text', validators: [Validators.required], maxLength: 50 },
    ];

    component.ngOnInit();
    component.getFormControl('firstName').setValue('John');

    component.onSubmit();

    expect(component.submitEvent.emit).toHaveBeenCalledWith({ firstName: 'John' });
  });

 
  it('should emit submitEvent even if form is invalid', () => {
    jest.spyOn(component.submitEvent, 'emit');
  
    component.formFields = [
      { name: 'firstName', label: 'First Name', type: 'text', validators: [Validators.required], maxLength: 50 },
    ];
  
    component.ngOnInit();
    
    // Dejar el campo 'firstName' vacío, lo que lo hace inválido.
    component.getFormControl('firstName').setValue(''); 
  
    component.onSubmit();
  
    
    expect(component.submitEvent.emit).toHaveBeenCalled(); 
  });
  

  
  it('should emit closeModalEvent when close is called', () => {
    jest.spyOn(component.closeModalEvent, 'emit');

    component.close();

    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

  
  it('should initialize form controls with validators', () => {
    component.formFields = [
      { name: 'firstName', label: 'First Name', type: 'text', validators: [Validators.required], maxLength: 50 },
    ];

    component.ngOnInit();

    const firstNameControl = component.getFormControl('firstName');
    expect(firstNameControl).toBeDefined();
    expect(firstNameControl.validator).toBeTruthy();
  });
});
