import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() nameLabel!: string;
  @Input() inputType!: string;
  @Input() inputControl!: FormControl; 
  @Input() maxLength!: number;

  @Input() value!: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
