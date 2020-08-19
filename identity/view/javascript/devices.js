myApp.controller('devicesHomeCtrl', function($location,$scope,$rootScope,httpClient, $routeParams, $timeout, $mdDialog, $uibModal, $route) {
    var vm = this;
    vm.test = "bla";
    vm.renderGrid = true;
    
    vm.devicesColDef = [{
            headerName: "Id", 
            field: "id", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        }];
    
    vm.gridAPI = "identity/api/devices/listDevices";
        
        
    vm.init = function() {
        vm.test2 = 3;
    }
    
})