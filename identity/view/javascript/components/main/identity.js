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
             "identityLayout" : "@", //can be "group", "device", or "user"
         },
        templateUrl : '/identity/view/javascript/components/main/identity.html',
        controller :  function($location,$scope,$rootScope,httpClient, identityForms, $routeParams, $timeout, $mdDialog, $uibModal, $route, $loadingOverlay, identityFactory) {
         var self = this;
    
    this.$onInit = function() {
        console.log("identityLayout: " + this.identityLayout);
        var self = this;
        self.deviceTitle = (typeof this.identityLayout != 'undefined' && this.identityLayout != null && this.identityLayout != '')? this.identityLayout.charAt(0).toUpperCase() + this.identityLayout.slice(1)+"s" : "Identity Manager"; 
        self.renderGrid = true;
        self.identityForms = identityForms;
        self.gridId = (typeof this.identityLayout != 'undefined' && this.identityLayout != null && this.identityLayout != '')? this.identityLayout : "device";
        self.identifierProperty = (typeof this.identityLayout != 'undefined' && this.identityLayout != null && this.identityLayout != '')? identityConfig[this.identityLayout].identifierProperty : identityConfig["device"].identifierProperty;
        self.deviceTabClass = "btnSelected";
        self.gridAPI = (typeof this.identityLayout != 'undefined' && this.identityLayout != null && this.identityLayout != '')? identityConfig[this.identityLayout].apis.list : identityConfig["device"].apis.list;
        self.copyTooltip = "Copy Token";
        
        //angular.element(document.querySelector("body")).addClass(identityConfig.theme)
        
        self.removeDeviceConfig = {
            api: identityConfig.device.apis.delete,
            queryParam: "id"
        }
        
        self.removeUserConfig = {
            api: identityConfig.user.apis.delete,
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
        
        self.saveUserConfig = {
            "api": identityConfig.user.apis.save,
            "schemaFormDefinition": self.identityForms.user,
        }
    }
            
    
    
    self.changeTab = function(value){
        self.gridId = value;
        if(self.gridId ==  "group"){
            self.deviceTabClass = "";
            self.userTabClass = "";
            self.groupTabClass = "btnSelected";
            self.identifierProperty = identityConfig.group.identifierProperty;
            self.gridAPI = identityConfig.group.apis.list;
        } else if (self.gridId ==  "device"){
            self.deviceTabClass = "btnSelected";
            self.identifierProperty = identityConfig.device.identifierProperty;
            self.groupTabClass = "";
            self.userTabClass = "";
            self.gridAPI = identityConfig.device.apis.list;
        } else if (self.gridId ==  "user"){
            self.userTabClass = "btnSelected";
            self.identifierProperty = identityConfig.user.identifierProperty;
            self.groupTabClass = "";
            self.deviceTabClass = "";
            self.gridAPI = identityConfig.user.apis.list;
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
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="View Group"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var viewBtn = eDiv.querySelectorAll('.btn')[0];
                viewBtn.addEventListener('click', function(clickParams) { 
                     $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching group...</b>');
                     self.getIdentity(params);
                   // self.showViewDialog(params)
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
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Edit Group"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var editBtn = eDiv.querySelectorAll('.btn')[0];
                editBtn.addEventListener('click', function(clickParams) { 
                    self.loadEditGroupOverlay(params.data, self.identityForms.group, identityConfig.group.apis.save);
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
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Delete Group"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';
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
            suppressSorting : true,
            tooltipField: 'auth_token',
            cellRenderer: function(params) {
                if(params.data && params.data.isSuspended == "true")
                    return 'N/A';
                if(params.value) {
                    var eDiv = document.createElement('div');
                    var copyHtml = '<span tooltip-placement="auto" tooltip-append-to-body="true" uib-tooltip="'+self.copyTooltip+'" class="icon"><i class="glyphicon glyphicon-duplicate" aria-hidden="true"></i></span>';
                    var token = "..." + params.value.substr((params.value.length - 8),8);
                    eDiv.innerHTML = token + "&nbsp;&nbsp;&nbsp;" + copyHtml;
                    var copyBtn = eDiv.querySelectorAll('.icon')[0];
                    copyBtn.addEventListener('click', function(clickParams) { 
                        self.copyToClipboard(params);
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
            width: 200,
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
                eDiv.innerHTML = '<button class="btn btn-default btn-view" onclick="this.blur();" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="View Device"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-view')[0];
                vButton.addEventListener('click', function() {
                    $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching device...</b>');
                     self.getIdentity(params);
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
                eDiv.innerHTML = '<button class="btn btn-default btn-edit" tooltip-append-to-body="true" onclick="this.blur();" tooltip-placement="auto" uib-tooltip="Edit Device"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-edit')[0];
                vButton.addEventListener('click', function(clickParams) {
                   self.loadEditIdentityOverlay.bind(self, params.data)();
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
                eDiv.innerHTML = '<button class="btn btn-default btn-delete" onclick="this.blur();" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Delete Device"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';

                vButton = eDiv.querySelectorAll('.btn-delete')[0];
                vButton.addEventListener('click', function() {
                    self.showConfirmDialog(params);
                });
                return eDiv;
            },
            width: 60,
        },
        {
            hide: true, 
            field: 'description'
        }

    ];
            
            
   self.usersColDef = [
        {   headerName: '',
         	checkboxSelection: true,
         	headerCheckboxSelection: true,
         	width: 30
        },
       {
           headerName: "Login", 
           field: "id", 
           cellClass: "textWrap", 
           editable : false,
           cellRenderer: function(params) {
               return params.value? params.value.split("_")[0]: 'N/A';
           }
       },
        {
            headerName: "User Name", 
            field: "name", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
       {
           headerName: "Email", 
           field: "email", 
           cellClass: "textWrap", 
           editable : false,
           cellRenderer: function(params) {
               return params.value? params.value.split("_")[0]: 'N/A';
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
            headerName: "", 
            width: 60,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                var eDiv = document.createElement('div');
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="View User"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var viewBtn = eDiv.querySelectorAll('.btn')[0];
                viewBtn.addEventListener('click', function(clickParams) { 
                    $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching user...</b>');
                     self.getIdentity(params);
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
                var btn = '<button class="btn btn-default btn-block" onclick="this.blur();" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Edit User"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var editBtn = eDiv.querySelectorAll('.btn')[0];
                editBtn.addEventListener('click', function(clickParams) { 
                    self.loadEditIdentityOverlay.bind(self, params.data)();
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
                var btn = '<button class="btn btn-default btn-block" onclick="this.blur();" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Delete User"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';
                eDiv.innerHTML = btn;
                var deleteBtn = eDiv.querySelectorAll('.btn')[0];
                deleteBtn.addEventListener('click', function(clickParams) { 
                    self.showConfirmDialog(params);

                });
                return eDiv;
            }
        },
    ];
            
            self.getIdentity = function(params) {
                var api;
                var parameters;
                if(self.gridId == "device" || self.gridId == "user"){
                    parameters = { 
                        id: params.data.id,
                        module: self.gridId
                    }
                    api = identityConfig[self.gridId].apis.get;
                }else if (self.gridId == "group"){
                    parameters = {
                        name: params.data.name
                    };
                    api = identityConfig.group.apis.getGroupDevicesToView;
                }
                httpClient.post(api, parameters).then(
                    function(data, response) {
                        if(data.status && data.status == "failure"){
                            $loadingOverlay.hide();
                            self.showAlert("danger","Could not fetch "+self.gridId+", please try again later");
                            return;
                        }
                        $loadingOverlay.hide();
                        var controller = "";
                        var templateUrl = "";
                        var localsObj = {};
                        if(self.gridId == "device" || self.gridId == "user"){
                            localsObj = {grid: params.api, identityData: params.data, parentWdg: self, identityInfo: data};
                            controller = 'viewIdentityDialogCtrl';
                            templateUrl = '/identity/view/html/views/viewIdentity.html';
                        } else if (self.gridId == "group"){
                            localsObj = {grid: params.api, groupData: params.data, parentWdg: self, groupInfo: data};
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
                            ok: 'Close',
            				parent: angular.element(document.querySelector(".identityTheme"))
                        });
                    },
                    function(err) {
                    console.dir(err);
                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail;
                    }
                    $loadingOverlay.hide();
                    self.showAlert("danger","Could not fetch "+self.gridId+", please try again later");
                });
            } 


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
                    },
                    appendTo: angular.element(document.querySelector(".identityTheme"))
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
                                self.showAlert("success", "Group saved successfully");
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
                    self.showAlert("success", "Group saved successfully");
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
            
   self.temp = function(identityData, data, response) {
       
       var self = this;
       var overlayForm = identityForms[self.gridId];
       var gridId = self.gridId.charAt(0).toUpperCase() + self.gridId.substring(1);
       console.log(self)
       if(data.status && data.status == "failure"){
           var errDesc = 'Unknown error';
           if (data.data && data.data.metadata && data.data.metadata.description && data.data.metadata.description.en) {
               errDesc = data.data.metadata.description.en;
           } else if (data.errorDetail) {
               errDesc = data.errorDetail;
           }
           self.showAlert("danger", "Could not fetch "+self.gridId+", please try again later: "+errDesc);
           return;
       }
       var groupsArr = [];
       if(data.groups instanceof Array){
           groupsArr = data.groups;
       }else{
           groupsArr = [data.groups];
       };
       
       var defaultAttrs = ["name", "groups", "creator", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "id", "meta.types", "workflowState", "hidePasswordFields"];
       var backendApi;
       if(self.gridId == "device"){
           defaultAttrs.push("auth_token", "description")
           backendApi = identityConfig.device.apis.save;
           
       }
       else if(self.gridId == "user"){
           defaultAttrs.push("email", "token", "login", "lang", "tokens")
           backendApi = identityConfig.user.apis.save;
       }
       var identityAttrsArray = [];
       var metaTypes = data["meta.types"];
       Object.keys(data).forEach(function(key) {
           if(defaultAttrs.indexOf(key)<0){
               self.hasAttrs = true;
               var identityAttrsObj = {};
               identityAttrsObj.name = key;
               identityAttrsObj.type = metaTypes[key];
               identityAttrsObj.value = data[key];
               identityAttrsArray.push(identityAttrsObj);
           }
       });

       self.closeAlert();
       var of = angular.copy(overlayForm);
       of.title = "Edit "+of.title;
       var form = angular.copy(of.form);
       //form[0].items[1].readonly = true;
       var required = ["name","id"];
       var schema = angular.copy(of.schema);
       schema.required = required;
       schema.properties.id.readonly = true;
       var formWidget = {
           'label': of.title,
           'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
           'schema': schema,
           'form': form,
           'model': {"name": identityData.name, "id": identityData.id, "isSuspended": data.isSuspended, "groups":groupsArr}
       }
       if(data.hidePasswordFields)
           formWidget.model.hidePasswordFields = data.hidePasswordFields;
           
      if(self.gridId == "device"){
           formWidget.model.deviceAttrs = identityAttrsArray;
           formWidget.model.description = identityData.description;
           //formWidget.model.editMode = "true";
       }
       else if(self.gridId == "user"){
           formWidget.model.userAttrs = identityAttrsArray;
           formWidget.model.email = identityData.email;
           //formWidget.model.login = identityData.login;
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
           },
           appendTo: angular.element(document.querySelector(".identityTheme"))
       });

       modalInstance.result.then(function (wdgModel) {
           if(wdgModel != 'cancel') {
               var successHandler = function(data) {
                   $scope.$broadcast("updateGridData-"+self.gridId, {});
                   self.showAlert("success", gridId+" saved successfully");
               }
               var failureHandler = function(err) {
                   var errDesc = 'Unknown error';
                   if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                       errDesc = err.data.metadata.description.en;
                   } else if (err.errorDetail) {
                       errDesc = err.errorDetail;
                   }
                   self.showAlert("danger", "Could not save "+self.gridId+", please try again later: "+errDesc);
               }
               wdgModel.update = true;
               self.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
           }
       }, function () {
           console.info('modal-component for widget update dismissed at: ' + new Date());
       });
   }

    this.loadEditIdentityOverlay = function(identityData) {
        var self = this;
        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Fetching '+self.gridId+'...</b>');
       // angular.element('body')[0].style.cssText = "";
        httpClient.post(identityConfig[self.gridId].apis.get, {id: identityData.id, module: self.gridId}).then(self.temp.bind(self, identityData),
                function(err) {
                    if(err.status == "success"){
                        $scope.$broadcast("updateGridData-"+self.gridId, {});
                        var gridId = self.gridId.charAt(0).toUpperCase() + self.gridId.substring(1);
                        self.showAlert("success", gridId+ " saved successfully");
                        return;
                    }

                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail;
                    }
                    self.showAlert("danger", "Could not save "+self.gridId+", please try again later: "+errDesc);
                }
                );
    };
    
    
    self.closeAlert = function() {
        this.showError = false;
    };

    
    self.copyToClipboard = function(params) {
        navigator.clipboard.writeText(params.value).then(function() {
          console.log('Copying to clipboard was successful');
            self.copyTooltip = "Copied!";
            params.refreshCell();
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
            locals: {dataObject: params.data, grid: params.api, parentWdg: self},
            ok: 'Close',
            parent: angular.element(document.querySelector(".identityTheme"))
        });
    }
    
        }
});
angular
    .module("Identity").controller('confirmDeleteDialogCtrl', function(httpClient, dataObject, grid,$scope, parentWdg, $mdDialog, $loadingOverlay) {
    var vm = this;
    vm.parent = parentWdg;
    vm.identifier = dataObject[vm.parent.identifierProperty];
    vm.grid = grid;
    vm.config = identityConfig;
    vm.deleteApi = identityConfig[vm.parent.gridId].apis.delete;
    vm.header = "Confirm Delete";
    
    vm.init = function() {
        vm.promptMessage = "Are you sure you want to delete "+ dataObject.name +" ("+ vm.identifier +")?"
    }
    
    vm.deleteIdentity = function(){
        vm.closeDialog();
        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Deleting '+vm.parent.gridId+'...</b>');
        var parameters = {};
        var gridId = vm.parent.gridId.charAt(0).toUpperCase() + vm.parent.gridId.substring(1);
        parameters[vm.parent.identifierProperty] = vm.identifier;
        parameters["module"] = vm.parent.gridId;
        httpClient.post(vm.deleteApi, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.parent.showAlert("danger", 'Could not delete '+vm.parent.gridId+', please try again later');
                    return;
                }
				
                vm.parent.showAlert("success", gridId+ " deleted successfully");
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
            },
            function(err) {
                vm.grid.hideOverlay();
                if(err.status == "success"){
                    vm.parent.showAlert("success", gridId+ " deleted successfully");
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
    .module("Identity").controller('viewIdentityDialogCtrl', function($timeout, httpClient, identityData, grid, parentWdg, $mdDialog, $scope, identityInfo) {
   
    var vm = this;
   
    vm.identityData = identityData;
    vm.identityId = identityData.id;
    vm.parent = parentWdg;
    vm.gridId =  vm.parent.gridId.charAt(0).toUpperCase() + vm.parent.gridId.substring(1);
    vm.grid = grid;
    vm.identityFetched = false;
    vm.hidePromptMessage = false;
    vm.showTokenButtons = true;
    vm.deleteApi = identityConfig[vm.parent.gridId].apis.delete;
    vm.getApi = identityConfig[vm.parent.gridId].apis.get;
    vm.copyTooltip = "Copy Token";
     /*vm.promptMessage = {
        content:'Fetching '+vm.parent.gridId+'...'
    };*/
    vm.showActionButtons = true;
    vm.init = function() {
        vm.name = identityInfo.name ? identityInfo.name : "N/A";
        vm.id = identityInfo.id ? identityInfo.id : "N/A";
        if(vm.parent.gridId == "device"){
            vm.identityNameLabel = "Device Name"
            vm.identityIdLabel = "Device ID"
            vm.description = identityInfo.description ? identityInfo.description : "N/A";
            vm.token = identityInfo.auth_token ? identityInfo.auth_token : "N/A";
        }
        if(vm.parent.gridId == "user"){
            vm.identityNameLabel = "User Name";
            vm.identityIdLabel = "Login";
            vm.email = identityInfo.email ? identityInfo.email : "N/A";
        }
        if(identityInfo.groups != null){
            if(identityInfo.groups instanceof Array){
                vm.groups = identityInfo.groups;
            }else{
                vm.groups = [identityInfo.groups];
            }
        } else {
            vm.groups = ["N/A"];
        }
        var status = "Active";
        if(identityInfo.isSuspended != null && identityInfo.isSuspended == "true"){
            status = "Suspended";
        }
        vm.status = status;

        vm.hasAttrs = false;
        var defaultAttrs = ["name", "groups", "creator", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "id", "meta.types", "workflowState", "hidePasswordFields"];
        var backendApi;
        if(vm.parent.gridId == "device"){
            defaultAttrs.push("auth_token", "description")
        }
        else if(vm.parent.gridId == "user"){
            defaultAttrs.push("email", "token", "login", "lang", "tokens")
        }
        var identityAttrsArray = [];
        var metaTypes = identityInfo["meta.types"];
        Object.keys(identityInfo).forEach(function(key) {
            if(defaultAttrs.indexOf(key)<0){
                vm.hasAttrs = true;
                var identityAttrsObj = {};
                identityAttrsObj.name = key;
                identityAttrsObj.type = metaTypes[key];
                identityAttrsObj.value = identityInfo[key];
                identityAttrsArray.push(identityAttrsObj);
            }
        })
        vm.identityAttrs = identityAttrsArray;
        vm.identityFetched = true;
        vm.hidePromptMessage = true;
    }
    
    vm.confirmationDeleteIdentity = function(){
        vm.showActionButtons = false;
    }
    
    vm.editIdentity = function(){
        vm.closeDialog();
        var identityForms = vm.parent.identityForms[vm.parent.gridId];
        vm.parent.loadEditIdentityOverlay(vm.identityData, identityForms, identityConfig[vm.parent.gridId].apis.save);
    }
    
    vm.copyToken = function() {
        navigator.clipboard.writeText(vm.token).then(function() {
            //vm.showPromptMessage("success",false, "Copied!");
            vm.copyTooltip = "Copied!";

        }, function(err) {
            var errDesc = 'Unknown error';
            if (err.errorDetail) {
                errDesc = err.errorDetail;
            }
            vm.showAlert("danger", "Could not copy token: "+errDesc);
            //vm.showPromptMessage("danger",false, "Could not copy text: "+err);
        });
    }
    
    vm.resetCopyTooltip = function() {
        $timeout(function(){
            vm.copyTooltip = "Copy Token";
        }, 500);
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
    
    vm.deleteIdentity = function() {
        var parameters = {
            id: vm.identityId,
            module: vm.parent.gridId
        }
        httpClient.post(vm.deleteApi, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.showActionButtons = true;
                    var errDesc = 'Unknown error';
                    if (data.errorDetail) {
                        errDesc = data.errorDetail;
                    }
                    vm.showAlert("danger", "Could not delete "+vm.parent.gridId+": "+errDesc);
                    //vm.showPromptMessage("danger", false, "Failed to delete identity")
                    return;
                }

                vm.parent.showAlert("success", vm.gridId+ " deleted successfully");
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showActionButtons = true;
                    vm.closeDialog();
                    vm.parent.showAlert("success", vm.gridId+ " deleted successfully");
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
                vm.showAlert("danger", "Could not delete "+vm.parent.gridId+": "+errDesc);
                //vm.showPromptMessage("danger", false, "Could not delete identity: "+errDesc)
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
    .module("Identity").controller('viewGroupDialogCtrl', function($timeout, grid, httpClient, parentWdg, groupData, $mdDialog, $scope, groupInfo) {
    var vm = this;
    /*vm.promptMessage = {
        content:'Fetching group...'
    };*/
    vm.groupData = groupData;
    vm.grid = grid;
    vm.groupInfo = groupInfo;
    vm.groupName = groupData.name;
    vm.parent = parentWdg;
    vm.showActionButtons = true;
    vm.groupFetched = false;
    vm.init = function() {
        //vm.getGroup();
        vm.name = groupInfo.name ? groupInfo. name : "N/A";
        if(groupInfo.devices != null && groupInfo.devices.length >0){
            if(groupInfo.devices instanceof Array){
                vm.devices = groupInfo.devices;
            }else{
                vm.devices = [groupInfo.devices];
            }
        } else {
            vm.devices = "N/A";
        }
        vm.groupFetched = true;
        vm.hidePromptMessage = true;

    }
    

    
    vm.deleteGroup = function() {
        var parameters = {
            name: vm.groupName,
            module: "group"
        }
        httpClient.post(identityConfig.group.apis.delete, parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    vm.showActionButtons = true;
                    vm.showAlert("danger", "Could not delete group, please try again later")
                    return;
                }

                vm.parent.showAlert("success", "Group deleted successfully");
                vm.grid.refreshInfiniteCache();
                vm.grid.deselectAll();
                vm.closeDialog();
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    vm.showActionButtons = true;
                    vm.closeDialog();
                    vm.parent.showAlert("success", "Group deleted successfully");
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
                vm.showAlert("danger","Could not delete group, please try again later")
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