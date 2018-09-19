angular.module('Identity').component('groupDetails', {
   bindings : {
      group : '<group',
      message : '@message',
      title: '<title'
   },
   templateUrl : '/Identity/view/javascript/components/groups/groupDetails.html',

   controller : function($scope, _, identityService) {
	   var self = this;
       
       $scope.$on("loadGroupDetails", function(event, data) {
         if (data.id) {
           self.loadGroup(data.id);
         } else {
           self.group = {};
           self.update = false;
           originalGroup = angular.copy(self.group);
         }

       })
       
	   self.isLoading = true;
	   var originalGroup = angular.copy(this.group);

	   self.isUpdate = true;
	   if (self.group != null) {
		   self.isUpdate = true;
		   this.loadGroup(self.group);
	   } else {
		   self.isUpdate = false;
		   self.group = {};
	   }
        
	   this.loadGroup = function(id) {
         if(id) {
            this.group = {"groupName": id};
			originalGroup = angular.copy(this.group);
         } else {
           this.reset();
         }
	   }

	   this.submit = function() {
		   var self = this;
		   var data = angular.copy(self.group);
		   data["apsdb.update"] = self.isUpdate;
		   console.log(self.group)
		   identityService.saveGroup(data).then(function(data, response) {
			   self.isLoading = false;
			   if (data.status == "failure") {
				   self.message = data.errorDetail
			   } else {
				   self.message = "Group updated successfully."
			   }
			   console.log("resolve", data)
		   }, function(err) {
			   self.isLoading = false;
			   self.message = JSON.stringify(err)
			   console.log("reject", err);
		   });
	   }
	   
	   this.reset = function() {
		   this.group = angular.copy(originalGroup);
		   myForm.$setPristine();
	   }

	   this.isGroupChanged = function() {
		   return !angular.equals(this.group, originalGroup);
	   }
         
       
   }
});