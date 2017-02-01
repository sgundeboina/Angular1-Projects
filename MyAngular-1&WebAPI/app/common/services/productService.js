var App;
(function (App) {
    var Common;
    (function (Common) {
        var ProductService = (function () {
            function ProductService() {
            }
            ProductService.prototype.calculateMarginPercent = function (price, cost) {
                var margin = 0;
                if (price && cost) {
                    margin = (100 * (price - cost)) / price;
                }
                margin = Math.round(margin);
                return margin;
            };
            ProductService.prototype.calculateMarginAmount = function (price, cost) {
                var margin = 0;
                if (price && cost) {
                    margin = price - cost;
                }
                return margin;
            };
            ProductService.prototype.calculatePriceFromPercent = function (cost, percent) {
                var price = cost;
                if (cost && percent) {
                    price = cost + (cost * percent / 100);
                    price = (Math.round(price * 100)) / 100;
                }
                return price;
            };
            ProductService.prototype.calculatePriceFromAmount = function (cost, amount) {
                var price = cost;
                if (cost && amount) {
                    price = cost + amount;
                    price = (Math.round(price * 100)) / 100;
                }
                return price;
            };
            return ProductService;
        }());
        Common.ProductService = ProductService;
        angular.module("common.services").service("productService", ProductService);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=productService.js.map