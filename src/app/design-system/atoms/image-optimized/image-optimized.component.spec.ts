import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOptimizedComponent } from './image-optimized.component';

describe('ImageOptimizedComponent', () => {
  let component: ImageOptimizedComponent;
  let fixture: ComponentFixture<ImageOptimizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageOptimizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageOptimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
