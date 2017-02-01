
module App.Common {
    export interface IProductResource extends ng.resource.IResource<App.Domain.IProduct> {

    }

    export interface IDataAccessService {
        getProductResource(): ng.resource.IResourceClass<IProductResource>;
        getMessage(): string;
    }


    export class DataAccessService implements IDataAccessService {

        static $inject = ["$resource"];

        constructor(private $resource: ng.resource.IResourceService) {

        }

        getProductResource(): ng.resource.IResourceClass<IProductResource> {
            return this.$resource("http://lenovo-pc/MyLOB.WebAPI/api/products/");
        }

        getProduct(prodId): App.Domain.IProduct {
           var product: App.Domain.IProduct;
            this.getProductResource().get({ id: prodId },
                (data: App.Domain.IProduct) => {
                    product = data;

               });

            return product;
        }

        getMessage(): string {
            return "test message";
        }
    }


    angular.module("common.services").service("dataAccessService", DataAccessService);
}