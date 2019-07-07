import { Component } from '@angular/core';
import { Item } from 'src/models/item';
import { SpecialType } from 'src/models/special-type';
import { SpecialService } from './services/special.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  availableItems: Item[] = [];
  checkoutTotal = 0;
  scannedItems: Item[] = [];

  constructor(private specialService: SpecialService) { }

  addToAvailableItems(itemToAdd: Item) {
    const hasItem = this.availableItems.findIndex(asi => asi.name === itemToAdd.name);
    if (hasItem === -1) {
      this.availableItems.push(itemToAdd);
    }
  }

  scanItem(scannedItem: Item) {
    const availableItem = this.availableItems.find(ai => ai.name === scannedItem.name);

    if (availableItem) {
      const itemAlreadyScanned = this.scannedItems.find(si => si.name === availableItem.name);

      if (itemAlreadyScanned) {
        itemAlreadyScanned.weight += availableItem.weight;
        itemAlreadyScanned.total += availableItem.price;
      } else {
        scannedItem.total = availableItem.price;
        this.scannedItems.push(scannedItem);
      }
    }
  }

  calculateTotal() {
    this.checkoutTotal = 0;

    this.scannedItems.forEach((scannedItem) => {
      const availableItem = this.availableItems.find(ai => ai.name === scannedItem.name);
      const numberScanned = scannedItem.weight / availableItem.weight;

      if (availableItem.special.type !== SpecialType.none) {
        this.checkoutTotal += this.determineSpecialTotal(availableItem, scannedItem);
      } else {
        this.checkoutTotal += (scannedItem.price - scannedItem.markdown) * numberScanned;
      }
    });
  }

  determineSpecialTotal(availableItem: Item, scannedItem: Item) {
    switch (availableItem.special.type) {
      case SpecialType.getXOffNBuyM:
        return this.specialService.calculateBuyNGetMAtXOffTotal(availableItem, scannedItem);
      case SpecialType.getXForM:
        return this.specialService.calculateGetXForMTotal(availableItem, scannedItem);
    }
  }
}
