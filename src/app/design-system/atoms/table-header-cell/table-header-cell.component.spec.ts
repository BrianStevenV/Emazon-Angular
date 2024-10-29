import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderCellComponent } from './table-header-cell.component';
import { By } from '@angular/platform-browser';

describe('TableHeaderCellComponent', () => {
  let component: TableHeaderCellComponent;
  let fixture: ComponentFixture<TableHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHeaderCellComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header text', () => {
    component.header = 'Test Header';
    fixture.detectChanges();

    const thElement: HTMLElement = fixture.debugElement.query(By.css('th')).nativeElement;
    expect(thElement.textContent).toBe('Test Header');
  });

  it('should update the header text when input changes', () => {
    component.header = 'Initial Header';
    fixture.detectChanges();

    let thElement: HTMLElement = fixture.debugElement.query(By.css('th')).nativeElement;
    expect(thElement.textContent).toBe('Initial Header');

    component.header = 'Updated Header';
    fixture.detectChanges();

    thElement = fixture.debugElement.query(By.css('th')).nativeElement;
    expect(thElement.textContent).toBe('Updated Header');
  });
});
