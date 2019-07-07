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

  it('should allow to add two items to available items with same name', () => {
    addPeanutsToAvailableItems();
    expect(component.availableItems.length).toBe(1);
    addPeanutsToAvailableItems();
    expect(component.availableItems.length).toBe(1);
  });

  it('should not allow to scan an item if it is not an available item', () => {
    scanPeanutItem(1);
    expect(component.scannedItems.length).toBe(0);
  });

  describe('when peanuts are an available item', () => {
    beforeEach(() => {
      addPeanutsToAvailableItems();
    });

    it('should allow to scan an item', () => {
      scanPeanutItem(1);
      expect(component.scannedItems.length).toBe(1);
    });

    it('should update total correctly if scan same item twice', () => {
      scanPeanutItem(2);
      expect(component.scannedItems.length).toBe(1);
    });
  });

  function addPeanutsToAvailableItems() {
    const itemToAdd = {
      name: 'peanuts',
      price: 2,
      weight: 1
    };

    component.addToAvailableItems(new Item(itemToAdd));
  }

  function scanPeanutItem(numberOfTimesToScan: number) {
    let i = 0;
    while (i < numberOfTimesToScan) {
      const itemToScan = {
        name: 'peanuts',
        price: 2,
        weight: 1
      };

      component.scanItem(new Item(itemToScan));
      i++;
    }
  }
});
