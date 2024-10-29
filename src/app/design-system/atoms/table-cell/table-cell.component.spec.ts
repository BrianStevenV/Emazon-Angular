import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellComponent } from './table-cell.component';
import { By } from '@angular/platform-browser';

describe('TableCellComponent', () => {
  let component: TableCellComponent;
  let fixture: ComponentFixture<TableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct content', () => {
    component.content = 'Test Content';
    fixture.detectChanges();

    const tdElement: HTMLElement = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdElement.textContent).toBe('Test Content');
  });

  it('should update the content when input changes', () => {
    component.content = 'Initial Content';
    fixture.detectChanges();

    let tdElement: HTMLElement = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdElement.textContent).toBe('Initial Content');

    component.content = 'Updated Content';
    fixture.detectChanges();

    tdElement = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdElement.textContent).toBe('Updated Content');
  });

  it('should handle number content', () => {
    component.content = 123;
    fixture.detectChanges();

    const tdElement: HTMLElement = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdElement.textContent).toBe('123');
  });
});
