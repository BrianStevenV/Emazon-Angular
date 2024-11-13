import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSubmitComponent } from './form-submit.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Field } from 'src/app/shared/models/utils/util.model';
import { By } from '@angular/platform-browser';

describe('FormSubmitComponent', () => {
  let component: FormSubmitComponent;
  let fixture: ComponentFixture<FormSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormSubmitComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitComponent);
    component = fixture.componentInstance;

    component.fields = [
      { nameLabel: 'username', formControlName: 'Username', inputType: 'text', validators: [], maxLength: 20 },
      { nameLabel: 'password', formControlName: 'Password', inputType: 'password', validators: [], maxLength: 20 }
    ];

    component.submitButtonName = 'Submit';
    component.submitButtonType = 'submit';

    component.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct form control', () => {
    const usernameControl = component.getFormControl('username');
    const passwordControl = component.getFormControl('password');
    
    expect(usernameControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(usernameControl instanceof FormControl).toBe(true);
    expect(passwordControl instanceof FormControl).toBe(true);
  });

  
  
  

  it('should have form group and form controls defined', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('username')).toBeTruthy();
    expect(component.formGroup.get('password')).toBeTruthy();
  });
});
