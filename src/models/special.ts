import { SpecialType } from './special-type';

export class Special {
    itemsToBuy: number;
    itemsToDiscount: number;
    discount: number;
    type: SpecialType;

    constructor() {
        this.type = SpecialType.none;
    }

    addBuyNGetXOffMSpecial(values: any) {
        this.itemsToBuy = values.itemsToBuy;
        this.itemsToDiscount = values.itemsToDiscount;
        this.discount = values.discount;
        this.type = SpecialType.getXOffNBuyM;
    }
}