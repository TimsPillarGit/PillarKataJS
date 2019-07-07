import { Injectable } from '@angular/core';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  constructor() { }

  calculateBuyNGetMAtXOffTotal(availableItem: Item, scannedItem: Item) {
    const numberScanned = scannedItem.weight / availableItem.weight;

    if (numberScanned >= availableItem.special.itemsToBuy) {
      let discountedTotal = 0;
      let fullPriceTotal = 0;
      const itemsToDiscount = numberScanned / availableItem.special.itemsToBuy;

      discountedTotal += itemsToDiscount * (availableItem.price * availableItem.special.discount);
      fullPriceTotal += (numberScanned - itemsToDiscount) * availableItem.price;

      return discountedTotal + fullPriceTotal;
    } else {
      return numberScanned * availableItem.price;
    }
  }

  calculateGetXForMTotal(availableItem: Item, scannedItem: Item) {
    const numberScanned = scannedItem.weight / availableItem.weight;

    if (numberScanned >= availableItem.special.itemsToBuy) {
      const timesToDiscount = numberScanned / availableItem.special.itemsToBuy;
      const remainingItems = numberScanned - (timesToDiscount * availableItem.special.itemsToBuy);

      const discountedTotal = timesToDiscount * availableItem.special.fixedDiscountedPrice;
      const fullPriceTotal = remainingItems * availableItem.price;

      return discountedTotal + fullPriceTotal;
    }
    else {
      return numberScanned * availableItem.price;
    }
  }
}
