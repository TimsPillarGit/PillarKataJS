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

    it('should allow to scan peanuts', () => {
      scanPeanutItem(1);
      expect(component.scannedItems.length).toBe(1);
    });

    it('should update total correctly if scan peanuts twice', () => {
      scanPeanutItem(2);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(4);
    });

    it('should discount price of peanuts if it has a markdown', () => {
      const markedDownItem = {
        name: 'peanuts',
        price: 2,
        weight: 1,
        total: 0,
        markdown: 1
      };

      component.scanItem(new Item(markedDownItem));
      component.calculateTotal();

      expect(component.checkoutTotal).toBe(1);
    });

    it('should be able to buy n and get x off for peanuts that have a special', () => {
      const special = {
        itemsToBuy: 2,
        itemsToDiscount: 1,
        discount: .5
      };

      component.availableItems[0].special.addBuyNGetXOffMSpecial(special);
      scanPeanutItem(2);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(3);
    });

    it('should be able to create a special to buy n peanuts for a discounted price', () => {
      const special = {
        itemsToBuy: 2,
        fixedDiscountedPrice: 1
      };

      component.availableItems[0].special.addBuyNGetAllForMPrice(special);
      scanPeanutItem(2);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(1);
    });

    it('should be able to place limit on special to buy n and get x off for peanuts', () => {
      const special = {
        itemsToBuy: 2,
        itemsToDiscount: 1,
        discount: .5,
        limit: 6
      };

      component.availableItems[0].special.addBuyNGetXOffMSpecial(special);
      scanPeanutItem(9);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(16);
    });

    it('should be able place limit on a special to buy n peanuts for a discounted price', () => {
      const special = {
        itemsToBuy: 2,
        fixedDiscountedPrice: 1,
        limit: 6
      };

      component.availableItems[0].special.addBuyNGetAllForMPrice(special);
      scanPeanutItem(7);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(5);
    });

    it('should be able to remove a scanned item', () => {
      const itemToRemove = {
        name: 'peanuts',
        price: 2,
        weight: 1
      };

      scanPeanutItem(2);
      expect(component.scannedItems[0].weight).toBe(2);
      component.removeScannedItem(new Item(itemToRemove));
      expect(component.scannedItems[0].weight).toBe(1);
    });

    it('should be able to remove a scanned item and invalidate special', () => {
      const special = {
        itemsToBuy: 2,
        fixedDiscountedPrice: 1
      };

      const itemToRemove = {
        name: 'peanuts',
        price: 2,
        weight: 1
      };

      component.availableItems[0].special.addBuyNGetAllForMPrice(special);
      scanPeanutItem(6);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(3);
      component.removeScannedItem(new Item(itemToRemove));
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(4);
    });

    it('should be able to add a special purchase n weight and receive discount on m weight', () => {
      const itemToRemove = {
        name: 'peanuts',
        price: 2,
        weight: 1
      };

      scanPeanutItem(2);
      expect(component.scannedItems[0].weight).toBe(2);
      component.removeScannedItem(new Item(itemToRemove));
      expect(component.scannedItems[0].weight).toBe(1);
    });

    it('should be able to add a special get n weight and receivea a discount on m weight', () => {
      const special = {
        weightToBuy: 3,
        weightDiscounted: 2,
        discount: .5
      };

      component.availableItems[0].special.addBuyNWeightGetMWeightForMDiscount(special);
      scanPeanutItem(5);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(8);
    });

    it('should be able to add a special get n weight and receivea a discount on m weight with a limit', () => {
      const special = {
        weightToBuy: 3,
        weightDiscounted: 2,
        discount: .5,
        limit: 10
      };

      component.availableItems[0].special.addBuyNWeightGetMWeightForMDiscount(special);
      scanPeanutItem(15);
      component.calculateTotal();
      expect(component.checkoutTotal).toBe(26);
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
