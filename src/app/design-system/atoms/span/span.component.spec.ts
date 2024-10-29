import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpanComponent } from './span.component';
import { By } from '@angular/platform-browser';

describe('SpanComponent', () => {
  let component: SpanComponent;
  let fixture: ComponentFixture<SpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpanComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text format with input values', () => {
    component.start = 1;
    component.end = 10;
    component.total = 100;
    fixture.detectChanges();

    const spanElement: HTMLElement = fixture.debugElement.query(By.css('.span')).nativeElement;
    expect(spanElement.textContent).toBe('1 - 10 of 100');
  });

  it('should update the displayed text when input values change', () => {
    
    component.start = 5;
    component.end = 15;
    component.total = 50;
    fixture.detectChanges();

    let spanElement: HTMLElement = fixture.debugElement.query(By.css('.span')).nativeElement;
    expect(spanElement.textContent).toBe('5 - 15 of 50');

    component.start = 10;
    component.end = 20;
    component.total = 200;
    fixture.detectChanges();

    spanElement = fixture.debugElement.query(By.css('.span')).nativeElement;
    expect(spanElement.textContent).toBe('10 - 20 of 200');
  });
});
