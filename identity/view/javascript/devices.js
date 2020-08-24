myApp.controller('devicesHomeCtrl', function($location,$scope,$rootScope,httpClient, $routeParams, $timeout, $mdDialog, $uibModal, $route) {
    var vm = this;
    vm.deviceTitle = "Device Manager";
    vm.renderGrid = true;
    
    vm.devicesColDef = [
        {
            headerName: "Device Name", 
            field: "name", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Device ID", 
            field: "id", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Description", 
            field: "description", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Token", 
            field: "auth_token", 
            width: 620,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Last Modified", 
            field: "lastModifiedDate", 
            width: 280,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Status", 
            field: "isSuspended", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var status = "";
                if(params.value != null){
                   	var isSuspended = params.value;
                    if(isSuspended == "true")
                   		status = "Suspended";
                    else if(isSuspended == "false")
                        status = "Active"
                }
                return status != "" ? status : 'N/A';
            }
        },
        {
            headerName: ' ',
            field: 'value',
            cellRenderer: function(params){
                var eDiv = document.createElement('div');
                var vButton;
                eDiv.innerHTML = '<button class="btn btn-primary btn-view">View</button>';

                vButton = eDiv.querySelectorAll('.btn-view')[0];
                vButton.addEventListener('click', function() {
                    vm.showAlert(params);
                });
                return eDiv;
                },
            width: 60,
          },
        {
            headerName: ' ',
            field: 'value',
            cellRenderer: function(params){
                    var eDiv = document.createElement('div');
                    var vButton;
                    eDiv.innerHTML = '<button class="btn btn-primary btn-edit">Edit</button>';

                    vButton = eDiv.querySelectorAll('.btn-edit')[0];
                    vButton.addEventListener('click', function() {
                        vm.showAlert(params);
                    });
                    return eDiv;
                },
            width: 60,
          },
        {
            headerName: ' ',
            field: 'value',
            cellRenderer: function(params){
                	var eDiv = document.createElement('div');
                    var vButton;
                    eDiv.innerHTML = '<button class="btn btn-primary btn-delete">Delete</button>';

                    vButton = eDiv.querySelectorAll('.btn-delete')[0];
                    vButton.addEventListener('click', function() {
                        vm.deleteDevice(params);
                    });
                    return eDiv;
                },
            width: 80,
          },
        {
            headerName: ' ',
            field: 'value',
            cellRenderer: function(params){
                	var eDiv = document.createElement('div');
                    var vButton;
                    eDiv.innerHTML = '<button class="btn btn-primary btn-cptoken">Copy Token</button>';

                    vButton = eDiv.querySelectorAll('.btn-cptoken')[0];
                    vButton.addEventListener('click', function() {
                        vm.copyToClipboard(params.data.auth_token);
                    });
                    return eDiv;
                },
            width: 100,
          }
        ];
    
    vm.showAlert = function(msg) {
        console.log(msg);
        alert(msg);
    }
    
    vm.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    vm.deleteDevice = function(params) {
        var parameters = {
            id: params.data.id
        }
        console.log('calling delete device with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/devices/deleteDevice", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("deleteDevice response", data);
                    vm.showAlert(data.errorDetail);
                    return;
                }

                vm.showAlert("success");
                console.log("deleteDevice response", data);
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showAlert("success");
                	console.log("deleteDevice response", data);
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert(errDesc);
                console.log("deleteDevice response", err);
            }
        );
    }
    
    vm.gridAPI = "identity/api/devices/listDevices";
        
        
    vm.init = function() {
        vm.test2 = 3;
    }
    
})