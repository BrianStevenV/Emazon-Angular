import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit {

  @Input() header!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
