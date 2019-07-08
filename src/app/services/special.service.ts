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
      let itemsToDiscount = numberScanned / availableItem.special.itemsToBuy;
      const itemHasLimit = availableItem.special.limit > 0;
      const timesAllowedToDiscount = itemHasLimit ?
        (availableItem.special.limit / (availableItem.special.itemsToBuy + availableItem.special.itemsToDiscount)) : 0;

      itemsToDiscount = timesAllowedToDiscount !== 0 && itemsToDiscount > timesAllowedToDiscount ?
        timesAllowedToDiscount : itemsToDiscount;
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
      let timesToDiscount = numberScanned / availableItem.special.itemsToBuy;
      const itemHasLimit = availableItem.special.limit > 0;
      timesToDiscount = itemHasLimit ? availableItem.special.limit / availableItem.special.itemsToBuy : timesToDiscount;
      const remainingItems = numberScanned - (timesToDiscount * availableItem.special.itemsToBuy);

      const discountedCost = timesToDiscount * availableItem.special.fixedDiscountedPrice;
      const fullPriceItems = remainingItems * availableItem.price;

      return discountedCost + fullPriceItems;
    } else {
      return numberScanned * availableItem.price;
    }
  }
}
