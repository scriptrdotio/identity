angular.module('Identity').component('devicesContainer', {
   template: '<div ng-transclude></div>',
   controllerAs : 'vm',
   transclude: true,
   controller : function($scope, _) {
	   var self = this;
	   self.isLoading = true;
	   $scope.$on('editDevice', function(event, data) {
		   console.log(data); // 'Some data'
		   $scope.$broadcast('loadDeviceDetails', data);
	   });
     
     	$scope.$on('addDevice', function(event, data) {
		   $scope.$broadcast('loadDeviceDetails', {});
	   });
       
        $scope.$on('deviceAdded', function(event, data) {
		   $scope.$broadcast('reloadDevicesList', {});
	   });
   }
});