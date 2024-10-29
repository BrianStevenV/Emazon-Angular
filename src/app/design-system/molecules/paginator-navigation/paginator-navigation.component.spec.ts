
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PaginatorNavigationComponent } from './paginator-navigation.component';
import { By } from '@angular/platform-browser';
import { 
  BUTTON_FIRST_PAGE_NAME, 
  BUTTON_PREVIOUS_PAGE_NAME, 
  BUTTON_NEXT_PAGE_NAME, 
  BUTTON_LAST_PAGE_NAME,
  BUTTON_TYPE,
  FIRST_PAGE,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  LAST_PAGE 
} from 'src/app/shared/constants/design-system/molecules/paginator-navigation.constants';

// Mock ButtonComponent
@Component({
  selector: 'app-button',
  template: '<button>{{buttonName}}</button>'
})
class MockButtonComponent {
  @Input() buttonName: string = '';
  @Input() buttonType: string = '';
}

describe('PaginatorNavigationComponent', () => {
  let component: PaginatorNavigationComponent;
  let fixture: ComponentFixture<PaginatorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PaginatorNavigationComponent,
        MockButtonComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial values', () => {
    it('should initialize button names with correct constants', () => {
      expect(component.firstPageName).toBe(BUTTON_FIRST_PAGE_NAME);
      expect(component.previousPageName).toBe(BUTTON_PREVIOUS_PAGE_NAME);
      expect(component.nextPageName).toBe(BUTTON_NEXT_PAGE_NAME);
      expect(component.lastPageName).toBe(BUTTON_LAST_PAGE_NAME);
    });

    it('should initialize buttonType with correct constant', () => {
      expect(component.buttonType).toBe(BUTTON_TYPE);
    });
  });

  describe('Navigation methods', () => {
    it('should emit FIRST_PAGE when onFirstPage is called', () => {
      // Arrange
      jest.spyOn(component.navigate, 'emit');
      
      // Act
      component.onFirstPage();
      
      // Assert
      expect(component.navigate.emit).toHaveBeenCalledWith(FIRST_PAGE);
    });

    it('should emit PREVIOUS_PAGE when onPreviousPage is called', () => {
      // Arrange
      jest.spyOn(component.navigate, 'emit');
      
      // Act
      component.onPreviousPage();
      
      // Assert
      expect(component.navigate.emit).toHaveBeenCalledWith(PREVIOUS_PAGE);
    });

    it('should emit NEXT_PAGE when onNextPage is called', () => {
      // Arrange
      jest.spyOn(component.navigate, 'emit');
      
      // Act
      component.onNextPage();
      
      // Assert
      expect(component.navigate.emit).toHaveBeenCalledWith(NEXT_PAGE);
    });

    it('should emit LAST_PAGE when onLastPage is called', () => {
      // Arrange
      jest.spyOn(component.navigate, 'emit');
      
      // Act
      component.onLastPage();
      
      // Assert
      expect(component.navigate.emit).toHaveBeenCalledWith(LAST_PAGE);
    });
  });

  describe('Template rendering', () => {
    it('should render four app-button components', () => {
      const buttons = fixture.debugElement.queryAll(By.css('app-button'));
      expect(buttons.length).toBe(4);
    });

    it('should pass correct properties to first page button', () => {
      const firstButton = fixture.debugElement.queryAll(By.css('app-button'))[0];
      const buttonComponent = firstButton.componentInstance;
      expect(buttonComponent.buttonName).toBe(BUTTON_FIRST_PAGE_NAME);
      expect(buttonComponent.buttonType).toBe(BUTTON_TYPE);
    });

    it('should pass correct properties to previous page button', () => {
      const previousButton = fixture.debugElement.queryAll(By.css('app-button'))[1];
      const buttonComponent = previousButton.componentInstance;
      expect(buttonComponent.buttonName).toBe(BUTTON_PREVIOUS_PAGE_NAME);
      expect(buttonComponent.buttonType).toBe(BUTTON_TYPE);
    });

    it('should pass correct properties to next page button', () => {
      const nextButton = fixture.debugElement.queryAll(By.css('app-button'))[2];
      const buttonComponent = nextButton.componentInstance;
      expect(buttonComponent.buttonName).toBe(BUTTON_NEXT_PAGE_NAME);
      expect(buttonComponent.buttonType).toBe(BUTTON_TYPE);
    });

    it('should pass correct properties to last page button', () => {
      const lastButton = fixture.debugElement.queryAll(By.css('app-button'))[3];
      const buttonComponent = lastButton.componentInstance;
      expect(buttonComponent.buttonName).toBe(BUTTON_LAST_PAGE_NAME);
      expect(buttonComponent.buttonType).toBe(BUTTON_TYPE);
    });
  });

  describe('Button click events', () => {
    it('should call onFirstPage when first button is clicked', () => {
      // Arrange
      const firstButton = fixture.debugElement.queryAll(By.css('app-button'))[0];
      const spy = jest.spyOn(component, 'onFirstPage');
      
      // Act
      firstButton.triggerEventHandler('onClick', null);
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call onPreviousPage when previous button is clicked', () => {
      // Arrange
      const previousButton = fixture.debugElement.queryAll(By.css('app-button'))[1];
      const spy = jest.spyOn(component, 'onPreviousPage');
      
      // Act
      previousButton.triggerEventHandler('onClick', null);
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call onNextPage when next button is clicked', () => {
      // Arrange
      const nextButton = fixture.debugElement.queryAll(By.css('app-button'))[2];
      const spy = jest.spyOn(component, 'onNextPage');
      
      // Act
      nextButton.triggerEventHandler('onClick', null);
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call onLastPage when last button is clicked', () => {
      // Arrange
      const lastButton = fixture.debugElement.queryAll(By.css('app-button'))[3];
      const spy = jest.spyOn(component, 'onLastPage');
      
      // Act
      lastButton.triggerEventHandler('onClick', null);
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});