var myApp = angular.module('myApp', ["Layout", "HttpClient", "WsClient", "Identity"]);

myApp
    .constant("menuItemsJson",  menuItems)
    .constant("headerItemsJson", headerItems)
    .constant("routingJson", routingItems)
    .config(httpsConfig)
    .config(wssConfig)
    .config(function($routeProvider, routingJson){
    	for(var i = 0; i < routingJson.params.length; i++){
            $routeProvider.when("/" + routingJson.params[i].route, {
                templateUrl: routingJson.params[i].template,
                controller: routingJson.params[i].controller
            })
        }
    	$routeProvider.otherwise("#/");
	})
    
    myApp.run(function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if($location.$$path == "")
           		 $location.path("/main")
          })     
    });
