import { Component, OnInit } from '@angular/core';
import { TOAST_VISIBILITY_DURATION } from 'src/app/shared/constants/category/category.constants';
import { Toast, ToastType } from 'src/app/shared/models/toast.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  message!: string;
  isVisible!: boolean;
  type: ToastType = ToastType.SUCCESS;

  constructor(private readonly toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      
      this.createToast(toast);
      this.showToastDuration();
      
    })
  }

  private createToast(toast: Toast){
    this.message = toast.message
    this.type = toast.type
    this.isVisible = true;
  }

  private showToastDuration(){
    setTimeout(() => {
      this.isVisible = false;
    }, TOAST_VISIBILITY_DURATION);
  }

}
