
module App {

    //#region "Using ngRouter"

    //var main = angular.module("productManagement", ["ngRoute", "common.services", "productResourceMock"]);
    //main.config(routeConfig);
    //routeConfig.$inject = ["$routeProvider"];

    //function routeConfig($routeProvider: ng.route.IRouteProvider): void {
    //    $routeProvider
    //        .when("/",
    //        {
    //            templateUrl: "/app/WelcomeView.html",
    //            controller: "WelcomeCtrl",
    //            controllerAs: "welcome"
    //        })
    //        .when("/products",
    //        {
    //            templateUrl: "/app/products/productListView.html",
    //            controller: "ProductListCtrl as vm"
    //        })
    //        .when("/products/:productId",
    //        {
    //            templateUrl: "/app/products/productDetailView.html",
    //            controller: "ProductDetailCtrl as vm"

    //        })
    //        .when("/addProduct/:productId",
    //        {
    //            templateUrl: "/app/products/productDetailView.html",
    //            controller: "ProductDetailCtrl as vm"

    //        })
    //        .when("/editProduct/:productId",
    //        {
    //            templateUrl: "/app/products/productEditView.html",
    //            controller: "ProductEditCtrl",
    //            controllerAs: "vm",
    //            resolve: {
    //                prd(dataAccessService, $route) {
    //                    return dataAccessService.getProductResource().get({ productId: $route.current.params.productId }).$promise;
    //                }
    //            }

    //        }).when("/products/edit/:productId/info",
    //        {
    //            templateUrl: "/app/products/productEditInfoView.html",
    //            controller: "ProductDetailCtrl as vm"

    //        })

    //        .otherwise("/");

    //    //test
    //}

    //#endregion "My Region"

    //var main = angular.module("productManagement", ["common.services", "productResourceMock", "ui.router", "ui.bootstrap", "ui.mask", "angularCharts"]);
    var main = angular.module("productManagement", ["common.services", "ui.router", "ui.bootstrap", "ui.mask", "angularCharts"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$logProvider"];

    function routeConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $logProvider: ng.ILogProvider): void {
        $logProvider.debugEnabled(true); //TODO-Srini1
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('welcome',
            {
                url: "/",
                templateUrl: "/app/WelcomeView.html",
                controller: "WelcomeCtrl",
                controllerAs: "welcome"
            })
            //Products
            .state("products",
            {
                url: "/products",
                templateUrl: "/app/products/productListView.html",
                controller: "ProductListCtrl as vm"
            })
            .state("priceAnalytics",
            {
                url: "/priceAnalytics",
                templateUrl: "/app/products/prices/priceAnalyticsView.html",
                controller: "PriceAnalyticsCtrl"
            })
            .state("productDetails",
            {
                url: "/products/{productId}",
                templateUrl: "/app/products/productDetailView.html",
                controller: "ProductDetailCtrl as vm"

            })
            //we can pass either /:productId or /{productId}. For optional param keep "?" at the end.
            //Also one can add a new param at the state level just before we call controller.
            // To force to integer one can do like:  url: '/classrooms/{id:[0-9]}/detail/{month}'
            .state("addProduct",
            {
                url: "/addProduct/{productId}",
                params: {
                    MyNewParamAddingHere: { value: 'Learning is fun!' }
                },
                templateUrl: "/app/products/productDetailView.html",
                controller: "ProductDetailCtrl as vm",
                onEnter: function ($log) {  //this way we can hook the functions
                    $log.debug('Entering the editProduct state.');
                },
                onExit: function ($log) {
                    $log.debug('Exiting the editProduct state.');
                },
                data: { //this way we can pass dynamic data to controller
                    name: 'My Activity',
                    desc: 'Fun!'
                }
            })
            .state("editProduct",
            ({
                abstract: true,
                params: {
                    oldProductId: { value: ":oldProductId" }
                },
                onEnter: function ($log) {  //this way we can hook the functions
                    $log.debug('Entering the editProduct state.');
                },
                url: "/editProduct/:productId",
                templateUrl: "/app/products/productEditView.html",
                controller: "ProductEditCtrl",
                controllerAs: "vm",
                resolve: {
                    mydataAcess: "dataAccessService", //this is a DAL service which we registered in DataAccessService.ts within "common.services" module which got injected in app.config above
                    prd(mydataAcess, $stateParams) {
                        if ($stateParams.oldProductId && $stateParams.productId==0) {
                            return mydataAcess.getProductResource().get({ id: $stateParams.oldProductId }).$promise;
                        } else {
                            return mydataAcess.getProductResource().get({ id: $stateParams.productId }).$promise;
                        }

                    }
                }

            }) as any)
            .state("editProduct.productInfo",
            {
                url: "/productInfo",
                templateUrl: "/app/products/productEditInfoView.html"
            })
            .state("editProduct.productTags",
            {
                url: "/productTags",
                templateUrl: "/app/products/productEditTagsView.html"
            })
            .state("editProduct.productPrice",
            {
                url: "/productPrice",
                templateUrl: "/app/products/productEditPriceView.html"
            });



    }


    main.run(runMain); //Here we can have initialization code that require for every Ctrl before they take place.
    runMain.$inject = ["$rootScope", "$log"];
    function runMain($rootScope: ng.IRootScopeService, $log: ng.ILogService): void {
        //$rootScope.$on("$routeChangeSuccess", (event, current, previous) => {
        //    $log.debug('successfully changed routes');

        //    $log.debug(event);
        //    $log.debug(current);
        //    $log.debug(previous);

        //});

        //$rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        //    $log.debug('error changing routes');
        //    $log.debug(event);
        //    $log.debug(current);
        //    $log.debug(previous);
        //    $log.debug(rejection);

        //});

        //We don't need this but need the other 2 so that we know whats wrong ging on.
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            $log.debug('successfully changed states');

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });


        //Using State
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

            $log.error('The requested state was not found: ', unfoundState);

        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            $log.error('An error occurred while changing states: ', error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });

    }
}
