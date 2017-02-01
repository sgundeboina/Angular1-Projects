module App.Domain {
    export interface IProduct {
        productId: number;
        productName: string;
        productCode: string;
        releaseDate: Date;
        price: number;
        cost:number;
        description: string;
        imageUrl: string;
        calculateDiscount(percent: number): number;
        tags: string[];
        
}

    export class Product implements IProduct {

        constructor(public productId: number,
            public productName: string,
            public productCode: string,
            public releaseDate: Date,
            public cost: number,
            public price: number,
            public description: string,
            public imageUrl: string,
            public tags: any[]) {
        }

        calculateDiscount(percent: number): number {
            return this.price - (this.price * percent / 100);
        }
    }
}