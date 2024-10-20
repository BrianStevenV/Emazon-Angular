import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE, SUCCESS_MESSAGES_POST } from 'src/app/shared/constants/category/category.constants';
import { ToastType } from 'src/app/shared/models/toast.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  buttonOpenModalName = 'Add Category';
  buttonOpenModalType = 'button';
  modalVisible = false;

  modalTitle = 'Create Category';
  modalCloseButtonName = 'Close';
  modalSubmitButtonName = 'Save';
  modalFormFields = [
    {name: 'categoryName', label: 'Category Name', type: 'text', validators: [Validators.required, Validators.maxLength(50)], maxLength: 50},
    {name: 'categoryDescription', label: 'Category Description', type: 'textarea', validators: [Validators.required, Validators.maxLength(90)], maxLength: 90}
  ];
  

  constructor(
    private readonly categoryService: CategoryService, 
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.modalFormFields.forEach(field => { console.log(field); });
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
  
    const categoryData = this.mapToCategoryData(formData);
    this.createCategory(categoryData);
  }
  
  



  createCategory(categoryData: any): void {
    
    
    this.categoryService.createCategory(categoryData).subscribe({
      
      next: (response: HttpResponse<Category>) => {
        const message = response.status === HttpStatusCode.Created ? SUCCESS_MESSAGES_POST.CATEGORY_CREATED : SUCCESS_MESSAGES_POST.UNEXPECTED_RESPONSE;
        this.toastService.showToast(message, ToastType.SUCCESS);
      
      },
        
      error: (error) => {
    
        const message =
            ERROR_MESSAGES_BY_CODE[
              error.status as keyof typeof ERROR_MESSAGES_BY_CODE
            ] || GENERIC_ERROR_MESSAGE;
            console.log("Mensaje de error que se enviará al toast: ", message);
          this.toastService.showToast(message, ToastType.ERROR);
        },
      }
    );
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
  
  private mapToCategoryData(formData: any): Category {
    return {
      name: formData.categoryName,
      description: formData.categoryDescription
    };
  }
}
