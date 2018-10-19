angular.module('Identity')
  .component('userTokens', {
  bindings: {
    title: '<title',
    user: '@',
    tokens: '<tokens',
    message: '@message',
    onDelete: '&',
    onUpdate: '&'
  },
  templateUrl: '/identity/view/javascript/components/users/userTokens.html',
  controller: function($scope, _ , identityService){
    var self = this;
    self.isLoading = true;
        
	this.$onInit = function() {
        if (self.user != null && self.user != "") {
            this.loadUser(self.user);
        } else {
            self.user = null;
        }
        $scope.$on("listUserTokens", function(event, data) {
            if (data.id) {
                self.user = data.id;
                self.listTokens(data.id);
            } 
        })
    };
      
    this.listTokens = function(id) {
      identityService.listUserTokens(self.user).then(
        function(data, response) {
          self.isLoading = false;
          if(data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            self.tokens = _.flatten(_.pluck(data, "auth_token"));
          }
          console.log("resolve", data)
        },
        function(err) {
          	self.isLoading = false;
          	if(err.data && err.data.response && err.data.response.metadata.status == "failure") {
                self.setAlert(err.data.response.metadata.errorDetail, "danger")
          	} else {
                self.setAlert(JSON.stringify(err), "danger")
            }
          	console.log("reject", err);
        }
      );
    }
    this.revokeToken = function(token) {
      var self = this;
      var revokedToken = token;
      identityService.revokeToken(self.user, token).then(
        function(data, response) {
          self.isLoading = false;
          if(data && data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            if(data.status == "success") {
              self.tokens = angular.copy(_.reject(self.tokens, function(token){ return token == revokedToken; }));
              self.setAlert("Token revoked successfully", "success")
              console.log(self.tokens);
            }
          }
          console.log("resolve", data)
        },
        function(err) {
          	self.isLoading = false;
          	if(err.data && err.data.response && err.data.response.metadata.status == "failure") {
                self.setAlert(err.data.response.metadata.errorDetail, "danger")
          	} else {
                self.setAlert(JSON.stringify(err), "danger")
            }
          	console.log("reject", err);
        }
      );
    }
    
    
    this.renewToken = function(token) {
      var self = this;
      var renewedToken = token;
      identityService.renewToken(self.user, token).then(
        function(data, response) {
          self.isLoading = false;
          if(data && data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            if(data.status == "success") {
              self.tokens = angular.copy(_.reject(self.tokens, function(token){ return token == renewedToken; }));
              self.setAlert("Token renewed successfully", "success")
              console.log(self.tokens);
            }
          }
          console.log("resolve", data)
        },
        function(err) {
          	self.isLoading = false;
          	if(err.data && err.data.response && err.data.response.metadata.status == "failure") {
                self.setAlert(err.data.response.metadata.errorDetail, "danger")
          	} else {
                self.setAlert(JSON.stringify(err), "danger")
            }
          	console.log("reject", err);
        }
      );
    }
    
    this.setAlert = function(message, type) {
        self.message = {"content": message, "type": type};
    }
    this.closeAlert = function() {
        self.message = null;
    }
    
    
  }
});
