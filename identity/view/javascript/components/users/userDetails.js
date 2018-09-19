angular
      .module('Identity')
      .component(
            'userDetails',
            {
               bindings : {
                  user : '<user',
                  groups : '<groups',
                  message : '@message',
                  title : '<title'
               },
               templateUrl : '/identity/view/javascript/components/users/userDetails.html',

               controller : function($scope, _, identityService) {
	               var self = this;
	               self.token = null;

	               self.isLoading = true;
	               self.originalUser = angular.copy(this.user);

	               this.$onInit = function() {
		               self.isUpdate = true;
		               if (self.user != null) {
			               self.isUpdate = true;
			               this.loadUser(self.user);
		               } else {
			               self.isUpdate = false;
			               self.user = {};
		               }
                       
                       $scope.$on("loadUserDetails", function(event, data) {
                           if (data.id) {
                               self.loadUser(data.id);
                           } else {
                               self.user = {};
                               self.update = false;
                               self.originalUser = angular.copy(this.user);
                           }

                       })
	               };

	               this.generateToken = function(id) {
		               identityService.generateToken(id).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
                                     self.setAlert(data.errorDetail, "danger")
			                     } else {
				                     self.token = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.setAlert(JSON.stringify(err), "danger")
			                     console.log("reject", err);
		                     });
	               }

	               this.renewToken = function(id, token) {
		               identityService.renewToken(id, token).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
                                     self.setAlert(data.errorDetail, "danger")
			                     } else {
				                     self.token = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
                                  self.setAlert(JSON.stringify(err), "danger")
			                     console.log("reject", err);
		                     });
	               }
                   
 	               this.loadUser = function(id) {
		               if (id) {
			               identityService
			                     .getUser(id)
			                     .then(
			                           function(data, response) {
				                           self.isLoading = false;
				                           if (data.status == "failure") {
					                           self.setAlert(data.errorDetail, "danger")
				                           } else {
                                               console.log("data", data)
					                           if (data.token) {
						                           self.token = data.token["apsdb.authToken"]
						                           delete data.token["apsdb.authToken"];
					                           }
                                               if(data.groups) {
                                                 if(_.isArray(data.groups)) {
                                                   data.groups = _.map(data.groups, function(group){ return {"name": group} })
                                                 } else {
                                                   data.groups = [{"name": data.groups}];
                                                 }
                                               }
					                           self.user = data
					                           self.originalUser = angular
					                                 .copy(self.user);
				                           }
				                           console.log("resolve", data)
			                           }, function(err) {
				                           self.isLoading = false;
                                           self.setAlert(JSON.stringify(err), "danger")
				                           console.log("reject", err);
			                           });
		               } else {
			               this.reset();
		               }

	               }

	               this.submit = function() {
		               var self = this;
		               var data = angular.copy(self.user);
		               data["apsdb.update"] = self.isUpdate;
		               var groups = _.pluck(data.groups, "name");
		               data["groups"] = groups;
		               identityService.saveUser(data).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
                                     self.setAlert(data.errorDetail, "danger")
			                     } else {
				                     var successMessage = "User updated successfully."
                                     self.setAlert(successMessage, "success")
                                     $scope.$emit('userAdded');
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
                                 self.setAlert(JSON.stringify(err), "danger")
			                     console.log("reject", err);
		                     });
	               }

	               this.reset = function() {
		               this.user = angular.copy(self.originalUser);
	               }

	               this.filterGroups = function($query) {
		               return _.filter(self.groups, function(group) {
			               if (group.name.toLowerCase().indexOf(
			                     $query.toLowerCase()) != -1) {
				               return group;
			               }
		               });
	               };

	               this.listGroups = function() {
		               identityService.listGroups().then(
		                     function(data, response) {
			                     if (data.status == "failure") {
                                     self.setAlert(data.errorDetail, "danger")
			                     } else {
				                     self.groups = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                      self.setAlert(JSON.stringify(err), "danger")
			                     console.log("reject", err);
		                     });
	               }

	               this.isUserChanged = function() {
		               return !angular.equals(this.user, self.originalUser);
	               }
                   
                   this.setAlert = function(message, type) {
                       self.message = {"content": message, "type": type};
                   }
                   this.closeAlert = function() {
                       self.message = null;
                   }

               }
            });