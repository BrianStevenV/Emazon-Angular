import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BUTTON_DROPDOWN_NAME, BUTTON_DROPDOWN_TYPE } from 'src/app/shared/constants/design-system/molecules/dropdown.constants';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() buttonName!: string;
  @Input() buttonType = BUTTON_DROPDOWN_TYPE;

  changeStateDropdown: boolean = false;

  changeDropdownState() {
    this.changeStateDropdown = !this.changeStateDropdown;
    this.activateDropdown = true;
  }



  @Input() items!: any[];
  @Input() filteredItems!: any[];
  @Input() selectedItems!: any[];

  @Input() display!: string;
  @Input() id!: string;
  @Input() maxSelectedItems!: number;

  @Output() selectedItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  @Input() formControl!: FormControl;

  @Input() controlName!: string;

  activateDropdown: boolean = true;


  buttonDropdownName = BUTTON_DROPDOWN_NAME;
  buttonDropdownType = BUTTON_DROPDOWN_TYPE;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() { }
  
  writeValue(obj: any): void {
    if (obj && Array.isArray(obj)) {
      this.selectedItems = this.items.filter(item => obj.includes(item[this.id]));
    } else {
      this.selectedItems = [];
    }
  }
  
  connectToForm(control: FormControl) {
    this.formControl = control;
    if (this.formControl) {
      this.formControl.valueChanges.subscribe(value => {
        this.writeValue(value);
      });
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if(this.formControl) {
      isDisabled ? this.formControl.disable() : this.formControl.enable();
    }
  }

  ngOnInit(): void {
  }

  onSelectItem(item: any) {
    if (!this.selectedItems.includes(item) && this.selectedItems.length < this.maxSelectedItems) {
      this.selectedItems.push(item);
      this.formControl.setValue(this.selectedItems.map(selected => selected[this.id]));
      this.onChange(this.selectedItems.map(selected => selected[this.id]));
      this.selectedItem.emit(item);
    }
  
    
    if (this.selectedItems.length >= this.maxSelectedItems) {
      this.activateDropdown = false;
      this.selectedItem.emit(item);
    }
  }
  

  onRemoveItem(item: any) {
    this.selectedItems = this.selectedItems.filter(id => id !== item);
    this.removeItem.emit(item);
  }
 
  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
