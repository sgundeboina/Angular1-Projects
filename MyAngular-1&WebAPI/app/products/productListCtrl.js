var App;
(function (App) {
    var products;
    (function (products) {
        var ProductList;
        (function (ProductList) {
            var ProductListCtrl = (function () {
                function ProductListCtrl(dataAccessService) {
                    this.dataAccessService = dataAccessService;
                    this.title = "Product List";
                    this.showImage = false;
                    this.products = [];
                    this.orderByField = "productName";
                    var productResource = this.dataAccessService.getProductResource();
                    this.reloadData();
                    ////Using query string approach
                    //productResource.query({ search: this.filterBy }, (data: App.Domain.IProduct[]) => {
                    //    this.products = data;
                    //});
                    //productResource.query((data: Domain.IProduct[]) => {
                    //    this.products = data;
                    //});
                    //if (this.filterBy) {
                    //    productResource.query({ $filter: this.getFilterValue() },
                    //        (data: Domain.IProduct[]) => {
                    //            this.products = data;
                    //        });
                    //} else {
                    //    productResource.query((data: Domain.IProduct[]) => {
                    //        this.products = data;
                    //    });
                    //}
                }
                ProductListCtrl.prototype.getFilterValue = function () {
                    return "contains(ProductCode,'" + this.filterBy + "')";
                };
                ProductListCtrl.prototype.toggleImage = function () {
                    //Following code is an example of how to use save on Resoources/Repository
                    // var productResource = this.dataAccessService.getProductResource();
                    //var product = new App.Domain.Product(-1, "sri-prod", "srid-prodcode", new Date(), 9.0, 10, "descr", "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png", ["ab1", "cd1"]);
                    //productResource.save(product);
                    //productResource.query((data: App.Domain.IProduct[]) => {
                    //    this.products = data;
                    //});
                    this.showImage = !this.showImage;
                };
                ProductListCtrl.prototype.reloadData = function () {
                    var _this = this;
                    var productResource = this.dataAccessService.getProductResource();
                    if (this.filterBy) {
                        productResource.query({ $filter: this.getFilterValue() }, function (data) {
                            _this.products = data;
                            _this.numberOfProducts = _this.products.length;
                        });
                    }
                    else {
                        productResource.query(function (data) {
                            _this.products = data;
                            _this.numberOfProducts = _this.products.length;
                        });
                    }
                };
                ProductListCtrl.prototype.deleteProduct = function (id) {
                    var prd = this.products.filter(function (p) { return p.productId === 4; });
                    var productResource = this.dataAccessService.getProductResource();
                    productResource.delete(prd);
                    alert("delete" + id);
                    this.reloadData();
                };
                ProductListCtrl.$inject = ["dataAccessService"]; //dependency injection
                return ProductListCtrl;
            }());
            angular.module("productManagement").controller("ProductListCtrl", ProductListCtrl);
        })(ProductList = products.ProductList || (products.ProductList = {}));
    })(products = App.products || (App.products = {}));
})(App || (App = {}));
//# sourceMappingURL=productListCtrl.js.map