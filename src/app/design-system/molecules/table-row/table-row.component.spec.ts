import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { TableCellComponent } from '../../atoms/table-cell/table-cell.component';
import { By } from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRowComponent, TableCellComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cells based on rowData input', () => {
    const testData = ['Cell 1', 'Cell 2', 'Cell 3'];
    component.rowData = testData;
    fixture.detectChanges();

    const cellElements = fixture.debugElement.queryAll(By.css('app-table-cell'));
    expect(cellElements.length).toBe(testData.length);

    cellElements.forEach((cellElement, index) => {
      expect(cellElement.componentInstance.content).toBe(testData[index]);
    });
  });

  it('should render each cell with the correct class', () => {
    component.rowData = ['Sample Data'];
    fixture.detectChanges();

    const cellElement = fixture.debugElement.query(By.css('app-table-cell.table__row--cell'));
    expect(cellElement).toBeTruthy();
  });
});
