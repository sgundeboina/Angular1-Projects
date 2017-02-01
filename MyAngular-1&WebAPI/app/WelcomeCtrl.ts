module App.products.Welcome {
    class WelcomeCtrl {
        public artworkBy: string;
        //static $inject = ["$route", "$log", "$location"];
        //constructor(private $route: ng.route.IRouteService, private $log: ng.ILogService, private $location: ng.ILocationService) {
        //    this.artworkBy = "Srini";

        //}

        static $inject = ["$state", "$log", "$location"];
        constructor(private $state: ng.ui.IStateService,
            private $log: ng.ILogService,
            private $location: ng.ILocationService) {
            this.artworkBy = "Srini Gundeboina";

        }

        refresh(): void {
            this.$log.debug("Debug message from Welcome Ctrl");
            this.$state.reload();

            this.$log.debug(this.$state.current);
            this.$log.debug(this.$state.params);
            this.$state.go("products"); //Redirecting using State.go


            //this.$log.debug(this.$route.current);
            //this.$log.debug(this.$route.routes);
            //this.$location.path("/products"); //Redirect using location service
        }

    }
    angular.module("productManagement").controller("WelcomeCtrl", WelcomeCtrl);
}