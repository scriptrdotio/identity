myApp.controller('groupsHomeCtrl', function($location,$scope,$rootScope,httpClient, infoWindowActions, $routeParams, $timeout, $mdDialog, $uibModal, $route) {
    
    var vm = this;
    vm.title = "Group Manager";
    vm.infoWindowActions = infoWindowActions;
    vm.button = "Add Group";
    vm.addGroupOverLay = function (){
         vm.loadOverlay(null, vm.infoWindowActions.addGroup, 'identity/api/groups/saveGroup');
    };
    
        vm.init = function() {
          
        }

    vm.renderGrid = true;

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
                                    vm.showViewGroupDialog(params)
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
                                   vm.loadEditOverlay(params, vm.infoWindowActions.addGroup, 'identity/api/groups/saveGroup');
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
                               deleteBtn.addEventListener('click', function(event, params) { 
                                  var gridInstance =  params.api;
                                  vm.showConfirmDialog(event);
                                  
                               });
                               return eDiv;
                           }
                       }


                      ];
    vm.closeAlert = function() {
        vm.hasAlert = false;
    };

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

    
    
    vm.loadOverlay = function(marker, overlayForm, backendApi) {
        vm.closeAlert();
        var of = angular.copy(overlayForm);
        var formWidget = {
            'label': of.title,
            'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
            'schema': angular.copy(of.schema),
            'form': angular.copy(of.form),
            'options': {}
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
                // console.log(' Data', marker.data);
                var successHandler = function(data) {
                    vm.showAlert('success', of.title + ' successful')
                }
                var failureHandler = function(err) {
                    vm.showAlert('danger', of.title + ' failure: ' + err.errorDetail);
                }
                //wdgModel.groupName = marker.data.id;
                vm.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
            }
        }, function () {
            console.info('modal-component for widget update dismissed at: ' + new Date());
        });
    };
    
        vm.loadEditOverlay = function(marker, overlayForm, backendApi) {
            httpClient.post("identity/api/groups/getGroupDevices", marker.data).then(
                function(data, response) {
                    if(data.status && data.status == "failure"){
                        console.log("getGroupDevices response", data);
                        return;
                    }
                    vm.closeAlert();
                    var of = angular.copy(overlayForm);
                    var formWidget = {
                        'label': of.title,
                        'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                        'schema': angular.copy(of.schema),
                        'form': angular.copy(of.form),
                        'model': {"name": marker.data.groups, "devices": data.devices, "originalName":marker.data.groups, "originalDevices":data.devices}
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
                            // console.log(' Data', marker.data);
                            var successHandler = function(data) {
                                vm.showAlert('success', of.title + ' successful')
                            }
                            var failureHandler = function(err) {
                                vm.showAlert('danger', of.title + ' failure: ' + err.errorDetail);
                            }
                            
                            //JSON.stringify(a)==JSON.stringify(b)
                            wdgModel.update = true;
                            wdgModel.originalDevices = formWidget.model.originalDevices;
                            if(wdgModel.originalName != wdgModel.name){
                                wdgModel.newName = wdgModel.name;
                                wdgModel.name = wdgModel.originalName;
                            }
                            //console.log(formWidget.original);
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
    
    vm.callBackendApiGet = function(apiId, parameters, successHandler, failureHandler) {
        console.log('GET calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'G', successHandler, failureHandler);
    }
    
    vm.showConfirmDialog = function(params) {
        console.log("params.data >>>> " + JSON.stringify(params.data));
        $mdDialog.show({
            controller: 'groupConfirmDialogCtrl',
            controllerAs: 'vm',
            templateUrl: 'html/views/groups/confirmationDialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {groupData: params.data},
            ok: 'Close'
        });
    }
    vm.gridAPI = "identity/api/groups/listGroups";
     
    vm.showViewGroupDialog = function(params) {
        $mdDialog.show({
            controller: 'viewGroupDialogCtrl',
            controllerAs: 'vm',
            templateUrl: 'html/views/groups/viewGroup.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {groupData: params.data},
            ok: 'Close'
        });
    }
        vm.showAlert = function(msg) {
        console.log(msg);
        alert(msg);
    }

        vm.closeAlert = function() {
            vm.hasAlert = false;
        };

});
myApp.controller('groupConfirmDialogCtrl', function(httpClient, groupData, $mdDialog) {
    var vm = this;
    vm.isLoading = false;
    vm.deleteStatus = 'Deleting group...';
    vm.groupName = groupData.groups;
    vm.groupDeleted = false;
	vm.showMessage = true;
    vm.header = "Confirmation";
    
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
                    vm.promptMessage = "Could not delete group, please try again later";
                    vm.hideLoading();
                    return;
                }

                vm.promptMessage = "Success";
                vm.groupDeleted = true;
                vm.hideLoading();
                //refresh grid
                console.log("deleteGroup response", data);
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.promptMessage = "Success";
                    vm.groupDeleted = true;
                    vm.hideLoading();
                    //refresh grid
                	console.log("deleteGroup response", err);
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.promptMessage = "Could not delete group, please try again later";
                vm.hideLoading();
                console.log("deleteGroup response", err);
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

myApp.controller('viewGroupDialogCtrl', function(httpClient, groupData, $mdDialog) {
    var vm = this;
    vm.promptMessage = 'Fetching group...';
    vm.groupName = groupData.groups;
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
                    console.log("getDevice response", data);
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
    
    
    
    
    
    
     vm.closeDialog = function() {
        $mdDialog.hide();
    };
});