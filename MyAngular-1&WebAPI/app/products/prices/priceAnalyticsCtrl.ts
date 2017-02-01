//PriceAnalyticsCtrl
module App.products.prices.PriceAnalyticsCtrl {
    interface IMyScope extends ng.IScope {
        title: string;
        dataAmount: any;
        configAmount: any;
    }

    class PriceAnalyticsCtrl {

        products: App.Domain.IProduct[];

        static $inject = ["dataAccessService", "$scope", "$filter"]; //dependency injection
        constructor(
            private dataAccessService: App.Common.DataAccessService,
            private $scope: IMyScope,
            private $filter: ng.IFilterFilter
        ) {


            this.products = [];
            $scope.title = "Price Analytics";

            var productResource = this.dataAccessService.getProductResource();


            productResource.query((data: App.Domain.IProduct[]) => {
                this.products = data;

                var filteredProductsAmount = this.products;

                var chartDataAmount = [];
                for (var i = 0; i < filteredProductsAmount.length; i++) {
                    chartDataAmount.push({
                        x: filteredProductsAmount[i].productName,
                        y: [filteredProductsAmount[i].cost,
                            filteredProductsAmount[i].price, 10
                        ]
                    });
                }

                $scope.dataAmount = {
                    series: ["Cost", "Price", "Margin Amount"],
                    data: chartDataAmount
                };

                $scope.configAmount = {
                    title: "Top $ Margin Products",
                    tooltips: true,
                    labels: false,
                    mouseover: function () { },
                    mouseout: function () { },
                    click: function () { },
                    legend: {
                        display: true,
                        position: "right"
                    }
                };
            });





        }
        
    }
    angular.module("productManagement").controller("PriceAnalyticsCtrl", PriceAnalyticsCtrl);
}

