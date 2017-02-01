var App;
(function (App) {
    var Domain;
    (function (Domain) {
        var Product = (function () {
            function Product(productId, productName, productCode, releaseDate, cost, price, description, imageUrl, tags) {
                this.productId = productId;
                this.productName = productName;
                this.productCode = productCode;
                this.releaseDate = releaseDate;
                this.cost = cost;
                this.price = price;
                this.description = description;
                this.imageUrl = imageUrl;
                this.tags = tags;
            }
            Product.prototype.calculateDiscount = function (percent) {
                return this.price - (this.price * percent / 100);
            };
            return Product;
        }());
        Domain.Product = Product;
    })(Domain = App.Domain || (App.Domain = {}));
})(App || (App = {}));
//# sourceMappingURL=product.js.map