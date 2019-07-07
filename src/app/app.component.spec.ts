import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Item } from 'src/models/item';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should allow to add items to available items', () => {
    addPeanutsToAvailableItems();
    expect(component.availableItems.length).toBe(1);
  });

  it('should now allow to add two items to available items with same name', () => {
    addPeanutsToAvailableItems();
    expect(component.availableItems.length).toBe(1);
    addPeanutsToAvailableItems();
    expect(component.availableItems.length).toBe(1);
  });

  function addPeanutsToAvailableItems() {
    const itemToAdd = {
      name: 'peanuts',
      price: 2,
      weight: 1
    };

    component.addToAvailableItems(new Item(itemToAdd));
  }
});
