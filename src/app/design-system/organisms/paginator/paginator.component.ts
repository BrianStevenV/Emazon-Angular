import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FIRST_PAGE, PREVIOUS_PAGE, NEXT_PAGE, LAST_PAGE } from 'src/app/shared/constants/design-system/molecules/paginator-navigation.constants';
import { SortDirection } from 'src/app/shared/models/paginator.model';

import { ITEMS_PER_PAGE_OPTIONS_NUMBER_10, ITEMS_PER_PAGE_OPTIONS_NUMBER_20, 
  ITEMS_PER_PAGE_OPTIONS_NUMBER_30, ITEMS_PER_PAGE_OPTIONS_NUMBER_5, 
  ITEMS_PER_PAGE_OPTIONS_NUMBER_50, NUMBER_OPERATION_PAGINATOR, 
  SORT_DIRECTION_LABEL_OPTIONS_ASC, SORT_DIRECTION_LABEL_OPTIONS_DESC } 
  from 'src/app/shared/constants/design-system/organism/paginator.constants';



@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() totalItems!: number;
  @Input() itemsPerPage !: number;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() sortDirectionChange = new EventEmitter<SortDirection>();

  private lastValidResult !: number;

  currentPage = 1;

  itemsPerPageOptions = [
    { value: ITEMS_PER_PAGE_OPTIONS_NUMBER_5, label: String(ITEMS_PER_PAGE_OPTIONS_NUMBER_5) },
    { value: ITEMS_PER_PAGE_OPTIONS_NUMBER_10, label: String(ITEMS_PER_PAGE_OPTIONS_NUMBER_10) },
    { value: ITEMS_PER_PAGE_OPTIONS_NUMBER_20, label: String(ITEMS_PER_PAGE_OPTIONS_NUMBER_20) },
    { value: ITEMS_PER_PAGE_OPTIONS_NUMBER_30, label: String(ITEMS_PER_PAGE_OPTIONS_NUMBER_30) },
    { value: ITEMS_PER_PAGE_OPTIONS_NUMBER_50, label: String(ITEMS_PER_PAGE_OPTIONS_NUMBER_50) }
  ];

  sortDirectionOptions = [
    { value: SortDirection.ASC, label: SORT_DIRECTION_LABEL_OPTIONS_ASC },
    { value: SortDirection.DESC, label: SORT_DIRECTION_LABEL_OPTIONS_DESC }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startItem(): number {
    let result = (this.currentPage - NUMBER_OPERATION_PAGINATOR) * this.itemsPerPage + NUMBER_OPERATION_PAGINATOR;
    if(result < this.totalItems){
      this.lastValidResult = result;
      return result;
    }
    return this.lastValidResult;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  goToPage(action: string): void {
    switch(action) {
      case FIRST_PAGE:
        this.currentPage = NUMBER_OPERATION_PAGINATOR;
        this.pageChange.emit(this.currentPage);
        break;
      case PREVIOUS_PAGE:
        this.currentPage = Math.max(NUMBER_OPERATION_PAGINATOR, this.currentPage - NUMBER_OPERATION_PAGINATOR);
        this.pageChange.emit(this.currentPage);
        break;
      case NEXT_PAGE:
        this.currentPage = Math.min(this.totalPages, this.currentPage + NUMBER_OPERATION_PAGINATOR);
        this.pageChange.emit(this.currentPage);
        break;
      case LAST_PAGE:
        this.currentPage = this.totalPages;
        this.pageChange.emit(this.currentPage);
        break;
    }
  }

  onItemsPerPageChange(items: number) {
    this.itemsPerPage = Number(items);
    this.itemsPerPageChange.emit(this.itemsPerPage);
    console.log(this.itemsPerPage);
  }

  onSortDirectionChange(sortDirection: SortDirection){
    this.sortDirectionChange.emit(sortDirection);
  }

}
