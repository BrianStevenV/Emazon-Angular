import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from 'src/app/shared/models/utils/util.model';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss']
})
export class FormSubmitComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() fields!: Field[];

  @Input() submitButtonName!: string;
  @Input() submitButtonType!: string;

  constructor() { }

  ngOnInit(): void {
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }
  
}
