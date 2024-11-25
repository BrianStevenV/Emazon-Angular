import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() nameLink !: string;
  @Input() path?: string;
  @Output() linkClick = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.linkClick.emit(this.path);
  }
}
