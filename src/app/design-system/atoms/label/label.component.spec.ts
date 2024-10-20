import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should render the nameLabel input correctly', () => {
    component.nameLabel = 'Test Label';
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Label'); 
  });

  
  it('should not render any label when nameLabel is empty', () => {
    component.nameLabel = '';
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toBe(''); 
  });

  
  it('should not render any label when nameLabel is undefined', () => {
    component.nameLabel = undefined as unknown as string; 
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toBe(''); 
  });
});
