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
                            headerName: "Group Name", 
                            field: "groupName", 
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
                               var btn = '<button class="btn btn-primary btn-block" type="button">View</button>';
                               eDiv.innerHTML = btn;
                               var viewBtn = eDiv.querySelectorAll('.btn')[0];
                               viewBtn.addEventListener('click', function(clickParams) { 
                                    vm.loadOverlay(params, vm.infoWindowActions.addGroup, 'identity/api/groups/listGroups');
                                  // vm.showConfirmDialog(params); 
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
                               var btn = '<button class="btn btn-primary btn-block" type="button">Edit</button>';
                               eDiv.innerHTML = btn;
                               var editBtn = eDiv.querySelectorAll('.btn')[0];
                               editBtn.addEventListener('click', function(clickParams) { 
                                   //vm.editGroupsDialog(params); 
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
                               var btn = '<button class="btn btn-primary btn-block" type="button">Delete</button>';
                               eDiv.innerHTML = btn;
                               var deleteBtn = eDiv.querySelectorAll('.btn')[0];
                               deleteBtn.addEventListener('click', function(clickParams) { 
                                  // vm.deleteGroup(params); 
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
    
    vm.deleteGroup = function(params){
        var parameters = {
            groupName: params.data.groupName
        }
        console.log('calling delete group with parameters = ' + JSON.stringify(parameters));
        httpClient.post("identity/api/groups/deleteGroup", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    console.log("deleteGroup response", data);
                    vm.showAlert(data.errorDetail);
                    return;
                }
				params.$scope.rowNode.setData(params.data);
                vm.showAlert("success");
                console.log("deleteGroup response", data);
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showAlert("success");
                	console.log("deleteGroup response", data);
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert(errDesc);
                console.log("deleteGroup response", err);
            }
        );
    }
    
    vm.showConfirmDialog = function(params) {
        $mdDialog.show({
            controller: 'confirmDialogCtrlGroup',
            controllerAs: 'vm',
            templateUrl: 'html/views/groups/confirmationDialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {deviceData: params.data},
            ok: 'Close'
        });
    }

    vm.gridAPI = "identity/api/groups/listGroups";
    vm.deleteRow = function(params) {
         params.$scope.rowNode.setData(params.data);
    };
        vm.showAlert = function(msg) {
        console.log(msg);
        alert(msg);
    }
    vm.showDevicePhotosDialog = function(){
        alert("Hello! I am an alert box!!");
    }

});
myApp.controller('confirmDialogCtrlGroup', function(httpClient, deviceData, $mdDialog) {
    var vm = this;
    vm.isLoading = true;
    vm.deleteStatus = 'Deleting device...';
    vm.deviceId = deviceData.id;
    vm.deviceDeleted = false;
	vm.showMessage = true;
    vm.header = "Confirmation";
    vm.init = function() {
        vm.confirmationMessage = "Are you sure you want to delete this device?"
    }
	
    vm.hideLoading = function() {
        vm.isLoading = false;
        vm.deviceDeleted = true;
    }
    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});