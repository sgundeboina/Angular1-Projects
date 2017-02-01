var App;
(function (App) {
    var products;
    (function (products) {
        var ProductDetail;
        (function (ProductDetail) {
            var ProductDetailCtrl = (function () {
                function ProductDetailCtrl($stateParams, dataAccessService, $state, $log, productService) {
                    var _this = this;
                    this.$stateParams = $stateParams;
                    this.dataAccessService = dataAccessService;
                    this.$state = $state;
                    this.$log = $log;
                    this.productService = productService;
                    this.$log.debug(this.$state.current.data);
                    this.title = "Product Detail";
                    var productResource = dataAccessService.getProductResource();
                    productResource.get({ id: $stateParams.productId }, function (data) {
                        _this.product = data;
                    }, function (ex) { alert("Error occured" + ex); });
                }
                ProductDetailCtrl.prototype.tagList = function () {
                    return this.product.tags.toString();
                };
                ProductDetailCtrl.prototype.marginPercent = function () {
                    return this.productService.calculateMarginPercent(this.product.price, this.product.cost);
                };
                ProductDetailCtrl.$inject = ["$stateParams", "dataAccessService", "$state", "$log", "productService"];
                return ProductDetailCtrl;
            }());
            angular.module("productManagement").controller("ProductDetailCtrl", ProductDetailCtrl);
        })(ProductDetail = products.ProductDetail || (products.ProductDetail = {}));
    })(products = App.products || (App.products = {}));
})(App || (App = {}));
//# sourceMappingURL=productDetailCtrl.js.map