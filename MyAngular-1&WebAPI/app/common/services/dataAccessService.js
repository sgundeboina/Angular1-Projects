var App;
(function (App) {
    var Common;
    (function (Common) {
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            DataAccessService.prototype.getProductResource = function () {
                return this.$resource("http://lenovo-pc/MyLOB.WebAPI/api/products/");
            };
            DataAccessService.prototype.getProduct = function (prodId) {
                var product;
                this.getProductResource().get({ id: prodId }, function (data) {
                    product = data;
                });
                return product;
            };
            DataAccessService.prototype.getMessage = function () {
                return "test message";
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        }());
        Common.DataAccessService = DataAccessService;
        angular.module("common.services").service("dataAccessService", DataAccessService);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=dataAccessService.js.map