angular.module('Identity').component('groupDetails', {
   bindings : {
      group : '<group',
      message : '@message',
      title: '<title'
   },
   templateUrl : '/identity/view/javascript/components/groups/groupDetails.html',

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
            this.isUpdate = true;
            this.group = {"name": id};
			originalGroup = angular.copy(this.group);
         } else {
           this.isUpdate = false;
           this.reset();
         }
	   }

	   this.submit = function() {
		   var self = this;
		   var data = angular.copy(self.group);
		   data["update"] = self.isUpdate;
		   console.log(self.group)
		   identityService.saveGroup(data).then(function(data, response) {
			   self.isLoading = false;
			   if (data.status == "failure") {
                   self.setAlert(data.errorDetail, "danger")
			   } else {
                   self.setAlert("Group updated successfully.", "success")
			   }
			   console.log("resolve", data)
		   }, function(err) {
			   self.isLoading = false;
               if(err.data && err.data.response && err.data.response.metadata.status == "failure") {
                   self.setAlert(err.data.response.metadata.errorDetail, "danger")
               } else {
                   self.setAlert(JSON.stringify(err), "danger")
               }
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
       
       this.setAlert = function(message, type) {
           self.message = {"content": message, "type": type};
       }
       
       this.closeAlert = function() {
           self.message = null;
       }
         
       
   }
});