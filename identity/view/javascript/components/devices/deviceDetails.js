angular
      .module('Identity')
      .component(
            'deviceDetails',
            {
               bindings : {
                  device : '<device',
                  groups : '<groups',
                  message : '@message',
                  title : '<title'
               },
               templateUrl : '/identity/view/javascript/components/devices/deviceDetails.html',

               controller : function($scope, _, identityService) {
	               var self = this;
	               self.token = null;

	               self.isLoading = true;
	               self.originalDevice = angular.copy(this.device);

	               this.$onInit = function() {
		               self.isUpdate = true;
		               if (self.device != null) {
			               self.isUpdate = true;
			               this.loadDevice(self.device);
		               } else {
			               self.isUpdate = false;
			               self.device = {};
		               }
                       
                       $scope.$on("loadDeviceDetails", function(event, data) {
		               if (data.id) {
			               self.loadDevice(data.id);
		               } else {
			               self.device = {};
			               self.update = false;
			               self.originalDevice = angular.copy(this.device);
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
	               this.loadDevice = function(id) {
		               if (id) {
			               identityService
			                     .getDevice(id)
			                     .then(
			                           function(data, response) {
				                           self.isLoading = false;
				                           if (data.status == "failure") {
					                            self.setAlert(data.errorDetail, "danger")
				                           } else {
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
					                           self.device = data
					                           self.originalDevice = angular
					                                 .copy(self.device);
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
		               var data = angular.copy(self.device);
		               data["apsdb.update"] = self.isUpdate;
		               var groups = _.pluck(data.groups, "name");
		               data["groups"] = groups;
		               identityService.saveDevice(data).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
				                      self.setAlert(data.errorDetail, "danger")
			                     } else {
                                     var message = "Device updated successfully."
                                     self.setAlert(message, "success")
				                     $scope.$emit('deviceAdded');
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.setAlert(JSON.stringify(err), "danger")
			                     console.log("reject", err);
		                     });
	               }

	               this.reset = function() {
		               this.device = angular.copy(self.originalDevice);
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

	               this.isDeviceChanged = function() {
		               return !angular.equals(this.device, self.originalDevice);
	               }
                   
                   this.setAlert = function(message, type) {
                       self.message = {"content": message, "type": type};
                   }
                   this.closeAlert = function() {
                       self.message = null;
                   }

	               
               }
            });