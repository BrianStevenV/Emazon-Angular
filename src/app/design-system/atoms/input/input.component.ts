import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements OnInit {


  @Input() value!: string | undefined | boolean;

  @Input() inputControl = new FormControl();
  @Input() inputType!: string;
  @Input() maxLength!: number;

  public onChange: any = () => {};
  public onTouch: any = () => {};
  
  constructor() { }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.inputType === 'checkbox') {
      this.value = input.checked;
    } else {
      this.value = input.value.slice(0, this.maxLength);
    }
    
    this.onChange(this.value);
  }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


}
