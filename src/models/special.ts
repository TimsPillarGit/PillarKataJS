import { SpecialType } from './special-type';

export class Special {
    itemsToBuy: number;
    itemsToDiscount: number;
    discount: number;
    type: SpecialType;
    fixedDiscountedPrice: number;
    limit: 0;

    constructor() {
        this.type = SpecialType.none;
    }

    addBuyNGetXOffMSpecial(values: any) {
        this.itemsToBuy = values.itemsToBuy;
        this.itemsToDiscount = values.itemsToDiscount;
        this.discount = values.discount;
        this.type = SpecialType.getXOffNBuyM;
        this.limit = values.limit !== null ? values.limit : 0;
    }

    addBuyNGetAllForMPrice(values: any) {
        this.type = SpecialType.getXForM;
        this.itemsToBuy = values.itemsToBuy;
        this.fixedDiscountedPrice = values.fixedDiscountedPrice;
        this.limit = values.limit !== null ? values.limit : 0;
    }
}