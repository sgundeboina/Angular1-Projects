var App;
(function (App) {
    var products;
    (function (products) {
        var Welcome;
        (function (Welcome) {
            var WelcomeCtrl = (function () {
                function WelcomeCtrl($state, $log, $location) {
                    this.$state = $state;
                    this.$log = $log;
                    this.$location = $location;
                    this.artworkBy = "Srini Gundeboina";
                }
                WelcomeCtrl.prototype.refresh = function () {
                    this.$log.debug("Debug message from Welcome Ctrl");
                    this.$state.reload();
                    this.$log.debug(this.$state.current);
                    this.$log.debug(this.$state.params);
                    this.$state.go("products"); //Redirecting using State.go
                    //this.$log.debug(this.$route.current);
                    //this.$log.debug(this.$route.routes);
                    //this.$location.path("/products"); //Redirect using location service
                };
                //static $inject = ["$route", "$log", "$location"];
                //constructor(private $route: ng.route.IRouteService, private $log: ng.ILogService, private $location: ng.ILocationService) {
                //    this.artworkBy = "Srini";
                //}
                WelcomeCtrl.$inject = ["$state", "$log", "$location"];
                return WelcomeCtrl;
            }());
            angular.module("productManagement").controller("WelcomeCtrl", WelcomeCtrl);
        })(Welcome = products.Welcome || (products.Welcome = {}));
    })(products = App.products || (App.products = {}));
})(App || (App = {}));
//# sourceMappingURL=WelcomeCtrl.js.map