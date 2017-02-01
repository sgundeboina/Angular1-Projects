module App.products.ProductDetail {
    //#region "Using ngRouter"
    //interface IProductParams extends angular.IAngularStatic.route.IRouteParamsService {
    //    productId: number;
    //}

    //#endregion 
    export interface IProductParams extends ng.ui.IStateParamsService {
        productId: number;
        oldProductId: number;
    }

    interface IProductDetailModel {
        title: string;
        product: App.Domain.IProduct;
    }


    class ProductDetailCtrl implements IProductDetailModel {
        title: string;
        product: App.Domain.IProduct;


        static $inject = ["$stateParams", "dataAccessService", "$state", "$log", "productService"];
        constructor(private $stateParams: IProductParams,
            private dataAccessService: App.Common.DataAccessService,
            private $state: ng.ui.IStateService,
            private $log: ng.ILogService,
            private productService: App.Common.ProductService) {

            this.$log.debug(this.$state.current.data);
            this.title = "Product Detail";

            var productResource = dataAccessService.getProductResource();
            productResource.get({ id: $stateParams.productId },
                (data: App.Domain.IProduct) => {
                    this.product = data;

                }, ex => {alert("Error occured"+ex)});
        }

        tagList(): string {
            return this.product.tags.toString();
        }

        marginPercent(): number {
            return this.productService.calculateMarginPercent(this.product.price, this.product.cost);
        }
    }
    angular.module("productManagement").controller("ProductDetailCtrl", ProductDetailCtrl);
}