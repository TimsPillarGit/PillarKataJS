import { Component } from '@angular/core';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  availableItems: Item[] = [];
  scannedItems: Item[] = [];
  checkoutTotal = 0;

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

    this.scannedItems.forEach((si) => {
      const availableItem = this.availableItems.find(ai => ai.name === si.name);
      const numberScanned = si.weight / availableItem.weight;
      this.checkoutTotal += si.price * numberScanned;
    });
  }

}
