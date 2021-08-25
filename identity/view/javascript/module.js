var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
}]

var myApp = angular.module('myApp', ["underscore", "Layout", "Identity"]);

myApp
    .constant("menuItemsJson",  menuItems)
    .constant("headerItemsJson", headerItems)
    .constant("routingJson", routingItems)
    .config(httpsConfig)
    .config(function($routeProvider, routingJson){
    	for(var i = 0; i < routingJson.params.length; i++){
            $routeProvider
                .when("/" + routingJson.params[i].route, {
                        templateUrl: routingJson.params[i].template,
                        controller: routingJson.params[i].controller,
                        reloadOnSearch: false,
                        routeDef : routingJson.params[i].routeDef
                })
        }
    	$routeProvider.otherwise("/identitymanagement");
	})
    
