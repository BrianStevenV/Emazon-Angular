import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options correctly', () => {
    component.options = [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
      { value: 'Option 3', label: 'Option 3' }
    ];
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(By.css('option'));
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].nativeElement.textContent).toBe('Option 1');
    expect(optionElements[1].nativeElement.textContent).toBe('Option 2');
    expect(optionElements[2].nativeElement.textContent).toBe('Option 3');
  });

  it('should emit onSelect with the selected option value', () => {
    component.options = [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' }
    ];
    fixture.detectChanges();
    jest.spyOn(component.onSelect, 'emit');

    const selectElement: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = selectElement.options[1].value; 
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    
    expect(component.onSelect.emit).toHaveBeenCalledWith('Option 2');
  });
});
