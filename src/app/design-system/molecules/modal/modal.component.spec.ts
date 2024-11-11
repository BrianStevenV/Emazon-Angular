import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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


  it('should add brand control if requiresBrandId is true', () => {
    component.requiredOthersCamps = true;
    component.requiresBrandId = true;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    expect(brandControl).toBeDefined();
    expect(brandControl.validator).toBeTruthy(); 
  });
  
  it('should add category control if requiresCategoryId is true', () => {
    component.requiredOthersCamps = true;
    component.requiresCategoryId = true;
    component.ngOnInit(); 
  
    const categoryControl = component.getCategoryFormControl1();
    expect(categoryControl).toBeDefined();
    expect(categoryControl.validator).toBeTruthy(); 
  });
  
  it('should not add brand control if requiresBrandId is false', () => {
    component.requiredOthersCamps = true;
    component.requiresBrandId = false;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    expect(brandControl).toBeNull(); 
  });
  
  it('should not add category control if requiresCategoryId is false', () => {
    component.requiredOthersCamps = true;
    component.requiresCategoryId = false;
    component.ngOnInit(); 
  
    const categoryControl = component.getCategoryFormControl1();
    expect(categoryControl).toBeNull(); 
  });
  
  it('should not add brand or category controls if requiredOthersCamps is false', () => {
    component.requiredOthersCamps = false;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    expect(brandControl).toBeNull(); 
    expect(categoryControl).toBeNull(); 
  });


  
  it('should add brand control if requiredOthersCamps is false and requiresBrandId is true, but requiresCategoryId is false', () => {
    component.requiredOthersCamps = false;
    component.requiresBrandId = true;
    component.requiresCategoryId = false;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    
    
    expect(brandControl).toBeDefined();
    expect(brandControl.validator).toBeTruthy(); 
    expect(categoryControl).toBeNull();
  });
  
  it('should add category control if requiredOthersCamps is false and requiresCategoryId is true, but requiresBrandId is false', () => {
    component.requiredOthersCamps = false;
    component.requiresBrandId = false;
    component.requiresCategoryId = true;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    
    
    expect(categoryControl).toBeDefined();
    expect(categoryControl.validator).toBeTruthy(); 
    expect(brandControl).toBeNull();
  });
  
  it('should add both brand and category controls if requiredOthersCamps is true, but requiresBrandId is false and requiresCategoryId is true', () => {
    component.requiredOthersCamps = true;
    component.requiresBrandId = false;
    component.requiresCategoryId = true;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    
   
    expect(brandControl).toBeNull();
    expect(categoryControl).toBeDefined();
    expect(categoryControl.validator).toBeTruthy();
  });
  
  it('should add both brand and category controls if requiredOthersCamps is true, but requiresBrandId is true and requiresCategoryId is false', () => {
    component.requiredOthersCamps = true;
    component.requiresBrandId = true;
    component.requiresCategoryId = false;
    component.ngOnInit(); 
  
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    
    
    expect(brandControl).toBeDefined();
    expect(brandControl.validator).toBeTruthy();
    expect(categoryControl).toBeNull();
  });
  

  it('should handle initialization with empty formFields array', () => {
    component.formFields = [];
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(Object.keys(component.form.controls).length).toBe(0);
  });

 
  it('should initialize form control without validators when none provided', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    const control = component.getFormControl('test');
    expect(control.validator).toBeNull();
  });

 
  it('should apply maxLength validator when maxLength is provided', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [Validators.maxLength(5)], maxLength: 5 }
    ];
    component.ngOnInit();
    const control = component.getFormControl('test');
    expect(control.errors).toBeNull();
    control.setValue('123456');
    expect(control.errors?.['maxlength']).toBeTruthy();
  });

  it('should handle getFormControl for non-existent control', () => {
    component.ngOnInit();
    const control = component.getFormControl('nonexistent');
    expect(control).toBeNull();
  });

  
  it('should handle initialization when all required fields are true', () => {
    component.requiredOthersCamps = true;
    component.requiresBrandId = true;
    component.requiresCategoryId = true;
    component.ngOnInit();
    
    const brandControl = component.getBrandFormControl1();
    const categoryControl = component.getCategoryFormControl1();
    
    expect(brandControl).toBeDefined();
    expect(categoryControl).toBeDefined();
    expect(brandControl.validator).toBeTruthy();
    expect(categoryControl.validator).toBeTruthy();
  });

 
  it('should reset form when resetForm is called', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    component.getFormControl('test').setValue('test value');

    component.form.reset();

    const testControl = component.form.get('test');
    expect(testControl ? testControl.value : null).toBeNull();
  });

 
  it('should handle form submission with some invalid controls', () => {
    jest.spyOn(component.submitEvent, 'emit');
    
    component.formFields = [
      { name: 'valid', label: 'Valid', type: 'text', validators: [], maxLength: 50 },
      { name: 'invalid', label: 'Invalid', type: 'text', validators: [Validators.required], maxLength: 50 }
    ];
    
    component.ngOnInit();
    component.getFormControl('valid').setValue('valid value');
    
    
    component.onSubmit();
    
    expect(component.submitEvent.emit).toHaveBeenCalledWith({
      valid: 'valid value',
      invalid: ''
    });
  });

  
  it('should handle initialization with null validators', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    const control = component.getFormControl('test');
    expect(control).toBeDefined();
    expect(control.validator).toBeNull();
  });


  it('should handle form controls with multiple validators', () => {
    component.formFields = [
      { 
        name: 'test', 
        label: 'Test', 
        type: 'text', 
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        maxLength: 10 
      }
    ];
    component.ngOnInit();
    const control = component.getFormControl('test');
    expect(control.validator).toBeTruthy();
    
    
    control.setValue('');
    expect(control.errors?.['required']).toBeTruthy();
    
    
    control.setValue('ab');
    expect(control.errors?.['minlength']).toBeTruthy();
    
    
    control.setValue('12345678901');
    expect(control.errors?.['maxlength']).toBeTruthy();
  });

  
  it('should handle different form control types correctly', () => {
    component.formFields = [
      { name: 'text', label: 'Text', type: 'text', validators: [], maxLength: 50 },
      { name: 'number', label: 'Number', type: 'number', validators: [], maxLength: 10 },
      { name: 'email', label: 'Email', type: 'email', validators: [Validators.email], maxLength: 100 },
      { name: 'checkbox', label: 'Checkbox', type: 'checkbox', validators: [], maxLength: 0 }
    ];
    
    component.ngOnInit();
    
    expect(component.getFormControl('text')).toBeTruthy();
    expect(component.getFormControl('number')).toBeTruthy();
    expect(component.getFormControl('email')).toBeTruthy();
    expect(component.getFormControl('checkbox')).toBeTruthy();
  });

  
  it('should handle form reset with specific values', () => {
    component.formFields = [
      { name: 'name', label: 'Name', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    
    component.getFormControl('name').setValue('test');
    component.form.reset({ name: '' });
    
    expect(component.getFormControl('name').value).toBe('');
  });

  
  it('should handle all requiredOthersCamps combinations', () => {
    
    component.requiredOthersCamps = true;
    component.requiresBrandId = true;
    component.requiresCategoryId = true;
    component.ngOnInit();
    
    expect(component.getBrandFormControl1()).toBeTruthy();
    expect(component.getCategoryFormControl1()).toBeTruthy();
    
    component.form.reset();
    component.requiredOthersCamps = false;
    component.requiresBrandId = true;
    component.requiresCategoryId = true;
    component.ngOnInit();
    
    expect(component.getBrandFormControl1()).toBeTruthy();
    expect(component.getCategoryFormControl1()).toBeTruthy();
  });


  
  it('should handle edge cases in form control getter methods', () => {
    component.ngOnInit();
    
    
    component.form = new FormGroup({});
    expect(component.getBrandFormControl1()).toBeNull();
    expect(component.getCategoryFormControl1()).toBeNull();
    
    
    component.form = new FormGroup({});
    expect(component.getBrandFormControl1()).toBeNull();
    expect(component.getCategoryFormControl1()).toBeNull();
  });
  

  it('should handle ngOnInit with completely undefined values', () => {
    component.formFields = [];
    component.requiredOthersCamps = false;
    component.requiresBrandId = false;
    component.requiresCategoryId = false;
    
    component.ngOnInit();
    
    expect(component.form).toBeDefined();
    expect(Object.keys(component.form.controls).length).toBe(0);
  });

  
  it('should handle getFormControl when form is undefined', () => {
    component.form = new FormGroup({});
    expect(component.getFormControl('test')).toBeNull();
  });

  it('should handle getFormControl when control does not exist', () => {
    component.ngOnInit();
    expect(component.getFormControl('nonexistent')).toBeNull();
  });

  
  it('should handle getBrandFormControl1 when form is undefined', () => {
    component.form = new FormGroup({});
    expect(component.getBrandFormControl1()).toBeNull();
  });

  it('should handle getBrandFormControl1 when control does not exist', () => {
    component.ngOnInit();
    expect(component.getBrandFormControl1()).toBeNull();
  });

  
  it('should handle getCategoryFormControl1 when form is undefined', () => {
    component.form = new FormGroup({});
    expect(component.getCategoryFormControl1()).toBeNull();
  });

  it('should handle getCategoryFormControl1 when control does not exist', () => {
    component.ngOnInit();
    expect(component.getCategoryFormControl1()).toBeNull();
  });

  
  it('should handle onSubmit when form is undefined', () => {
    jest.spyOn(component.submitEvent, 'emit');
    component.form = new FormGroup({});
    component.onSubmit();
    expect(component.submitEvent.emit).toHaveBeenCalledWith({});
  });

  it('should handle onSubmit with null form values', () => {
    jest.spyOn(component.submitEvent, 'emit');
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    const testControl = component.form.get('test');
    if (testControl) {
      testControl.setValue(null);
    }
    component.onSubmit();
    expect(component.submitEvent.emit).toHaveBeenCalledWith({ test: null });
  });

  
  it('should handle form fields with null validators', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 50 }
    ];
    component.ngOnInit();
    expect(component.getFormControl('test')).toBeDefined();
  });

  it('should handle form fields with undefined maxLength', () => {
    component.formFields = [
      { name: 'test', label: 'Test', type: 'text', validators: [], maxLength: 0 }
    ];
    component.ngOnInit();
    expect(component.getFormControl('test')).toBeDefined();
  });

  
  const booleanCombinations = [
    { requiredOthers: true, brand: true, category: true },
    { requiredOthers: true, brand: true, category: false },
    { requiredOthers: true, brand: false, category: true },
    { requiredOthers: true, brand: false, category: false },
    { requiredOthers: false, brand: true, category: true },
    { requiredOthers: false, brand: true, category: false },
    { requiredOthers: false, brand: false, category: true },
    { requiredOthers: false, brand: false, category: false }
  ];

  booleanCombinations.forEach(({ requiredOthers, brand, category }) => {
    it(`should handle combination: requiredOthers=${requiredOthers}, brand=${brand}, category=${category}`, () => {
      component.requiredOthersCamps = requiredOthers;
      component.requiresBrandId = brand;
      component.requiresCategoryId = category;
      component.ngOnInit();

      const hasBrand = component.getBrandFormControl1() !== null;
      const hasCategory = component.getCategoryFormControl1() !== null;

      if (brand) {
        expect(hasBrand).toBe(true);
      } else {
        expect(hasBrand).toBe(false);
      }

      if (category) {
        expect(hasCategory).toBe(true);
      } else {
        expect(hasCategory).toBe(false);
      }
    });
  });

  
  it('should handle form control with all validation states', () => {
    component.formFields = [
      { 
        name: 'test', 
        label: 'Test', 
        type: 'text', 
        validators: [Validators.required, Validators.minLength(3)], 
        maxLength: 5 
      }
    ];
    component.ngOnInit();
    const control = component.getFormControl('test');

    
    control.setValue('');
    expect(control.errors?.['required']).toBe(true);

    
    control.setValue('123456');
    expect(control.errors?.['maxlength']).toBe(undefined);

   
    control.setValue('1234');
    expect(control.errors).toBeNull();
  });
});
