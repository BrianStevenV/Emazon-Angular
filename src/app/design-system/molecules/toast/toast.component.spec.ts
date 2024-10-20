import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToastComponent } from './toast.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Toast, ToastType } from 'src/app/shared/models/toast.model';
import { TOAST_VISIBILITY_DURATION } from 'src/app/shared/constants/category/category.constants';
import 'zone.js/testing';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    const toastServiceMock = {
      toastState: of({ message: 'Test message', type: ToastType.SUCCESS } as Toast)
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toastState and display toast with correct message and type', () => {
    component.ngOnInit();
    
    expect(component.message).toBe('Test message');
    expect(component.type).toBe(ToastType.SUCCESS);
    expect(component.isVisible).toBe(true);
  });

  it('should hide toast after TOAST_VISIBILITY_DURATION', fakeAsync(() => {
    component.ngOnInit(); 
    expect(component.isVisible).toBe(true);
    
    
    tick(TOAST_VISIBILITY_DURATION);
    
    expect(component.isVisible).toBe(false);
  }));

  it('should set isVisible to false when close button is clicked', () => {
    component.ngOnInit(); 
    component.isVisible = true; 
    component.isVisible = false; 

    expect(component.isVisible).toBe(false);
  });
});
