import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { SortDirection } from 'src/app/shared/models/paginator.model';
import { FIRST_PAGE, LAST_PAGE, NEXT_PAGE, PREVIOUS_PAGE } from 'src/app/shared/constants/design-system/molecules/paginator-navigation.constants';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.totalItems = 100; 
    component.itemsPerPage = 10; 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    expect(component.totalPages).toBe(10); 
  });

  it('should calculate startItem and endItem correctly for first page', () => {
    component.currentPage = 1;
    expect(component.startItem).toBe(1);
    expect(component.endItem).toBe(10);
  });

  it('should calculate startItem and endItem correctly for last page', () => {
    component.currentPage = component.totalPages;
    expect(component.startItem).toBe(91);
    expect(component.endItem).toBe(100);
  });

  it('should navigate to first page', () => {
    component.currentPage = 5;
    component.goToPage(FIRST_PAGE);
    expect(component.currentPage).toBe(1);
  });

  it('should navigate to previous page', () => {
    component.currentPage = 5;
    component.goToPage(PREVIOUS_PAGE);
    expect(component.currentPage).toBe(4);
  });

  it('should navigate to next page', () => {
    component.currentPage = 1;
    component.goToPage(NEXT_PAGE);
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to last page', () => {
    component.goToPage(LAST_PAGE);
    expect(component.currentPage).toBe(component.totalPages);
  });

  it('should emit itemsPerPageChange when items per page is changed', () => {
    jest.spyOn(component.itemsPerPageChange, 'emit');
    component.onItemsPerPageChange(20);
    expect(component.itemsPerPage).toBe(20);
    expect(component.itemsPerPageChange.emit).toHaveBeenCalledWith(20);
  });

  it('should emit sortDirectionChange when sort direction is changed', () => {
    jest.spyOn(component.sortDirectionChange, 'emit');
    component.onSortDirectionChange(SortDirection.ASC);
    expect(component.sortDirectionChange.emit).toHaveBeenCalledWith(SortDirection.ASC);
  });

  it('should emit pageChange when page changes', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.goToPage(NEXT_PAGE);
    expect(component.pageChange.emit).toHaveBeenCalledWith(component.currentPage);
  });
});
