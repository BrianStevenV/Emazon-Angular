import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title!: string;
  @Input() closeButtonName!: string;
  @Input() submitButtonName!: string;
  @Input() formFields: { name: string, label: string, type: string, validators: any[], maxLength: number }[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<any>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.formFields.forEach(field => {
      this.form.addControl(field.name, new FormControl('', field.validators));
    });
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onSubmit(): void {
    this.submitEvent.emit(this.form.value);
  }

  close(): void {
    this.closeModalEvent.emit();
  }


}
