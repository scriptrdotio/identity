myApp.controller('devicesHomeCtrl', function($location,$scope,$rootScope,httpClient, infoWindowActions, $routeParams, $timeout, $mdDialog, $uibModal, $route) {
    var vm = this;
    vm.deviceTitle = "Device Manager";
    vm.renderGrid = true;
    vm.infoWindowActions = infoWindowActions;
    
    vm.devicesColDef = [
        {	checkboxSelection: true,
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
                eDiv.innerHTML = '<button class="btn btn-default btn-view">View</button>';

                vButton = eDiv.querySelectorAll('.btn-view')[0];
                vButton.addEventListener('click', function() {
                    vm.showViewDeviceDialog(params);
                });
                return eDiv;
                },
            width: 65,
          },
        {
            headerName: ' ',
            field: 'value',
            cellRenderer: function(params){
                    var eDiv = document.createElement('div');
                    var vButton;
                    eDiv.innerHTML = '<button class="btn btn-default btn-edit">Edit</button>';

                    vButton = eDiv.querySelectorAll('.btn-edit')[0];
                    vButton.addEventListener('click', function(clickParams) {
                         vm.loadEditOverlay(params, vm.infoWindowActions.device, 'identity/api/devices/saveDevice');
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
                    eDiv.innerHTML = '<button class="btn btn-default btn-delete">Delete</button>';

                    vButton = eDiv.querySelectorAll('.btn-delete')[0];
                    vButton.addEventListener('click', function() {
                        vm.showConfirmDialog(params);
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
                    eDiv.innerHTML = '<button class="btn btn-default btn-cptoken">Copy Token</button>';

                    vButton = eDiv.querySelectorAll('.btn-cptoken')[0];
                    vButton.addEventListener('click', function() {
                        vm.copyToClipboard(params.data.auth_token);
                    });
                    return eDiv;
                },
            width: 100,
          }
        ];
    
    vm.closeAlert = function() {
        this.showError = false;
    };

    vm.showAlert = function(type, content) {
        vm.message = {
            "type" : type,
            "content" : content
        }
        vm.showError = true;
        $timeout(function(){
            vm.showError = false;
        }, 5000);
    }
    
    vm.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    vm.gridAPI = "identity/api/devices/listDevices";
        
    vm.showConfirmDialog = function(params) {
        console.log("params.data >>>> " + JSON.stringify(params.data));
        $mdDialog.show({
            controller: 'confirmDialogCtrl',
            controllerAs: 'vm',
            templateUrl: 'html/views/devices/confirmationDialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {deviceData: params.data, grid: params.api, parent: vm},
            ok: 'Close'
        });
    }
    
    
    vm.gridId =  "device";
  
    vm.showViewDeviceDialog = function(params) {
        $mdDialog.show({
            controller: 'viewDeviceDialogCtrl',
            controllerAs: 'vm',
            templateUrl: 'html/views/devices/viewDevice.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {deviceData: params.data},
            ok: 'Close'
        });
    }
    
            vm.loadEditOverlay = function(marker, overlayForm, backendApi) {
            httpClient.post("identity/api/devices/getDevice", marker.data).then(
                function(data, response) {
                    if(data.status && data.status == "failure"){
                        console.log("getGroupDevices response", data);
                        return;
                    }
                    var groupsArr = [];
                    if(data.groups instanceof Array){
                        groupsArr = data.groups;
                    }else{
                        groupsArr = [data.groups];
                    };
                    var defaultAttrs = ["name", "groups", "creator", "auth_token", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "description", "id", "meta.types"];
                    var deviceAttrsArray = [];
                    var metaTypes = data["meta.types"];
                    Object.keys(data).forEach(function(key) {
                        if(defaultAttrs.indexOf(key)<0){
                            vm.hasAttrs = true;
                            var deviceAttrsObj = {};
                            deviceAttrsObj.name = key;
                            deviceAttrsObj.type = metaTypes[key];
                            deviceAttrsObj.value = data[key];
                            deviceAttrsArray.push(deviceAttrsObj);
                        }
                    });
                    
                    
                    vm.closeAlert();
                    var of = angular.copy(overlayForm);
                    of.title = "Edit "+of.title;
                    var form = angular.copy(of.form);
                    form[0].items[1].readonly = true;
                    var formWidget = {
                        'label': of.title,
                        'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                        'schema': angular.copy(of.schema),
                        'form': form,
                        'model': {"name": marker.data.name, "id": marker.data.id, "description": marker.data.description, "isSuspended": marker.data.isSuspended, "groups":groupsArr, "deviceAttrs": deviceAttrsArray}
                    }
                    
                    var self = this;
                    var modalInstance= $uibModal.open({
                        animation: true,
                        component: 'formOverlay',
                        size: 'lg',
                        scope: $scope,
                        resolve: {
                            widget: function() {
                                return formWidget;
                            }
                        }
                    });

                    modalInstance.result.then(function (wdgModel) {
                        console.log('Model Data', wdgModel);
                        if(wdgModel != 'cancel') {
                            var successHandler = function(data) {
                                $scope.$broadcast("updateGridData-"+vm.gridId, {});
                                vm.showAlert("success", "Successfully saved device");
                            }
                            var failureHandler = function(err) {
                                vm.showAlert("danger", "Could not save device, please try again later");
                                console.log('Error when saving device', err);
                            }
                            vm.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
                        }
                    }, function () {
                        console.info('modal-component for widget update dismissed at: ' + new Date());
                    });
                },
                function(err) {
                    console.dir(err);
                    if(err.status == "success"){
                        //refresh grid
                        console.log("getGroupDevices response", err);
                        return;
                    }

                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail;
                    }
                    console.log("getGroupDevices response", err);
                }
                );
    };
    
    
    vm.init = function() {
    }

    vm.callBackendApiPost = function(apiId, parameters, successHandler, failureHandler) {
        console.log	('POST calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'P', successHandler, failureHandler);
    };
    
    vm._callBackendApi = function(apiId, parameters, method, successHandler, failureHandler) {
        var httpMeth = httpClient.post;
        if (method == 'G') {
            httpMeth = httpClient.get;
        }
        
    	httpMeth(apiId, parameters)
        .then(
        function(data, response) {
            console.log(data);
            if (data && data.status && data.status == 'failure') {
            	if (typeof failureHandler === 'function') failureHandler(data);
            } else {
	            if (typeof successHandler === 'function') successHandler(data);
            }
        },
        function(err) {
            console.log(err);
            if (typeof failureHandler === 'function') failureHandler(err);
        });
    }

    
    vm.showDialog = function(data) {
        $mdDialog.show({
            controller: 'deviceDialog',
            controllerAs: 'vm',
            templateUrl: 'html/views/dialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {response: data},
            ok: 'Close'
        });
    }
    
});


myApp.controller('deviceDialog', function(httpClient, response, $mdDialog) {
    var vm = this;
    vm.response = response;
    vm.title = "Saving Device";

    vm.init = function() {
        if(response.errorDetail != null)
            vm.promptMessage = vm.response.status +": " +response.errorDetail;
        else 
            vm.promptMessage = vm.response.status;
        if(response.status == null )
            vm.promptMessage = "success";

    } 

    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});

myApp.controller('confirmDialogCtrl', function(httpClient, deviceData, grid, parent, $mdDialog) {
    var vm = this;
    vm.isLoading = false;
    vm.deleteStatus = 'Deleting device...';
    vm.deviceId = deviceData.id;
    vm.grid = grid;
    vm.parent = parent;
    vm.deviceDeleted = false;
	vm.showMessage = true;
    vm.header = "Confirmation";
    
    vm.init = function() {
        vm.promptMessage = "Are you sure you want to delete '"+ vm.deviceId +"'?"
    }
    
	vm.deleteDevice = function() {
        vm.showLoading();
        var parameters = {
            id: vm.deviceId
        }
        console.log('calling delete device with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/devices/deleteDevice", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("deleteDevice response", data);
                    vm.parent.showAlert("danger", "Could not delete device, please try again later");
                    vm.closeDialog();
                    return;
                }
				
                vm.parent.showAlert("success", "Successfully deleted device");
                vm.deviceDeleted = true;
                
                //refresh grid
                vm.grid.refreshInfiniteCache();
                console.log("deleteDevice response", data);
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.parent.showAlert("success", "Successfully deleted device");
                    vm.deviceDeleted = true;
                    //refresh grid
                    vm.grid.refreshInfiniteCache();
                	console.log("deleteDevice response", err);
                    vm.closeDialog();
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.parent.showAlert("danger", "Could not delete device, please try again later");
                vm.closeDialog();
                console.log("deleteDevice response", err);
            }
        );
    }
    
    vm.showLoading = function() {
        vm.isLoading = true;
        vm.showMessage = false;
    }
    vm.hideLoading = function() {
        vm.isLoading = false;
        vm.showMessage = true;
    }
    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});

myApp.controller('viewDeviceDialogCtrl', function(httpClient, deviceData, $mdDialog) {
    var vm = this;
    vm.promptMessage = 'Fetching device...';
    vm.deviceId = deviceData.id;
    vm.deviceFetched = false;
    vm.init = function() {
        vm.getDevice();
    }
    
	vm.getDevice = function() {
        vm.isLoading = true;
        var parameters = {
            id: vm.deviceId
        }
        console.log('calling getDevice with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/devices/getDevice", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("getDevice response", data);
                    vm.promptMessage = "Could not fetch device, please try again later";
                    vm.isLoading = false;
                    return;
                }

                vm.name = data.name ? data.name : "N/A";
                vm.id = data.id ? data.id : "N/A";
                vm.description = data.description ? data.description : "N/A";
                if(data.groups != null){
                    if(data.groups instanceof Array){
                       vm.groups = data.groups;
                    }else{
                       vm.groups = [data.groups];
                    }
                } else {
                    vm.groups = ["N/A"];
                }
                var devStatus = "";
                if(data.isSuspended != null){
                    if(data.isSuspended == "true")
                   		devStatus = "Suspended";
                    else if(data.isSuspended == "false")
                        devStatus = "Active"
                }
                vm.status = devStatus != "" ? devStatus : 'N/A';
                vm.token = data.auth_token ? data.auth_token : "N/A";
                
                vm.hasAttrs = false;
                var defaultAttrs = ["name", "groups", "creator", "auth_token", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "description", "id", "meta.types"];
                var deviceAttrsArray = [];
                var metaTypes = data["meta.types"];
                Object.keys(data).forEach(function(key) {
                    if(defaultAttrs.indexOf(key)<0){
                        vm.hasAttrs = true;
                        var deviceAttrsObj = {};
                        deviceAttrsObj.name = key;
                        deviceAttrsObj.type = metaTypes[key];
                        deviceAttrsObj.value = data[key];
                        deviceAttrsArray.push(deviceAttrsObj);
                    }
                })
                vm.deviceAttrs = deviceAttrsArray;
                
                
                vm.promptMessage = "Success";
                vm.deviceFetched = true;
                vm.isLoading = false;
                console.log("getDevice response", JSON.stringify(data));
            },
            function(err) {
                console.dir(err);
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.promptMessage = "Could not fetch device, please try again later";
                vm.isLoading = false;
                console.log("getDevice response", JSON.stringify(err));
            }
        );
    }
    
    vm.copyToken = function() {
        navigator.clipboard.writeText(vm.token).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    vm.regenerateToken = function() {
        vm.generateToken("regenerateToken");
    }
    
    vm.generateToken = function(action) {
        var apiPath = "";
        if(action != null && action == "regenerateToken") {
            apiPath = "identity/api/devices/regenerateToken";
        } else {
            action = "generateToken";
            apiPath = "identity/api/devices/generateToken";
        }
        var parameters = {
            id: vm.id
        }
        console.log('calling '+action+' with parameters = ' + JSON.stringify(parameters));
        httpClient.post(apiPath, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("Failed: "+action+" response", data);
                    return;
                }

                vm.token = data.token ? data.token : "N/A";
                console.log("Success: "+action+" response", JSON.stringify(data));
            },
            function(err) {
                console.dir(err);
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                console.log("Failed: "+action+" response", JSON.stringify(err));
            }
    	);
    }
    
    vm.revokeToken = function() {
        var parameters = {
            id: vm.id
        }
        console.log('calling revokeToken with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/devices/revokeToken", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("Failed: revokeToken response", data);
                    return;
                }

                vm.token = "N/A";
                console.log("Success: revokeToken response", JSON.stringify(data));
            },
            function(err) {
                console.dir(err);
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                console.log("Failed: revokeToken response", JSON.stringify(err));
            }
    	);
    }
    
    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});