import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options!: {value: any; label: any}[];
  @Output() onSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(event: Event): void {
    let value = (event.target as HTMLSelectElement).value;
    this.onSelect.emit(value);
  }
}
