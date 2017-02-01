//PriceAnalyticsCtrl
var App;
(function (App) {
    var products;
    (function (products) {
        var prices;
        (function (prices) {
            var PriceAnalyticsCtrl;
            (function (PriceAnalyticsCtrl_1) {
                var PriceAnalyticsCtrl = (function () {
                    function PriceAnalyticsCtrl(dataAccessService, $scope, $filter) {
                        var _this = this;
                        this.dataAccessService = dataAccessService;
                        this.$scope = $scope;
                        this.$filter = $filter;
                        this.products = [];
                        $scope.title = "Price Analytics";
                        var productResource = this.dataAccessService.getProductResource();
                        productResource.query(function (data) {
                            _this.products = data;
                            var filteredProductsAmount = _this.products;
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
                    PriceAnalyticsCtrl.$inject = ["dataAccessService", "$scope", "$filter"]; //dependency injection
                    return PriceAnalyticsCtrl;
                }());
                angular.module("productManagement").controller("PriceAnalyticsCtrl", PriceAnalyticsCtrl);
            })(PriceAnalyticsCtrl = prices.PriceAnalyticsCtrl || (prices.PriceAnalyticsCtrl = {}));
        })(prices = products.prices || (products.prices = {}));
    })(products = App.products || (App.products = {}));
})(App || (App = {}));
//# sourceMappingURL=priceAnalyticsCtrl.js.map