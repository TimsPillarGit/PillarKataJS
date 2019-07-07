import { Injectable } from '@angular/core';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  constructor() { }

  calculateBuyNGetMAtXOffSpecialTotal(availableItem: Item, scannedItem: Item) {
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
}
