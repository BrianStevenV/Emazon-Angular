import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { Toast, ToastType } from '../../models/toast.model';
import 'zone.js/testing';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a toast message', (done) => {
    const toastMessage = 'Test toast message';
    const toastType = ToastType.SUCCESS;

    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toEqual(toastMessage);
      expect(toast.type).toEqual(toastType);
      done(); 
    });

    service.showToast(toastMessage, toastType);
  });

  it('should emit a toast message with type INFO', (done) => {
    const toastMessage = 'Info toast message';
    
    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toEqual(toastMessage);
      expect(toast.type).toEqual(ToastType.INFO); 
      done();
    });

    service.showToast(toastMessage, ToastType.INFO);
  });

  it('should emit a toast message with type WARNING', (done) => {
    const toastMessage = 'Warning toast message';
    
    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toEqual(toastMessage);
      expect(toast.type).toEqual(ToastType.WARNING);
      done();
    });

    service.showToast(toastMessage, ToastType.WARNING);
  });

  it('should emit a toast message with type ERROR', (done) => {
    const toastMessage = 'Error toast message';
    
    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toEqual(toastMessage);
      expect(toast.type).toEqual(ToastType.ERROR); 
      done();
    });

    service.showToast(toastMessage, ToastType.ERROR);
  });

  it('should emit a toast message with default type when no type is provided', (done) => {
    const toastMessage = 'Default type toast message';
    
    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toEqual(toastMessage);
      expect(toast.type).toEqual(ToastType.SUCCESS); 
      done();
    });

    service.showToast(toastMessage); 
  });
});
