import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderRowComponent } from './table-header-row.component';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell/table-header-cell.component';
import { By } from '@angular/platform-browser';

describe('TableHeaderRowComponent', () => {
  let component: TableHeaderRowComponent;
  let fixture: ComponentFixture<TableHeaderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableHeaderRowComponent, TableHeaderCellComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headers passed as input', () => {
    const testHeaders = ['Name', 'Age', 'Location'];
    component.headers = testHeaders;
    fixture.detectChanges();

    const headerCells = fixture.debugElement.queryAll(By.css('app-table-header-cell'));
    expect(headerCells.length).toBe(testHeaders.length);

    headerCells.forEach((headerCell, index) => {
      expect(headerCell.componentInstance.header).toBe(testHeaders[index]);
    });
  });

  it('should render each header cell with correct class', () => {
    component.headers = ['Test Header'];
    fixture.detectChanges();

    const headerCell = fixture.debugElement.query(By.css('app-table-header-cell.header'));
    expect(headerCell).toBeTruthy();
  });
});
