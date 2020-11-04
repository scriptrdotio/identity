angular.module('Identity', ['agGrid', "schemaForm", 
	"ui.bootstrap", 
	"ngRoute", 
	"ngAnimate", 
	"ngSanitize", 
	"ngMaterial", 
	"ngMessages", 
	"material.svgAssetsCache", 
	"angularSpectrumColorpicker",
	"angular-underscore/filters", 
	"ui.codemirror",  
	"mgcrea.ngStrap", 
	"mgcrea.ngStrap.modal",
    "pascalprecht.translate",
    'ui.select', 
    'ui.highlight',
    'mgcrea.ngStrap.select',
    "ngSchemaFormFile",
    "ngLoadingOverlay",
    "WsClient", 
	"HttpClient", 
	"DataService"]);

angular
    .module("Identity")
    .component(
    'scriptrIdentityMain',
    { 
    	 bindings : {
         },
        templateUrl : '/identity/view/javascript/components/main/identity.html',
        controller :  function($location,$scope,$rootScope,httpClient, identityForms, $routeParams, $timeout, $mdDialog, $uibModal, $route, identityConfig, $loadingOverlay, identityFactory) {
         var self = this;
    
    this.$onInit = function() {
        var self = this;
        self.deviceTitle = "Identity Manager"; 
        self.renderGrid = true;
        self.identityForms = identityForms;
        self.gridId =  "device";
        self.identifierProperty = identityConfig.device.identifierProperty;
        self.deviceTabClass = "btnSelected";
        self.gridAPI = identityConfig.device.apis.list;
        
        angular.element(document.querySelector("body")).addClass(identityConfig.theme)
        
        self.removeDeviceConfig = {
            api: identityConfig.device.apis.delete,
            queryParam: "id"
        }

        self.removeGroupConfig = {
            api : identityConfig.group.apis.delete,
            queryParam: "name"
        }

        self.saveDeviceConfig = {
            "api": identityConfig.device.apis.save,
            "schemaFormDefinition": self.identityForms.device,
        }

        self.saveGroupConfig = {
            "api": identityConfig.group.apis.save,
            "schemaFormDefinition": self.identityForms.group,
        }
    }
            
    
    
    self.changeTab = function(value){
        self.gridId = value;
        if(self.gridId ==  "group"){
            self.deviceTabClass = "";
            self.groupTabClass = "btnSelected";
            self.identifierProperty = identityConfig.device.identifierProperty;
            self.gridAPI = identityConfig.group.apis.list;
        } else if (self.gridId ==  "device"){
            self.deviceTabClass = "btnSelected";
            self.identifierProperty = identityConfig.device.identifierProperty;
            self.groupTabClass = "";
            self.gridAPI = identityConfig.device.apis.list;
        }
    }

    self.groupsColDef = [
        {   headerName: '',
         	checkboxSelection: true,
         	headerCheckboxSelection: true,
         	width: 30
        },
        {
            headerName: "Group Name", 
            field: "name", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Number of Devices", 
            field: "count", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "", 
            width: 60,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var eDiv = document.createElement('div');
                var btn = '<button class="btn btn-default btn-block" tooltip-placement="top" uib-tooltip="View Group"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var viewBtn = eDiv.querySelectorAll('.btn')[0];
                viewBtn.addEventListener('click', function(clickParams) { 
                    self.showViewDialog(params)
                });
                return eDiv;
            }
        },
        {
            headerName: "", 
            width: 60,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var eDiv = document.createElement('div');
                var btn = '<button class="btn btn-default btn-block" tooltip-placement="auto" uib-tooltip="Edit Group"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var editBtn = eDiv.querySelectorAll('.btn')[0];
                editBtn.addEventListener('click', function(clickParams) { 
                    self.loadEditGroupOverlay(params.data, self.identityForms.group, identityConfig.group.apis.save).bind(self);
                });
                return eDiv;
            }
        },
        {
            headerName: "", 
            width: 60,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var eDiv = document.createElement('div');
                var btn = '<button class="btn btn-default btn-block" tooltip-placement="auto" uib-tooltip="Delete Group"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var deleteBtn = eDiv.querySelectorAll('.btn')[0];
                deleteBtn.addEventListener('click', function(clickParams) { 
                    self.showConfirmDialog(params);

                });
                return eDiv;
            }
        },
    ];

    self.devicesColDef = [
        {
             headerName: '',
             checkboxSelection: true,
             width: 50,
             suppressSorting : true
        },
        {	
            headerName: "Device Name", 
            field: "name", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Device ID", 
            field: "id", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {
            headerName: "Token", 
            field: "auth_token", 
            cellClass: "textWrap", 
            editable : false,
            tooltipField: 'auth_token',
            cellRenderer: function(params) {
                if(params.value) {
                    var eDiv = document.createElement('div');
                    var copyHtml = '<span tooltip-placement="auto" uib-tooltip="Copy Token" class="icon"><i class="glyphicon glyphicon-duplicate" aria-hidden="true"></i></span>';
                    var token = "..." + params.value.substr((params.value.length - 8),8);
                    eDiv.innerHTML = token + "&nbsp;&nbsp;&nbsp;" + copyHtml;
                    var copyBtn = eDiv.querySelectorAll('.icon')[0];
                    copyBtn.addEventListener('click', function(clickParams) { 
                        self.copyToClipboard(params.value);
                    });
                    return eDiv;
                } else {
                    return 'N/A';
                }
            }
        },

        {
            headerName: "Status", 
            field: "isSuspended", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var status = "Active";
                if(params.value != null){
                    var isSuspended = params.value;
                    if(isSuspended == "true")
                        status = "Suspended";
                }
                return status;
            }
        },
        {
            headerName: "Last Modified", 
            field: "lastModifiedDate", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? moment(params.value).format("DD-MMM-YYYY hh:mm A"): 'N/A';
            }
        },
        {
            headerName: ' ',
            field: 'value',
            suppressSorting : true,
            cellRenderer: function(params){
                var eDiv = document.createElement('div');
                var vButton;
                eDiv.innerHTML = '<button class="btn btn-default btn-view" tooltip-placement="auto" uib-tooltip="View Device"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-view')[0];
                vButton.addEventListener('click', function() {
                    self.showViewDialog(params);
                });
                return eDiv;
            },
            width: 60,
        },
        {
            headerName: ' ',
            field: 'value',
            suppressSorting : true,
            cellRenderer: function(params){
                var eDiv = document.createElement('div');
                var vButton;
                eDiv.innerHTML = '<button class="btn btn-default btn-edit" tooltip-placement="auto" uib-tooltip="Edit Device"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-edit')[0];
                vButton.addEventListener('click', function(clickParams) {
                    self.loadEditDeviceOverlay.bind(self, params.data)();
                });
                return eDiv;
            },
            width: 60,
        },
        {
            headerName: ' ',
            field: 'value',
            suppressSorting : true,
            cellRenderer: function(params){
                var eDiv = document.createElement('div');
                var vButton;
                eDiv.innerHTML = '<button class="btn btn-default btn-delete" tooltip-placement="auto" uib-tooltip="Delete Device"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-delete')[0];
                vButton.addEventListener('click', function() {
                    self.showConfirmDialog(params);
                });
                return eDiv;
            },
            width: 60,
        }
    ];

    self.showAlert = function(type, content) {
        $scope.$broadcast("showGridAlert-"+self.gridId, {"type" : type, "content" : content});
    }

    self.callBackendApiPost = function(apiId, parameters, successHandler, failureHandler) {
        console.log	('POST calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        self._callBackendApi(apiId, parameters, 'P', successHandler, failureHandler);
    };

    self._callBackendApi = function(apiId, parameters, method, successHandler, failureHandler) {
        var httpMeth = httpClient.post;
        if (method == 'G') {
            httpMeth = httpClient.get;
        }

        httpMeth(apiId, parameters)
            .then(
            function(data, response) {
                if (data && data.status && data.status == 'failure') {
                    if (typeof failureHandler === 'function') failureHandler(data);
                } else {
                    if (typeof successHandler === 'function') successHandler(data);
                }
            },
            function(err) {
                if (typeof failureHandler === 'function') failureHandler(err);
            });
    }

    self.loadEditGroupOverlay = function(groupData, overlayForm, backendApi) {
        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching group...</b>');
        httpClient.post(identityConfig.group.apis.getGroupDevices, groupData).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    var errDesc = 'Unknown error';
                    if (data.data && data.data.metadata && data.data.metadata.description && data.data.metadata.description.en) {
                        errDesc = data.data.metadata.description.en;
                    } else if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    self.showAlert("danger", "Could not fetch group: "+errDesc);
                    return;
                }
                self.closeAlert();
                var of = angular.copy(overlayForm);
                of.title = "Edit "+of.title;
                var formWidget = {
                    'label': of.title,
                    'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                    'schema': angular.copy(of.schema),
                    'form': angular.copy(of.form),
                    'model': {"name": groupData.name, "devices": data.devices, "originalName":groupData.name, "originalDevices":data.devices}
                }
				$loadingOverlay.hide();
                //var self = this;
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
                            if(data.scriptHandleId != null && data.scriptHandleId != ""){
                                $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Saving group and updating devices...</b>');
                                identityFactory.getJobStatus(backendApi, {scriptHandleId:  data.scriptHandleId }, 30, function (res){
                                    if (res && res == "success") {
                                        $scope.$broadcast("updateGridData-"+self.gridId, {});
                                		self.showAlert("success", "Successfully saved group and updated devices");
                                    } else {
                                        //This is in case some devices failed to update, they are returned for the user to be informed
                                        self.showAlert("warning", res);
                                    }
                                },function(err){
                                    self.showAlert("warning", "Successfully saved group. Error when updating devices");
                                })
                            }else{
                                $scope.$broadcast("updateGridData-"+self.gridId, {});
                                self.showAlert("success", "Successfully saved group");
                            }
                        }
                        var failureHandler = function(err) {
                            var errDesc = 'Unknown error';
                            if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                                errDesc = err.data.metadata.description.en;
                            } else if (err.errorDetail) {
                                errDesc = err.errorDetail;
                            }
                            self.showAlert("danger", "Could not save group: "+errDesc);
                        }

                        wdgModel.update = true;
                        wdgModel.originalDevices = formWidget.model.originalDevices;
                        if(wdgModel.originalName != wdgModel.name){
                            wdgModel.newName = wdgModel.name;
                            wdgModel.name = wdgModel.originalName;
                        }

                        var originalDevices = wdgModel.originalDevices.sort();
                        var devices = wdgModel.devices.sort();
                        // compare the sorted arrays of originalDevices and devices 
                        var resultOfcomparison = (originalDevices.length == devices.length) && originalDevices.every(function(element, index) {
                            return element === devices[index];
                        });
                        if(resultOfcomparison)
                            wdgModel.updateDevices = false;
                        self.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
                    }
                }, function () {
                    console.info('modal-component for widget update dismissed at: ' + new Date());
                });
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    $scope.$broadcast("updateGridData-"+self.gridId, {});
                    self.showAlert("success", "Successfully saved group");
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                self.showAlert("danger", "Could not save group, please try again later: "+errDesc);
            }
        );
    };
            
   self.temp = function(deviceData, data, response) {
       
       var overlayForm = identityForms.device;
       var self = this;
       console.log(self)
       if(data.status && data.status == "failure"){
           var errDesc = 'Unknown error';
           if (data.data && data.data.metadata && data.data.metadata.description && data.data.metadata.description.en) {
               errDesc = data.data.metadata.description.en;
           } else if (data.errorDetail) {
               errDesc = data.errorDetail;
           }
           self.showAlert("danger", "Could not fetch device, please try again later: "+errDesc);
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
               self.hasAttrs = true;
               var deviceAttrsObj = {};
               deviceAttrsObj.name = key;
               deviceAttrsObj.type = metaTypes[key];
               deviceAttrsObj.value = data[key];
               deviceAttrsArray.push(deviceAttrsObj);
           }
       });

       self.closeAlert();
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
       $loadingOverlay.hide();
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
           if(wdgModel != 'cancel') {
               var successHandler = function(data) {
                   $scope.$broadcast("updateGridData-"+self.gridId, {});
                   self.showAlert("success", "Successfully saved device");
               }
               var failureHandler = function(err) {
                   var errDesc = 'Unknown error';
                   if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                       errDesc = err.data.metadata.description.en;
                   } else if (err.errorDetail) {
                       errDesc = err.errorDetail;
                   }
                   self.showAlert("danger", "Could not save device, please try again later: "+errDesc);
               }
               wdgModel.update = true;
               var backendApi = identityConfig.device.apis.save;
               self.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
           }
       }, function () {
           console.info('modal-component for widget update dismissed at: ' + new Date());
       });
   }

    this.loadEditDeviceOverlay = function(deviceData) {
        var self = this;
        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching device...</b>');
        httpClient.post(identityConfig.device.apis.getDevice, deviceData).then(self.temp.bind(self, deviceData),
                function(err) {
                    if(err.status == "success"){
                        $scope.$broadcast("updateGridData-"+self.gridId, {});
                        self.showAlert("success", "Successfully saved device");
                        return;
                    }

                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail;
                    }
                    self.showAlert("danger", "Could not save device, please try again later: "+errDesc);
                }
                );
    };
    
    
    self.closeAlert = function() {
        this.showError = false;
    };

    
    self.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Copying to clipboard was successful');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
    }
    
    
    self.showConfirmDialog = function(params) {
        $mdDialog.show({
            controller: 'confirmDeleteDialogCtrl',
            controllerAs: 'vm',
            templateUrl: '/identity/view/html/views/confirmationDialog.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {dataObject: params.data, grid: params.api, parent: self},
            ok: 'Close'
        });
    }
    
    self.showViewDialog = function(params) {
        var controller = "";
        var templateUrl = "";
        var localsObj = {};
        if(self.gridId == "device"){
            localsObj = {grid: params.api, deviceData: params.data, parent: self};
            controller = 'viewDeviceDialogCtrl';
            templateUrl = '/identity/view/html/views/devices/viewDevice.html';
        } else if (self.gridId == "group"){
            localsObj = {grid: params.api, groupData: params.data, parent: self};
            controller = 'viewGroupDialogCtrl';
            templateUrl = '/identity/view/html/views/groups/viewGroup.html';
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
        }
});


angular
    .module("Identity").controller('confirmDeleteDialogCtrl', function(httpClient, identityConfig, dataObject, grid,$scope, parent, $mdDialog, $loadingOverlay) {
    var vm = this;
    vm.parent = parent;
    vm.identifier = dataObject[vm.parent.identifierProperty];
    vm.grid = grid;
    vm.config = identityConfig;
    vm.api = vm.config[vm.parent.gridId].apis.delete;
    vm.header = "Confirm Delete";
    
    vm.init = function() {
        vm.promptMessage = "Are you sure you want to delete '"+ vm.identifier +"'?"
    }
    
    vm.deleteIdentity = function(){
        vm.closeDialog();
        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Deleting '+vm.parent.gridId+'...</b>');
        var parameters = {};
        parameters[vm.parent.identifierProperty] = vm.identifier;
        httpClient.post(vm.api, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.parent.showAlert("danger", 'Could not delete '+vm.parent.gridId+', please try again later');
                    return;
                }
				
                vm.parent.showAlert("success", "Successfully deleted "+vm.parent.gridId);
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
            },
            function(err) {
                vm.grid.hideOverlay();
                if(err.status == "success"){
                    vm.parent.showAlert("success", "Successfully deleted "+vm.parent.gridId);
                    vm.grid.refreshInfiniteCache();
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.parent.showAlert("danger", "Could not delete "+vm.parent.gridId+", please try again later");
            }
        );
    }

    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});

angular
    .module("Identity").controller('viewDeviceDialogCtrl', function($timeout, httpClient, deviceData, grid, parent, $mdDialog, $scope, identityConfig) {
   
    var vm = this;
    vm.promptMessage = {
        content:'Fetching device...'
    };
    vm.deviceData = deviceData;
    vm.deviceId = deviceData.id;
    vm.parent = parent;
    vm.grid = grid;
    vm.deviceFetched = false;
    vm.hidePromptMessage = false;
    vm.showTokenButtons = true;
    vm.showActionButtons = true;
    vm.init = function() {
        vm.getDevice();
    }
    
	vm.getDevice = function() {
        vm.isLoading = true;
        var parameters = {
            id: vm.deviceId
        }
        httpClient.post(identityConfig.device.apis.getDevice, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.hidePromptMessage = true;
                    var errDesc = 'Unknown error';
                    if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    vm.showAlert("danger", "Could not fetch device: "+errDesc);
                    //vm.showPromptMessage("danger",false, "Could not fetch device, please try again later");
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
                var devStatus = "Active";
                if(data.isSuspended != null && data.isSuspended == "true"){
                    devStatus = "Suspended";
                }
                vm.status = devStatus;
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
                
                //vm.showPromptMessage("success",false, "success");
                vm.deviceFetched = true;
                vm.hidePromptMessage = true;
            },
            function(err) {
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", "Could not fetch device: "+errDesc);
                //vm.showPromptMessage("danger",false, "Could not fetch device, please try again later!");
            }
        );
    }
        
    vm.confirmationDeleteDevice = function(){
        vm.showActionButtons = false;
    }
    
    vm.editDevice = function(){
        vm.closeDialog();
        var identityForms = vm.parent.identityForms.device;
        vm.parent.loadEditDeviceOverlay(vm.deviceData, identityForms, identityConfig.device.apis.save)
    }
    
    vm.copyToken = function() {
        navigator.clipboard.writeText(vm.token).then(function() {
            vm.showPromptMessage("success",false, "Copied!");
        }, function(err) {
            var errDesc = 'Unknown error';
            if (err.errorDetail) {
                errDesc = err.errorDetail;
            }
            vm.showAlert("danger", "Could not copy token: "+errDesc);
            //vm.showPromptMessage("danger",false, "Could not copy text: "+err);
        });
    }
    
    vm.regenerateToken = function() {
       vm.generateToken("regenerate");
    }
    
    vm.generateToken = function(action) {
        if(action != null && action == "regenerate") {
            action = "regenerate";
        } else {
            action = "generate";
        }
        var parameters = {
            "id": vm.id,
            "action": action
        }
        httpClient.post(identityConfig.device.apis.generate, parameters).then(
            function(data, response) {
                vm.showTokenButtons = true;
                if(data.status && data.status == "failure"){
                    var errDesc = 'Unknown error';
                    if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    vm.showAlert("danger", "Failed to "+action+": "+errDesc);
                    //vm.showPromptMessage("danger",false, "Failed to "+action);
                    return;
                }

                vm.token = data.token ? data.token : "N/A";
                vm.grid.refreshInfiniteCache();
                //vm.showPromptMessage("success",false, "Successful "+action);
            },
            function(err) {
                vm.showTokenButtons = true;
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", "Failed to "+action+": "+errDesc);
                //vm.showPromptMessage("danger",false, errDesc);
            }
    	);
    }
    
    vm.revokeToken = function() {
        var parameters = {
            id: vm.id
        }
        httpClient.post(identityConfig.device.apis.revoke, parameters).then(
            function(data, response) {
                vm.showTokenButtons = true;
                if(data.status && data.status == "failure"){
                    var errDesc = 'Unknown error';
                    if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    vm.showAlert("danger", "Could not delete token: "+errDesc);
                    //vm.showPromptMessage("danger",false, "Failed to revokeToken");
                    return;
                }
                vm.token = "N/A";
                vm.grid.refreshInfiniteCache();
                //vm.showPromptMessage("success",false, "Successfully deleted token");
            },
            function(err) {
                vm.showTokenButtons = true;
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", "Could not delete token: "+errDesc);
                //vm.showPromptMessage("danger",false, errDesc);
            }
    	);
    }
    
    vm.deleteDevice = function() {
        var parameters = {
            id: vm.deviceId
        }
        httpClient.post(identityConfig.device.apis.delete, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.showActionButtons = true;
                    var errDesc = 'Unknown error';
                    if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    vm.showAlert("danger", "Could not delete device: "+errDesc);
                    //vm.showPromptMessage("danger", false, "Failed to delete device")
                    return;
                }

                vm.parent.showAlert("success", "Successfully deleted device");
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showActionButtons = true;
                    vm.closeDialog();
                    vm.parent.showAlert("success", "Successfully deleted device");
                    vm.grid.refreshInfiniteCache();
                    vm.closeDialog();
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", "Could not delete device: "+errDesc);
                //vm.showPromptMessage("danger", false, "Could not delete device: "+errDesc)
            }
        );
    }
    
    vm.confirmTokenAction = function(param){
        if(param == "delete"){
            vm.actionDelete = true;
            vm.tokenActionMsg = "Are you sure you want to delete this token?";
        }else if(param == "regenerate"){
            vm.actionDelete = false;
            vm.tokenActionMsg = "Are you sure you want to regenerate this token?";
        }
        vm.showTokenButtons = false;
    }
    
    vm.cancelTokenAction = function(){
        vm.showTokenButtons = true;
    }
    
    vm.cancelActionButtons = function(){
        vm.showActionButtons = true;
    }
    
    vm.showPromptMessage = function(type, loading, message){
        vm.isLoading = loading;
        vm.promptMessage = {
            type : type,
            content : message
        };
        vm.hidePromptMessage = false;
        $timeout(function(){
            vm.hidePromptMessage = true;
        }, 5000);
    }
    
    vm.showAlert = function(type, content) {
        this.message = {
            "type" : type,
            "content" : content
        }
        vm.hasAlert = true;
    };

    vm.closeAlert = function() {
        vm.hasAlert = false;
    };

    vm.closeDialog = function() {
        $mdDialog.hide();
    };
});

angular
    .module("Identity").controller('viewGroupDialogCtrl', function($timeout, grid, httpClient, parent, groupData, $mdDialog, $scope, identityConfig) {
    var vm = this;
    vm.promptMessage = {
        content:'Fetching group...'
    };
    vm.groupData = groupData;
    vm.grid = grid;
    vm.groupName = groupData.name;
    vm.parent = parent;
    vm.showActionButtons = true;
    vm.groupFetched = false;
    vm.init = function() {
        vm.getGroup();
        
    }
    
	vm.getGroup = function() {
        vm.isLoading = true;
        var parameters = {
            name: vm.groupName
        }
        httpClient.post(identityConfig.group.apis.getGroupDevicesToView, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.showPromptMessage("danger",false,"Could not fetch group, please try again later");
                    vm.isLoading = false;
                    return;
                }

                vm.name = data.name ? data. name : "N/A";
                if(data.devices != null && data.devices.length >0){
                    if(data.devices instanceof Array){
                        vm.devices = data.devices;
                    }else{
                        vm.devices = [data.devices];
                    }
                } else {
                    vm.devices = "N/A";
                }
                vm.showPromptMessage("success",false,"success");
                vm.promptMessage = "Success";
                vm.groupFetched = true;
                vm.hidePromptMessage = true;
            },
            function(err) {
                console.dir(err);
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showPromptMessage("danger",false,"Could not fetch group, please try again later");
            }
        );
    } 
    
    vm.deleteGroup = function() {
        var parameters = {
            name: vm.groupName
        }
        httpClient.post(identityConfig.group.apis.delete, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.showActionButtons = true;
                    vm.showPromptMessage("danger", false, "Failed to delete group")
                    return;
                }

                vm.parent.showAlert("success", "Successfully deleted group");
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showActionButtons = true;
                    vm.closeDialog();
                    vm.parent.showAlert("success", "Successfully deleted group");
                    vm.grid.refreshInfiniteCache();
                    vm.closeDialog();
                    return;
                }

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showPromptMessage("danger", false,"Could not delete group, please try again later")
            }
        );
    }

    vm.confirmationDeleteGroup = function(){
        vm.showActionButtons = false
    }        
    
    vm.cancelActionButtons = function(){
        vm.showActionButtons = true;
    }
    
    vm.editGroup = function(){
        vm.closeDialog();
        var identityForms = vm.parent.identityForms.group;
        vm.parent.loadEditGroupOverlay(vm.groupData, identityForms, identityConfig.group.apis.save)
    }
    
    vm.showPromptMessage = function(type, loading, message){
       	vm.isLoading = loading;
        vm.promptMessage = {
            type : type,
            content : message
        };
        vm.hidePromptMessage = false;
        $timeout(function(){
            vm.hidePromptMessage = true;
        }, 5000);
    }
    
     vm.closeDialog = function() {
        $mdDialog.hide();
    };
});