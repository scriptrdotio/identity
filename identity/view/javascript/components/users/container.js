angular.module('Identity').component('usersContainer', {
   template: '<div ng-transclude></div>',
   controllerAs : 'vm',
   transclude: true,
   controller : function($scope, _) {
	   var self = this;
	   self.isLoading = true;
	   $scope.$on('editUser', function(event, data) {
		   console.log(data); // 'Some data'
		   $scope.$broadcast('loadUserDetails', data);
	   });
     
     	$scope.$on('addUser', function(event, data) {
		   $scope.$broadcast('loadUserDetails', {});
	   });
       
       $scope.$on('userAdded', function(event, data) {
		   $scope.$broadcast('reloadUsersList', {});
	   });
       
       $scope.$on('listTokens', function(event, data) {
		   $scope.$broadcast('listUserTokens', data);
	   });
   }
});