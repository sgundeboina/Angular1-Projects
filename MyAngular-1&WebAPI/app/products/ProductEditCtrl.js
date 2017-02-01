var App;
(function (App) {
    var products;
    (function (products) {
        var ProductEdit;
        (function (ProductEdit) {
            var ProductEditCtrl = (function () {
                function ProductEditCtrl($scope, prd, dataAccessService, $state, productService, $location, $stateParams) {
                    this.$scope = $scope;
                    this.prd = prd;
                    this.dataAccessService = dataAccessService;
                    this.$state = $state;
                    this.productService = productService;
                    this.$location = $location;
                    this.$stateParams = $stateParams;
                    var vm = this;
                    vm.productResource = this.dataAccessService.getProductResource();
                    vm.product = prd;
                    vm.priceOption = "percent";
                    var oldPrdId = $stateParams.productId;
                    var oldPrdId1 = $stateParams.oldProductId;
                    if ($stateParams.oldProductId && $stateParams.productId == 0) {
                        vm.product.productId = 0;
                        vm.title = "Copying: " + vm.product.productName;
                    }
                    else if (vm.product && vm.product.productId) {
                        vm.title = "Edit: " + vm.product.productName;
                    }
                    else {
                        vm.title = "New Product";
                    }
                    this.$scope.dateOptions = {
                        startingDay: 1,
                        showWeeks: false
                    };
                }
                //open($event): void {
                //    //var scope = angular.element($event).scope();
                //    $event.preventDefault();
                //    $event.stopPropagation();
                //};
                ProductEditCtrl.prototype.marginPercent = function () {
                    return this.productService.calculateMarginPercent(this.product.price, this.product.cost);
                };
                ProductEditCtrl.prototype.calculatePrice = function () {
                    var price = 0;
                    if (this.priceOption === "amount") {
                        price = this.productService.calculatePriceFromAmount(this.product.cost, this.markupAmount);
                    }
                    if (this.priceOption === "percent") {
                        price = this.productService.calculatePriceFromPercent(this.product.cost, this.markupPercent);
                    }
                    this.product.price = price;
                    return price;
                };
                ProductEditCtrl.prototype.submit = function (isValid) {
                    if (isValid) {
                        //var productResource = this.dataAccessService.getProductResource();
                        if (this.product.productId > 0) {
                            //Update scenario 
                            this.productResource.save(this.product, function (data) { toastr.success("Updated successfully"); });
                            this.$state.go('products');
                        }
                        else {
                            this.productResource.save(this.product, function (data) {
                                toastr.success("Created successfully");
                            });
                            //$window.location.href=""
                            this.$state.go('products');
                        }
                    }
                    else {
                        alert("Please correct the validation errors first.");
                    }
                };
                ProductEditCtrl.prototype.cancel = function () {
                    this.$state.go('products');
                };
                ProductEditCtrl.prototype.addTags = function (tags) {
                    if (tags) {
                        var array = tags.split(",");
                        this.product.tags = this.product.tags ? this.product.tags.concat(array) : array;
                        this.newTags = "";
                    }
                };
                ProductEditCtrl.prototype.removeTags = function (idx) {
                    this.product.tags.splice(idx, 1);
                };
                //TODO- This date picker is not working, work on it later....
                ProductEditCtrl.prototype.open = function ($event) {
                    this.$scope.open = function ($ev) {
                        $ev.preventDefault();
                        $ev.stopPropagation();
                        this.$scope.opened = true;
                    };
                };
                ProductEditCtrl.$inject = ['$scope', "prd", "dataAccessService", "$state", "productService", "$location", "$stateParams"];
                return ProductEditCtrl;
            }());
            angular.module("productManagement").controller("ProductEditCtrl", ProductEditCtrl);
        })(ProductEdit = products.ProductEdit || (products.ProductEdit = {}));
    })(products = App.products || (App.products = {}));
})(App || (App = {}));
//# sourceMappingURL=ProductEditCtrl.js.map