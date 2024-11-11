import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { BUTTON_DROPDOWN_NAME, BUTTON_DROPDOWN_TYPE } from 'src/app/shared/constants/design-system/molecules/dropdown.constants';
import 'zone.js/testing';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    component.items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    component.selectedItems = [];
    component.id = 'id';
    component.maxSelectedItems = 1;
    component.formControl = new FormControl();
    component.controlName = 'dropdown';

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSelectItem and add selected item when an item is clicked', () => {
    const item = component.items[0];

    jest.spyOn(component.selectedItem, 'emit');
    jest.spyOn(component.formControl, 'setValue');

  
    component.onSelectItem(item);

    expect(component.selectedItems).toContain(item);
    expect(component.selectedItem.emit).toHaveBeenCalledWith(item);
    expect(component.formControl.setValue).toHaveBeenCalledWith([item.id]);
  });

  it('should not add item if maxSelectedItems is reached', () => {
    component.selectedItems = [{ id: 1, name: 'Item 1' }];
    component.maxSelectedItems = 1;

    const item = component.items[0];

    jest.spyOn(component.selectedItem, 'emit');
    jest.spyOn(component.formControl, 'setValue');

    component.onSelectItem(item);

    expect(component.selectedItems.length).toBe(1);  
    
  });

  it('should call onRemoveItem and remove selected item', () => {
    const item = component.items[0];
    component.selectedItems = [item];

    jest.spyOn(component.removeItem, 'emit');

    component.onRemoveItem(item);

    expect(component.selectedItems).not.toContain(item);
    expect(component.removeItem.emit).toHaveBeenCalledWith(item);
  });

  it('should write value to selectedItems correctly', () => {
    const selectedValues = [1];
    component.writeValue(selectedValues);

    expect(component.selectedItems).toEqual([{ id: 1, name: 'Item 1' }]);
  });

  it('should connect to form control and update value changes', () => {
    const control = new FormControl();
    component.connectToForm(control);

    control.setValue([2]);

    fixture.detectChanges();

    expect(component.selectedItems).toEqual([{ id: 2, name: 'Item 2' }]);
  });

  it('should disable the form control when setDisabledState is called with true', () => {
    if (component.setDisabledState) {
      component.setDisabledState(true);
    }
    expect(component.formControl.disabled).toBe(true);
  });

  it('should enable the form control when setDisabledState is called with false', () => {
    if (component.setDisabledState) {
      component.setDisabledState(false);
    }
    expect(component.formControl.enabled).toBe(true);
  });

  it('should handle dropdown state changes correctly', () => {
    component.changeDropdownState();
    expect(component.changeStateDropdown).toBe(true);

    component.changeDropdownState();
    expect(component.changeStateDropdown).toBeFalsy();
  });

  it('should bind the correct button name and type', () => {
    expect(component.buttonDropdownName).toBe(BUTTON_DROPDOWN_NAME);
    expect(component.buttonDropdownType).toBe(BUTTON_DROPDOWN_TYPE);
  });

  it('should emit selectedItem when an item is clicked and dropdown is active', () => {
    const item = component.items[0];
    jest.spyOn(component.selectedItem, 'emit');
    component.onSelectItem(item);

    expect(component.selectedItem.emit).toHaveBeenCalledWith(item);
  });

  it('should disable dropdown when max selected items are reached', () => {
    component.selectedItems = [{ id: 1, name: 'Item 1' }];
    component.maxSelectedItems = 1;
    component.onSelectItem(component.items[1]);  

    expect(component.activateDropdown).toBeFalsy();
  });
});
