module App.products.ProductList {
    interface IProductListModel {
        title: string;
        showImage: boolean;
        products: App.Domain.IProduct[];
        toggleImage(): void;
        reloadData(): void;

    }

    class ProductListCtrl implements IProductListModel {

        title: string;
        showImage: boolean;
        products: App.Domain.IProduct[];
        orderByField: string;
        filterBy: string;
        numberOfProducts:number;
        static $inject = ["dataAccessService"]; //dependency injection
        constructor(private dataAccessService: App.Common.DataAccessService) {
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

        getFilterValue(): string {
            return "contains(ProductCode,'" + this.filterBy + "')";
        }

        toggleImage(): void {
            //Following code is an example of how to use save on Resoources/Repository

            // var productResource = this.dataAccessService.getProductResource();
            //var product = new App.Domain.Product(-1, "sri-prod", "srid-prodcode", new Date(), 9.0, 10, "descr", "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png", ["ab1", "cd1"]);
            //productResource.save(product);
            //productResource.query((data: App.Domain.IProduct[]) => {
            //    this.products = data;
            //});
            this.showImage = !this.showImage;
        }

        reloadData(): void {

            var productResource = this.dataAccessService.getProductResource();
            if (this.filterBy) {
                productResource.query({ $filter: this.getFilterValue() },
                    (data: App.Domain.IProduct[]) => {
                        this.products = data;
                        this.numberOfProducts = this.products.length;
                    });
            } else {
                productResource.query((data: App.Domain.IProduct[]) => {
                    this.products = data;
                    this.numberOfProducts = this.products.length;
                });
            }
        }

        deleteProduct(id): void {
            var prd = this.products.filter(p => p.productId === 4);
            var productResource = this.dataAccessService.getProductResource();
            productResource.delete(prd);
            alert("delete" + id);
            this.reloadData();
        }
    }
    angular.module("productManagement").controller("ProductListCtrl", ProductListCtrl);
}

