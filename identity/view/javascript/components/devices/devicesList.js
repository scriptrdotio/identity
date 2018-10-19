angular.module('Identity')
  .component('devicesList', {
  bindings: {
    title: '<title',
    devices: '<devices',
    message: '@message',
    onDelete: '&',
    onUpdate: '&'
  },
  templateUrl: '/identity/view/javascript/components/devices/devicesList.html',
  controller: function($scope, _ , identityService){
    var self = this;
    self.isLoading = true;
      
    this.$onInit = function() {
        $scope.$on("reloadDevicesList", function(event, data) {
            self.listDevices()
        })
    }
    
    this.listDevices = function() {
      identityService.listDevices().then(
        function(data, response) {
          self.isLoading = false;
          if(data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            self.devices = _.flatten(_.pluck(data, "id"));
          }
          console.debug("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          if(err.data && err.data.response && err.data.response.metadata.status == "failure") {
               self.setAlert(err.data.response.metadata.errorDetail, "danger")
          } else {
          	  self.setAlert(JSON.stringify(err), "danger")
          }
          console.error("reject", err);
        }
      );
    }
    this.deleteDevice = function(id) {
      var self = this;
      var deviceId = id;
      identityService.deleteDevice(id).then(
        function(data, response) {
          self.isLoading = false;
          if(data && data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            if(data.status == "success") {
              self.devices = angular.copy(_.reject(self.devices, function(device){ return device == deviceId; }));
              console.log(self.devices);
              self.setAlert("Device deleted successfully", "success")
            }
          }
          console.log("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          self.setAlert(JSON.stringify(err), "danger")
          console.log("reject", err);
        }
      );
    }
    
    this.editDevice = function(id) {
      $scope.$emit('editDevice', {
        "id": id 
      });
    },
      
    this.addDevice =  function() {
       $scope.$emit('addDevice');
    }
    
    this.setAlert = function(message, type) {
        self.message = {"content": message, "type": type};
    }
    
    this.closeAlert = function() {
        self.message = null;
    }
  }
});
