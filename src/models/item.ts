export class Item {
    name: string;
    price: number;
    weight: number;

    constructor(values?: any) {
        this.name = values && values.name ? values.name : null;
        this.price = values && values.price ? values.price : null;
        this.weight = values && values.weight ? values.weight : null;
    }
}