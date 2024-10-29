import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BUTTON_FIRST_PAGE_NAME, BUTTON_PREVIOUS_PAGE_NAME, BUTTON_NEXT_PAGE_NAME, BUTTON_LAST_PAGE_NAME, BUTTON_TYPE, FIRST_PAGE, PREVIOUS_PAGE, NEXT_PAGE, LAST_PAGE } from 'src/app/shared/constants/design-system/molecules/paginator-navigation.constants';

@Component({
  selector: 'app-paginator-navigation',
  templateUrl: './paginator-navigation.component.html',
  styleUrls: ['./paginator-navigation.component.scss']
})
export class PaginatorNavigationComponent implements OnInit {

  @Input() isFirstPage!: boolean;
  @Input() isLastPage!: boolean;
  @Output() navigate = new EventEmitter<any>();

  firstPageName = BUTTON_FIRST_PAGE_NAME;
  previousPageName = BUTTON_PREVIOUS_PAGE_NAME;
  nextPageName = BUTTON_NEXT_PAGE_NAME;
  lastPageName = BUTTON_LAST_PAGE_NAME;

  buttonType = BUTTON_TYPE;

  constructor() { }

  ngOnInit(): void {
  }

  onFirstPage(): void {
    this.navigate.emit(FIRST_PAGE);
  }

  onPreviousPage(): void {
    this.navigate.emit(PREVIOUS_PAGE);
  }

  onNextPage(): void {
    this.navigate.emit(NEXT_PAGE);
  }

  onLastPage(): void {
    this.navigate.emit(LAST_PAGE);
  }

}
