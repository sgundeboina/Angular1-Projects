
module App.Common {

    export class ProductService {
        calculateMarginPercent(price, cost): number {

            var margin = 0;
            if (price && cost) {
                margin = (100 * (price - cost)) / price;
            }
            margin = Math.round(margin);
            return margin;
        }

        calculateMarginAmount(price, cost): number {
            var margin = 0;
            if (price && cost) {
                margin = price - cost;
            }
            return margin;
        }

        calculatePriceFromPercent(cost, percent): number {

            var price = cost;
            if (cost && percent) {
                price = cost + (cost * percent / 100);
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

        calculatePriceFromAmount(cost, amount): number {
            var price = cost;
            if (cost && amount) {
                price = cost + amount;
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

    }

    angular.module("common.services").service("productService", ProductService);
}