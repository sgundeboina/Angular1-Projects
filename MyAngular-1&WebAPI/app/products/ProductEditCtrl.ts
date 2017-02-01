module App.products.ProductEdit {
    import ProductParams = App.products.ProductDetail.IProductParams;

    interface INyScope extends ng.IScope {
        open: any;
        opened: boolean;
        dateOptions: any;
    }

    class ProductEditCtrl {
        title: string;
        product: App.Domain.IProduct;
        opened: boolean;
        productResource: any;
        newTags: string;
        priceOption: string;
        markupAmount: number;
        markupPercent: number;
        static $inject = ['$scope', "prd", "dataAccessService", "$state", "productService", "$location", "$stateParams"];

        constructor(private $scope: INyScope,
            private prd: App.Domain.IProduct,
            private dataAccessService: App.Common.DataAccessService,
            private $state: ng.ui.IStateService,
            private productService: App.Common.ProductService,
            private $location: ng.ILocationService,
            private $stateParams: ProductParams) {

            var vm = this;
            vm.productResource = this.dataAccessService.getProductResource();
            vm.product = prd;
            vm.priceOption = "percent";
            var oldPrdId = $stateParams.productId;
            var oldPrdId1 = $stateParams.oldProductId;
            if ($stateParams.oldProductId && $stateParams.productId == 0) {
                vm.product.productId = 0;
                vm.title = "Copying: " + vm.product.productName;
            } else if (vm.product && vm.product.productId) {
                vm.title = "Edit: " + vm.product.productName;
            } else {
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


        marginPercent(): number {
            return this.productService.calculateMarginPercent(this.product.price, this.product.cost);
        }

        calculatePrice(): number {
            var price = 0;

            if (this.priceOption === "amount") {
                price = this.productService.calculatePriceFromAmount(
                    this.product.cost, this.markupAmount);
            }

            if (this.priceOption === "percent") {
                price = this.productService.calculatePriceFromPercent(
                    this.product.cost, this.markupPercent);
            }
            this.product.price = price;
            return price;
        }

        submit(isValid): void {

            if (isValid) {
                //var productResource = this.dataAccessService.getProductResource();
                if (this.product.productId > 0) {
                    //Update scenario 
                    this.productResource.save(this.product, function (data) { toastr.success("Updated successfully"); });
                    this.$state.go('products');
                } else {
                    this.productResource.save(this.product, function (data) {
                        toastr.success("Created successfully");
                    });

                    //$window.location.href=""
                    this.$state.go('products');

                }

            } else {
                alert("Please correct the validation errors first.");
            }
        }

        cancel(): void {
            this.$state.go('products');
        }
        addTags(tags): void {
            if (tags) {
                var array = tags.split(",");
                this.product.tags = this.product.tags ? this.product.tags.concat(array) : array;
                this.newTags = "";
            }

        }
        removeTags(idx): void {
            this.product.tags.splice(idx, 1);
        }

        //TODO- This date picker is not working, work on it later....
        open($event): void {
            this.$scope.open = function ($ev) {
                $ev.preventDefault();
                $ev.stopPropagation();
                this.$scope.opened = true;
            };
        }


    }
    angular.module("productManagement").controller("ProductEditCtrl", ProductEditCtrl);

}