myApp.controller('devicesHomeCtrl', function($location,$scope,$rootScope,httpClient, infoWindowActions, $routeParams, $timeout, $mdDialog, $uibModal, $route) {
    var vm = this;
    vm.deviceTitle = "Device Manager";
    vm.renderGrid = true;
    vm.infoWindowActions = infoWindowActions;
    vm.gridId =  "device";
    vm.gridAPI = "identity/api/devices/listDevices";
    vm.init = function() {
        
    }

    
    vm.changeTab = function(value){
        vm.gridId = value;
        if(vm.gridId ==  "group")
            vm.gridAPI = "identity/api/groups/listGroups";
        else if (vm.gridId ==  "device")
            vm.gridAPI = "identity/api/devices/listDevices";
    }

                        vm.groupsColDef = [{
                            checkboxSelection: true,
                            headerName: "Group Name", 
                            field: "groups", 
                            width: 180,
                            cellClass: "textWrap", 
                            editable : false,
                            cellRenderer: function(params) {
                                return params.value? params.value.split("_")[0]: 'N/A';
                            }
                       },
                       {
                           headerName: "Number of Devices", 
                           field: "count", 
                           width: 180,
                           cellClass: "textWrap", 
                           editable : false,
                           cellRenderer: function(params) {
                               return params.value? params.value.split("_")[0]: 'N/A';
                           }
                       },
                       {
                           headerName: "", 
                           width: 80,
                           cellClass: "textWrap", 
                           editable : false,
                           cellRenderer: function(params) {
                               var eDiv = document.createElement('div');
                               var btn = '<button class="btn btn-default btn-block" type="button">View</button>';
                               eDiv.innerHTML = btn;
                               var viewBtn = eDiv.querySelectorAll('.btn')[0];
                               viewBtn.addEventListener('click', function(clickParams) { 
                                    vm.showViewDialog(params)
                               });
                               return eDiv;
                           }
                       },
                       {
                           headerName: "", 
                           width: 80,
                           cellClass: "textWrap", 
                           editable : false,
                           cellRenderer: function(params) {
                               var eDiv = document.createElement('div');
                               var btn = '<button class="btn btn-default btn-block" type="button">Edit</button>';
                               eDiv.innerHTML = btn;
                               var editBtn = eDiv.querySelectorAll('.btn')[0];
                               editBtn.addEventListener('click', function(clickParams) { 
                                   vm.loadEditGroupOverlay(params.data, vm.infoWindowActions.group, 'identity/api/groups/saveGroup');
                               });
                               return eDiv;
                           }
                       },
                       {
                           headerName: "", 
                           width: 80,
                           cellClass: "textWrap", 
                           editable : false,
                           cellRenderer: function(params) {
                               var eDiv = document.createElement('div');
                               var btn = '<button class="btn btn-default btn-block" type="button">Delete</button>';
                               eDiv.innerHTML = btn;
                               var deleteBtn = eDiv.querySelectorAll('.btn')[0];
                               deleteBtn.addEventListener('click', function(clickParams) { 
                                  //var gridInstance =  params.api;
                                  vm.showConfirmDialog(params);
                                  
                               });
                               return eDiv;
                           }
                       },
                      ];
    
    
    
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
                                vm.showViewDialog(params);
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
                                     vm.loadEditDeviceOverlay(params.data, vm.infoWindowActions.device, 'identity/api/devices/saveDevice');
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
                      }
                    ];
    

    vm.showAlert = function(type, content) {
        $scope.$broadcast("showGridAlert-"+vm.gridId, {"type" : type, "content" : content});
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

    
        vm.loadEditGroupOverlay = function(groupData, overlayForm, backendApi) {
            httpClient.post("identity/api/groups/getGroupDevices", groupData).then(
                function(data, response) {
                    if(data.status && data.status == "failure"){
                        console.log("getGroupDevices response", data);
                        return;
                    }
                    vm.closeAlert();
                    var of = angular.copy(overlayForm);
                    of.title = "Edit "+of.title;
                    var formWidget = {
                        'label': of.title,
                        'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                        'schema': angular.copy(of.schema),
                        'form': angular.copy(of.form),
                        'model': {"name": groupData.groups, "devices": data.devices, "originalName":groupData.groups, "originalDevices":data.devices}
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
                            console.log('Model Data', wdgModel);
                            var successHandler = function(data) {
                                $scope.$broadcast("updateGridData-"+vm.gridId, {});
                    			vm.showAlert("success", "Successfully saved group");
                            }
                            var failureHandler = function(err) {
                                vm.showAlert("danger", "Could not save group, please try again later");
                                console.log('Error when saving group', err);
                            }
                            
                            wdgModel.update = true;
                            wdgModel.originalDevices = formWidget.model.originalDevices;
                            if(wdgModel.originalName != wdgModel.name){
                                wdgModel.newName = wdgModel.name;
                                wdgModel.name = wdgModel.originalName;
                            }
                            if(JSON.stringify(wdgModel.originalDevices)==JSON.stringify(wdgModel.devices))
                                wdgModel.updateDevices = false;
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
    
    vm.loadEditDeviceOverlay = function(deviceData, overlayForm, backendApi) {
            httpClient.post("identity/api/devices/getDevice", deviceData).then(
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
                    var required = ["name","id"];
                    var schema = angular.copy(of.schema);
                    schema.required = required;
                    var formWidget = {
                        'label': of.title,
                        'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                        'schema': schema,
                        'form': form,
                        'model': {"name": deviceData.name, "id": deviceData.id, "description": deviceData.description, "isSuspended": deviceData.isSuspended, "groups":groupsArr, "deviceAttrs": deviceAttrsArray}
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
    
    
    vm.closeAlert = function() {
        this.showError = false;
    };


    
    vm.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    
    vm.showConfirmDialog = function(params) {
        console.log("params.data >>>> " + JSON.stringify(params.data));
        var localsObj = {grid: params.api, parent: vm};
        if(vm.gridId == "device"){
            localsObj.deviceData = params.data;
        } else if(vm.gridId == "group"){
            localsObj.groupData = params.data;
        }
        $mdDialog.show({
            controller: vm.gridId+'ConfirmDialogCtrl',
            controllerAs: 'vm',
            templateUrl: 'html/views/'+vm.gridId+'s/confirmationDialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: localsObj,
            ok: 'Close'
        });
    }
    
    vm.showViewDialog = function(params) {
        var controller = "";
        var templateUrl = "";
        var localsObj = {};
        if(vm.gridId == "device"){
            localsObj = {grid: params.api, deviceData: params.data, parent: vm};
            controller = 'viewDeviceDialogCtrl';
            templateUrl = 'html/views/devices/viewDevice.html';
        } else if (vm.gridId == "group"){
            localsObj = {groupData: params.data, parent: vm};
            controller = 'viewGroupDialogCtrl';
            templateUrl = 'html/views/groups/viewGroup.html';
        }
            $mdDialog.show({
                controller: controller,
                controllerAs: 'vm',
                templateUrl: templateUrl,
                clickOutsideToClose:true,
                escapeToClose: true,
                locals: localsObj,
                ok: 'Close'
            });
        }
    
});


myApp.controller('deviceConfirmDialogCtrl', function(httpClient, deviceData, grid, parent, $mdDialog) {
    var vm = this;
    vm.isLoading = false;
    vm.deleteStatus = 'Deleting device...';
    vm.deviceId = deviceData.id;
    vm.grid = grid;
    vm.parent = parent;
    vm.deviceDeleted = false;
	vm.showMessage = true;
    vm.header = "Delete";
    
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

myApp.controller('viewDeviceDialogCtrl', function($timeout, httpClient, deviceData, grid, parent, $mdDialog) {
    var vm = this;
    vm.promptMessage = 'Fetching device...';
    vm.deviceData = deviceData;
    vm.deviceId = deviceData.id;
    vm.parent = parent;
    vm.grid = grid;
    vm.deviceFetched = false;
    vm.hidePromptMessage = false;
    vm.showTokenButtons = true;
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
                vm.hidePromptMessage = true;
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
    
    vm.EditDevice = function(){
        vm.closeDialog();
        var infoWindowActions = vm.parent.infoWindowActions.device;
        vm.parent.loadEditDeviceOverlay(vm.deviceData, infoWindowActions, 'identity/api/devices/saveDevice')
    }
    
    vm.copyToken = function() {
        navigator.clipboard.writeText(vm.token).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    vm.regenerateToken = function() {
        vm.generateToken("regenerate");
    }
    
    vm.generateToken = function(action) {
       var apiPath = "identity/api/devices/generateTokens";
        if(action != null && action == "regenerate") {
            action = "regenerate";
        } else {
            action = "generate";
        }
        var parameters = {
            "id": vm.id,
            "action": action
        }
        console.log('calling '+action+' with parameters = ' + JSON.stringify(parameters));
        httpClient.post(apiPath, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("Failed: "+action+" response", data);
                    return;
                }

                vm.token = data.token ? data.token : "N/A";
                vm.grid.refreshInfiniteCache();
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
                vm.showTokenButtons = true;
                if(data.status && data.status == "failure"){
                    console.log("Failed: revokeToken response", data);
                    return;
                }
                vm.token = "N/A";
                vm.grid.refreshInfiniteCache();
                vm.showPromptMessage(false, "Successfully deleted token");
                console.log("Success: revokeToken response", JSON.stringify(data));
            },
            function(err) {
                vm.showTokenButtons = true;
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
    
    vm.confirmDeleteToken = function(){
        vm.showTokenButtons = false;
        
    }
    
    vm.cancelDeleteToken = function(){
        vm.showTokenButtons = true;
    }
    
    vm.showPromptMessage = function(loading, message){
        vm.promptMessage = message;
        vm.isLoading = loading;
        vm.hidePromptMessage = false;
        $timeout(function(){
            vm.hidePromptMessage = true;
        }, 5000);
    }
    
    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});



myApp.controller('groupConfirmDialogCtrl', function(httpClient, groupData, grid, parent, $mdDialog) {
    var vm = this;
    vm.isLoading = false;
    vm.deleteStatus = 'Deleting group...';
    vm.groupName = groupData.groups;
    vm.grid = grid;
    vm.parent = parent;
    vm.groupDeleted = false;
	vm.showMessage = true;
    vm.header = "Delete";
    
    vm.init = function() {
        vm.promptMessage = "Are you sure you want to delete '"+ vm.groupName +"'?"
    }
    
	vm.deleteGroup = function() {
        vm.showLoading();
        var parameters = {
            groupName: vm.groupName
        }
        console.log('calling delete group with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/groups/deleteGroup", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("deleteGroup response", data);
                    vm.parent.showAlert("danger", "Could not delete group, please try again later");
                    vm.closeDialog();
                    return;
                }

                vm.parent.showAlert("success", "Successfully deleted group");
                vm.groupDeleted = true;
                //refresh grid
                vm.grid.refreshInfiniteCache();
                console.log("deleteGroup response", data);
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.parent.showAlert("success", "Successfully deleted group");
                    vm.groupDeleted = true;
                    //refresh grid
                    vm.grid.refreshInfiniteCache();
                	console.log("deleteGroup response", err);
                    vm.closeDialog();
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.parent.showAlert("danger", "Could not delete group, please try again later");
                console.log("deleteGroup response", err);
                vm.closeDialog();
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

myApp.controller('viewGroupDialogCtrl', function($timeout, httpClient, parent, groupData, $mdDialog) {
    var vm = this;
    vm.promptMessage = 'Fetching group...';
    vm.groupData = groupData;
    vm.groupName = groupData.groups;
    vm.parent = parent;
    vm.groupFetched = false;
    vm.init = function() {
        vm.getGroup();
    }
    
	vm.getGroup = function() {
        vm.isLoading = true;
        var parameters = {
            groupName: vm.groupName
        }
        console.log('calling getGroupToView with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/groups/getGroupDevicesToView", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("getGroupDevicesToView response", data);
                    vm.promptMessage = "Could not fetch device, please try again later";
                    vm.isLoading = false;
                    return;
                }

                vm.name = data.groupName ? data.groupName : "N/A";
                if(data.devices != null && data.devices.length >0){
                    if(data.devices instanceof Array){
                        vm.devices = data.devices;
                    }else{
                        vm.devices = [data.devices];
                    }
                } else {
                    vm.devices = "N/A";
                }
                vm.promptMessage = "Success";
                vm.groupFetched = true;
                vm.hidePromptMessage = true;
                vm.isLoading = false;
                console.log("getGroupDevicesToView response", JSON.stringify(data));
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
    
    vm.EditGroup = function(){
        vm.closeDialog();
        var infoWindowActions = vm.parent.infoWindowActions.group;
        vm.parent.loadEditGroupOverlay(vm.groupData, infoWindowActions, 'identity/api/groups/saveGroup')
    }
    
    vm.showPromptMessage = function(loading, message){
        vm.promptMessage = message;
        vm.isLoading = loading;
        vm.hidePromptMessage = false;
        $timeout(function(){
            vm.hidePromptMessage = true;
        }, 5000);
    }
    
     vm.closeDialog = function() {
        $mdDialog.hide();
    };
});