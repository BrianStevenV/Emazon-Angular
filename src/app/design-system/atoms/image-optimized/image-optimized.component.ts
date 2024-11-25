import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-optimized',
  templateUrl: './image-optimized.component.html',
  styleUrls: ['./image-optimized.component.scss']
})
export class ImageOptimizedComponent implements OnInit {

  @Input() imagePath !: string;

  constructor() { }

  ngOnInit(): void {
  }

}
