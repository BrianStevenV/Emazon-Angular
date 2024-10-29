import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-header-row',
  templateUrl: './table-header-row.component.html',
  styleUrls: ['./table-header-row.component.scss']
})
export class TableHeaderRowComponent implements OnInit {

  @Input() headers!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
