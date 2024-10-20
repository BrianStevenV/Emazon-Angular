import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast, ToastType } from '../../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new Subject<Toast>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string, type: ToastType = ToastType.SUCCESS): void {
    this.toastSubject.next({ message, type });
  }
}
