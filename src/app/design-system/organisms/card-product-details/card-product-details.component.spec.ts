import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductDetailsComponent } from './card-product-details.component';

describe('CardProductDetailsComponent', () => {
  let component: CardProductDetailsComponent;
  let fixture: ComponentFixture<CardProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
