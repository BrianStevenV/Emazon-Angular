import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableHeaderRowComponent } from '../../molecules/table-header-row/table-header-row.component';
import { TableRowComponent } from '../../molecules/table-row/table-row.component';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TableComponent,
        TableHeaderRowComponent,
        TableRowComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers', () => {
    component.headers = ['Name', 'Age', 'Country'];
    fixture.detectChanges();

    const headerRow = fixture.debugElement.query(By.css('.table__component--header'));
    expect(headerRow).toBeTruthy();
    
    expect(headerRow.componentInstance.headers).toEqual(component.headers);
  });

  it('should render table rows based on data input', () => {
    component.data = [
      ['John Doe', 28, 'USA'],
      ['Jane Smith', 34, 'Canada']
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('app-table-row'));
    expect(rows.length).toBe(component.data.length);
  });

  it('should display correct data in each table row', () => {
    component.data = [
      ['John Doe', 28, 'USA'],
      ['Jane Smith', 34, 'Canada']
    ];
    fixture.detectChanges();
  
    const rows = fixture.debugElement.queryAll(By.css('app-table-row'));
    expect(rows.length).toBe(component.data.length);
  
    rows.forEach((row, index) => {
      expect(row.componentInstance.rowData).toEqual(component.data[index]);
  
      const cellComponents = row.queryAll(By.css('table__component--row'));
      cellComponents.forEach((cell, cellIndex) => {
        expect(cell.nativeElement.textContent.trim()).toBe(String(component.data[index][cellIndex]));
      });
    });
  });
  

  it('should not render any rows when data is empty', () => {
    component.data = [];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('app-table-row'));
    expect(rows.length).toBe(0);
  });
});
