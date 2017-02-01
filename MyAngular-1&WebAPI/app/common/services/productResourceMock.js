var App;
(function (App) {
    var Common;
    (function (Common) {
        var mockResource = angular.module("productResourceMock", ["ngMockE2E"]);
        mockResource.run(mockRun);
        mockRun.$inject = ["$httpBackend"];
        function mockRun($httpBackend) {
            var products = [];
            var product;
            product = new App.Domain.Product(1, "Leaf Rake", "GDN-0011", new Date(2009, 2, 19), 9.0, 19.95, "Leaf rake with 48-inch wooden handle.", "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png", ["abc", "cde"]);
            products.push(product);
            product = new App.Domain.Product(2, "Garden Cart", "GDN-0023", new Date(2010, 2, 18), 20, 26.95, "15 gallon capacity rolling garden cart", "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png", ["abc", "cde", "def"]);
            products.push(product);
            product = new App.Domain.Product(3, "Saw", "TBX-002", new Date(2002, 3, 1), 14, 16.95, "15-inch steel blade hand saw", "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png", ["abc", "cde", "def"]);
            products.push(product);
            product = new App.Domain.Product(4, "Hammer", "TBX-0048", new Date(2013, 4, 21), 4, 8.99, "Curved claw steel hammer", "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png", ["abc", "cde", "def"]);
            products.push(product);
            product = new App.Domain.Product(5, "Video Game Controller", "GMG-0042", new Date(2012, 9, 25), 15.0, 35.95, "Standard five-button video game controller", "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png", ["ef"]);
            products.push(product);
            var productUrl = "/api/products";
            $httpBackend.whenGET(productUrl).respond(products);
            var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
            $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
                var product = { "productId": 0 };
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parseInt(parameters[length - 1]);
                if (id > 0) {
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].productId === id) {
                            product = products[i];
                            break;
                        }
                    }
                }
                return [200, product, {}];
            });
            // Catch all for testing purposes
            $httpBackend.whenGET(/api/).respond(function (method, url, data) {
                return [200, products, {}];
            });
            $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
                product = angular.fromJson(data);
                if (product.productId <= 0) {
                    product.productId = products[products.length - 1].productId + 1;
                    products.push(product);
                }
                else {
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].productId === product.productId) {
                            products[i] = product;
                        }
                    }
                }
                return [200, product, {}];
            });
            // Pass through any requests for application files
            $httpBackend.whenGET(/app/).passThrough();
        }
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=productResourceMock.js.map