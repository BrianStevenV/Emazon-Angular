import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.scss']
})
export class SpanComponent implements OnInit {

  @Input() start!: number;
  @Input() end!: number;
  @Input() total!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
