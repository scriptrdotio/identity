var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
    httpClientProvider.setTokenRenewInterval(600000); //in ms, If time remaining for token to expire is less than this value a renewToken will be invoked. i.e 600000 we will try to renew token before 10 minutes of its expiry. Set it to > than token expiry time to never renew.
}]

//var wssConfig = ["wsClientProvider",function (wsClientProvider) {
//    wsClientProvider.preventConnectionSetup(true);
//}]

var myApp = angular.module('myApp', ["underscore", "Layout", "Identity"]);

myApp
    .constant("menuItemsJson",  menuItems)
    .constant("headerItemsJson", headerItems)
    .constant("routingJson", routingItems)
    .config(httpsConfig)
	//.config(wssConfig)
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
    
