export class SaleDetail {


    constructor(
        public itemId: string,
        public description: string,
        public model: string,
        public quantity: number = 0,
        public price = 0,
        public amount: number = 0,

    ) {
    }
}
