import { Component, OnInit } from '@angular/core';
import { BUTTON_OPEN_MODAL_NAME, BUTTON_OPEN_MODAL_TYPE, ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE, MODAL_CLOSE_BUTTON_NAME, MODAL_FORM_FIELDS_DESCRIPTION_BRAND_DESCRIPTION, MODAL_FORM_FIELDS_LABEL_BRAND_DESCRIPTION, MODAL_FORM_FIELDS_LABEL_BRAND_NAME, MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_DESCRIPTION, MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_NAME, MODAL_FORM_FIELDS_NAME_BRAND_NAME, MODAL_FORM_FIELDS_TYPE_TEXT, MODAL_FORM_FIELDS_TYPE_TEXTAREA, MODAL_TITLE, MODAL_VISIBLE, SUCCESS_MESSAGES_POST } from 'src/app/shared/constants/brand/brand.constants';
import { MODAL_SUBMIT_BUTTON_NAME } from 'src/app/shared/constants/category/category.constants';
import { Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand.model';
import { ToastType } from 'src/app/shared/models/toast.model';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  buttonOpenModalName = BUTTON_OPEN_MODAL_NAME;
  buttonOpenModalType = BUTTON_OPEN_MODAL_TYPE;
  modalVisible = MODAL_VISIBLE;

  modalTitle = MODAL_TITLE;
  modalCloseButtonName = MODAL_CLOSE_BUTTON_NAME;
  modalSubmitButtonName = MODAL_SUBMIT_BUTTON_NAME;
  modalFormFields = [
    {name: MODAL_FORM_FIELDS_NAME_BRAND_NAME, label: MODAL_FORM_FIELDS_LABEL_BRAND_NAME, type: MODAL_FORM_FIELDS_TYPE_TEXT, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_NAME)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_NAME},
    {name: MODAL_FORM_FIELDS_DESCRIPTION_BRAND_DESCRIPTION, label: MODAL_FORM_FIELDS_LABEL_BRAND_DESCRIPTION, type: MODAL_FORM_FIELDS_TYPE_TEXTAREA, validators: [Validators.required, Validators.maxLength(MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_DESCRIPTION)], maxLength: MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_DESCRIPTION}
  ];

  constructor(
    private readonly brandService: BrandService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  onModalSubmit(formData: any): void {
    const requiredFields = this.extractRequiredFields();
    const missingFields = this.findMissingFields(requiredFields, formData);
  
    if (missingFields.length > 0) {
      this.showMissingFieldsWarning(missingFields);
      return;
    }
  
    const brandData = this.mapToCategoryData(formData);
    this.createBrand(brandData);
  }

  createBrand(brandData: any): void {
    this.brandService.createBrand(brandData).subscribe({

      next: (response: HttpResponse<Brand>) => {
        const message = response.status === HttpStatusCode.Created ? SUCCESS_MESSAGES_POST.BRAND_CREATED : SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE;
        this.toastService.showToast(message, ToastType.SUCCESS);

      },

      error: (error) => {
        const message = 
          ERROR_MESSAGES_BY_CODE[
            error.status as keyof typeof ERROR_MESSAGES_BY_CODE
          ] || GENERIC_ERROR_MESSAGE;
        this.toastService.showToast(message, ToastType.ERROR);
      }
    })
  }

  private extractRequiredFields(): { name: string, label: string }[] {
    return this.modalFormFields.map(({ name, label }) => ({ name, label }));
  }
  
  private findMissingFields(requiredFields: { name: string, label: string }[], formData: any): string[] {
    return requiredFields
      .filter(({ name }) => {
        
        return !formData.hasOwnProperty(name) || !formData[name] || formData[name].trim() === '';
      })
      .map(({ label }) => label);
  }
  
  private showMissingFieldsWarning(missingFields: string[]): void {
    const message = `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required.`;
    this.toastService.showToast(message, ToastType.WARNING);
  }
  
  private mapToCategoryData(formData: any): Brand {
    return {
      name: formData.brandName,
      description: formData.brandDescription
    };
  }

}
