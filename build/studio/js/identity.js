!function(a){"use strict";var b=a.module("ngLoadingOverlay",[]);b.provider("$loadingOverlayConfig",function(){var a={bg:"rgba(0, 0, 0, 0.5)",textColor:"#fff",template:"<b>Please wait</b>",zIndex:9999};this.defaultConfig=function(b,c,d,e){a.bg=c||a.bg,a.template=b||a.template,a.textColor=d||a.textColor,a.zIndex=e||a.zIndex},this.$get=function(){return{get:function(){return a}}}}),b.service("$loadingOverlay",["$compile","$rootScope","$sce","$loadingOverlayConfig",function(b,c,d,e){var f='<div id="ng-loading-overlay" ng-show="show" style="display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; align-items: center; justify-content: center; position:absolute; left:0; height: 100%; width: 100%;" ng-style="{\'background\': bg, \'color\': textColor, \'top\': positionTop, \'z-index\': zIndex}"><div style="position:relative;opacity: 1;" ng-bind-html="template"></div></div>',g=0,h=e.get(),i=a.element(f),j=c.$new();j.show=!1,a.element(document).ready(function(){i=b(i)(j),a.element(document.body).append(i)}),this.show=function(b,c,e,f){var i=a.element(document.body);g+=1,b?j.template=d.trustAsHtml(b):j.template=d.trustAsHtml(h.template),c?j.bg=c:j.bg=h.bg,e?j.textColor=e:j.textColor=h.textColor,j.zIndex=f||h.zIndex,j.positionTop=window.pageYOffset,console.log(j.positionTop),i.css("overflow","hidden"),j.show=!0},this.hide=function(){g&&(g-=1),g||(a.element(document.body).css("overflow","auto"),j.show=!1)}}])}(window.angular);
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
        controller :  ['$location', '$scope', '$rootScope', 'httpClient', 'identityForms', '$routeParams', '$timeout', '$mdDialog', '$uibModal', '$route', '$loadingOverlay', 'identityFactory', function($location,$scope,$rootScope,httpClient, identityForms, $routeParams, $timeout, $mdDialog, $uibModal, $route, identityConfig, $loadingOverlay, identityFactory) {
         var self = this;
    
    this.$onInit = function() {
        console.log(">>>>>>>>>>>>> identityLayout: " + this.identityLayout);
        var self = this;
        self.deviceTitle = "Identity Manager"; 
        self.renderGrid = true;
        self.identityForms = identityForms;
        self.gridId = (typeof this.identityLayout != 'undefined' && this.identityLayout != null && this.identityLayout != '')? this.identityLayout : "device";
        self.identifierProperty = identityConfig.device.identifierProperty;
        self.deviceTabClass = "btnSelected";
        self.gridAPI = identityConfig.device.apis.list;
        self.copyTooltip = "Copy Token";
        
        angular.element(document.querySelector("body")).addClass(identityConfig.theme)
        
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
                eDiv.innerHTML = '<button class="btn btn-default btn-view" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="View Device"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i></button>';

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
                eDiv.innerHTML = '<button class="btn btn-default btn-edit" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Edit Device"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';

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
                eDiv.innerHTML = '<button class="btn btn-default btn-delete" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Delete Device"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';

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
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Edit User"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></button>';
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
                var btn = '<button class="btn btn-default btn-block" tooltip-append-to-body="true" tooltip-placement="auto" uib-tooltip="Delete User"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';
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
                            localsObj = {grid: params.api, identityData: params.data, parent: self, identityInfo: data};
                            controller = 'viewIdentityDialogCtrl';
                            templateUrl = '/identity/view/html/views/viewIdentity.html';
                        } else if (self.gridId == "group"){
                            localsObj = {grid: params.api, groupData: params.data, parent: self, groupInfo: data};
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
       
       var defaultAttrs = ["name", "groups", "creator", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "id", "meta.types", "workflowState"];
       var backendApi;
       if(self.gridId == "device"){
           defaultAttrs.push("auth_token", "description")
           backendApi = identityConfig.device.apis.save;
           
       }
       else if(self.gridId == "user"){
           defaultAttrs.push("email", "token", "login")
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
      if(self.gridId == "device"){
           formWidget.model.deviceAttrs = identityAttrsArray;
           formWidget.model.description = identityData.description;
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
           }
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
            locals: {dataObject: params.data, grid: params.api, parent: self},
            ok: 'Close'
        });
    }
    
        }]
});
angular
    .module("Identity").controller('confirmDeleteDialogCtrl', ['httpClient', 'dataObject', 'grid', '$scope', 'parent', '$mdDialog', '$loadingOverlay', function(httpClient, identityConfig, dataObject, grid,$scope, parent, $mdDialog, $loadingOverlay) {
    var vm = this;
    vm.parent = parent;
    vm.identifier = dataObject[vm.parent.identifierProperty];
    vm.grid = grid;
    vm.config = identityConfig;
    vm.deleteApi = identityConfig[vm.parent.gridId].apis.delete;
    vm.header = "Confirm Delete";
    
    vm.init = function() {
        vm.promptMessage = "Are you sure you want to delete '"+ vm.identifier +"'?"
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
}]);

angular
    .module("Identity").controller('viewIdentityDialogCtrl', ['$timeout', 'httpClient', 'identityData', 'grid', 'parent', '$mdDialog', '$scope', 'identityInfo', function($timeout, httpClient, identityData, grid, parent, $mdDialog, $scope, identityConfig, identityInfo) {
   
    var vm = this;
   
    vm.identityData = identityData;
    vm.identityId = identityData.id;
    vm.parent = parent;
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
        var defaultAttrs = ["name", "groups", "creator", "versionNumber", "latest", "lastModifiedBy", "creationDate", "lastModifiedDate", "isSuspended", "id", "meta.types", "workflowState"];
        var backendApi;
        if(vm.parent.gridId == "device"){
            defaultAttrs.push("auth_token", "description")
        }
        else if(vm.parent.gridId == "user"){
            defaultAttrs.push("email", "token", "login")
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
}]);

angular
    .module("Identity").controller('viewGroupDialogCtrl', ['$timeout', 'grid', 'httpClient', 'parent', 'groupData', '$mdDialog', '$scope', 'groupInfo', function($timeout, grid, httpClient, parent, groupData, $mdDialog, $scope, identityConfig, groupInfo) {
    var vm = this;
    /*vm.promptMessage = {
        content:'Fetching group...'
    };*/
    vm.groupData = groupData;
    vm.grid = grid;
    vm.groupInfo = groupInfo;
    vm.groupName = groupData.name;
    vm.parent = parent;
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
}]);
angular
  .module('Identity')
  .component('formOverlay', 
  {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/identity/view/javascript/components/forms/overlayForm.html',
    controller: ['$scope', function ($scope) {
        
       var self=this;
       this.$onInit = function () {
          
        this.widget = this.resolve.widget;
        
        $scope.$broadcast('schemaFormRedraw')
       
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": false},
          "validationMessage": {"302": "Required"}
        }

        if(this.widget) {
            if(this.widget.schema) {
              this.schema =  angular.copy(this.widget.schema)
            } 
            if(this.widget.form) {
               this.form =   angular.copy(this.widget.form)
            }
            
            this.model =  (this.widget.model) ?  angular.copy(this.widget.model) : {}
            
            if(this.widget.onFormModelChange) {
                 this.frmGlobalOptions["formDefaults"].onChange = this.widget.onFormModelChange;
            }
              
          }
      };
        
        /*$scope.$on('modal.closing', function(event, reason, closed) {
            var r = prompt("Are you sure you wanna close the modal? (Enter 'YES' to close)");

            if (r !== 'YES') {
                event.preventDefault();
            }
        });  */

      this.highlightTabs = function (formName) {
            var rootEl = $('form[name="' + formName + '"]');
            var tabHeaders = rootEl.find('ul li');
            var tabPanes = rootEl.find('.tab-pane') || [];
            rootEl.find('ul li a span.badge').remove();

            for (var i = 0; i < tabPanes.length; i++) {
                var errorCount = $(tabPanes[i]).find('div.ng-invalid').length;
                if (errorCount > 0) {
                    $(tabHeaders[i].childNodes[0]).append('<span class="badge sf-badge-error">' + errorCount + '</span>');
                }
            }
    	};
        

      this.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        console.log(this.model);
          
           setTimeout(function() {
           self.highlightTabs(form.$name);
        }, 100);
		
        // Then we check if the form is valid
        if (form.$valid) {
          //angular.extend(this.widget.options, this.model);
          this.close({$value: this.model});
          //do whatever you need to do with your data.
          //$scope.$emit('update_widget', {"model":  this.model});
          console.log("component_form_parent", this.model)
        } 
      };

      this.onCancel = function (myForm) {
        this.schema = {};
        this.form = {}
        this.model = angular.copy(this.widget.options);
        this.dismiss({$value: 'cancel'});
      };

    }]
});
angular
    .module('Identity')
    .component('uploadFileComponent', 
               {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    templateUrl: '/identity/view/javascript/components/forms/uploadFile.html',
    controller: ['$scope', 'httpClient', '$q', '$loadingOverlay', 'identityFactory', function ($scope, httpClient, $q, identityConfig, $loadingOverlay,identityFactory) {
        var self = this;
        
        self.showLoading = false;
        this.$onInit = function(){
            console.log($scope);
            this.widget = this.resolve.widget;
            self.gridType = this.resolve.widget.parent.gridEventsId;
            this.gridTypeToUpperCase = self.gridType.charAt(0).toUpperCase() + self.gridType.substring(1);
            $scope.$broadcast('schemaFormRedraw')
           // this.gridType1 = $scope.$ctrl.resolve.widget.parent.gridEventsId;
            this.frmGlobalOptions = {
                "destroyStrategy" : "remove",
                "formDefaults": {"feedback": false}
            }
            
            if(this.widget) {
                this.parent = this.widget.parent;
                
                if(this.widget.schema) {
                    this.schema =  angular.copy(this.widget.schema)
                } 
                if(this.widget.form) {
                    this.form =   angular.copy(this.widget.form)
                }

                this.model =  (this.widget.model) ?  angular.copy(this.widget.model) : {}

                if(this.widget.onFormModelChange) {
                    this.frmGlobalOptions["formDefaults"].onChange = this.widget.onFormModelChange;
                }

            }
        }

        this.onCancel = function (myForm) {
            this.schema = {};
            this.form = {};
            this.model = angular.copy(this.widget.options);
            this.dismiss({$value: 'cancel'});
        }

        this.save = function(form){
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');
            // Then we check if the form is valid
            if (form.$valid) {
                self.showLoading = true;
                $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Uploading CSV, please wait...</b>');
                var d = $q.defer();  
               // var data = angular.copy(this.model);
               /* if(form.$dirty) {
                    data["file"] = form.$modelValue
                } */
                //delete data["csvFile"]
                var fd = new FormData();
                for ( var key in  this.model ) {
                    if(Array.isArray( this.model[key])) {
                        _.forEach( this.model[key], function(entry) {
                            fd.append(key, entry)
                        })
                    } else {
                        fd.append(key, this.model[key]);
                    }
                }
                fd.append("gridType", self.gridType)
                httpClient.post(identityConfig.reports.apis.import, fd, null,true).then(
                    function(data, response) {
                        if(data.status == "failure") {
                            self.showLoading = false;
                            self.showAlert("danger", data.errorDetail);
                        } else {
                            identityFactory.getJobStatus(identityConfig.reports.apis.import, {scriptHandleId: data.scriptHandleId }, 30, function (res){
                                self.showLoading = false;
                                if (res.status && res.status == "success") {
                                    self.showAlert("success", "The "+self.gridType+"s have been imported successfully");
                                    self.parent._createNewDatasource();
                                    d.resolve(data, response);
                                } else {
                                    //This is in case some devices/users failed to be created
                                    self.showAlert("danger", res.errorDetail? res.errorDetail : "Failed to import "+self.gridType+"s");
                                    d.reject(res.errorCode, res.errorDetail);
                                }
                            },function(errorDetail){
                                self.showAlert("danger", errorDetail? errorDetail : "Failed to import "+self.gridType+"s");
                                self.showLoading = false;
                                d.reject(errorDetail);  
                            })

                        }

                    }, function(err) {
                        self.showAlert("danger", err.data.response.metadata.errorDetail);
                        self.showLoading = false;
                        d.reject(err); 

                    });
                return d.promise;  
            }
        }
        
        this.downloadTemplate = function(){
            var params;
            if(self.gridType == "device")
                params = {
                    templateKey: "devicesTemplate",
                    attachment: "devicesTemplate.csv"
                };
            else if(self.gridType == "user")
                params = {
                    templateKey: "usersTemplate",
                    attachment: "usersTemplate.csv"
                };
            httpClient.post(identityConfig.reports.apis.template, params).then(
                function(data, response) {
                    self.showLoading = false;
                    if(data.status == "failure") {
                        self.showAlert("danger", "Unable to download template, please try again");
                    } else {
                        self.showAlert("success", "Template downloaded successfully");
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + data.data);
                        element.setAttribute('download', params.attachment);
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                    } 
                }, function(err) {
                    self.showLoading = false;
                    self.showAlert("danger", "Unable to download template, please try again");
                }
            );
        }

        this.showAlert = function(type, content) {
            $loadingOverlay.hide();
            this.message = {
                "type" : type,
                "content" : content
            }
            this.hasAlert = true;
        };

        this.closeAlert = function() {
            this.hasAlert = false;
        };
    }]
});
agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module("Identity")
    .component(
    'scriptrIdentityGrid',
    {
        bindings : {

            "onLoad" : "&onLoad",
            
            "gridDataIdentifierProperty": "@",

            "columnsDefinition" : "<columnsDefinition",
            
            "rowHeight": "<?",

            "enableServerSideSorting" : "<?", // Note that Client side sorting & filtering does not make sense in virtual paging and is just not supported, only Server side sorting & filtering is supported

            "enableServerSideFilter" : "<?",
            
            "refreshOnEdit": "<?",

            "enableColResize" : "<?",

            "pagination" : "@",  

            "enableDeleteRow" : "<?",

            "enableAddRow" : "<?",

            "cellEditable" : "<?",

            "enableClientSideSorting": "<?", // client-side sorting

            "api" : "@", // restApi 

            "onInsertRowScript" : "@",

            "onDeleteRowScript" : "@",

            "transport" : "@", //"http" or "wss" or "publish"

            "enableClientSideFilter" : "<?",

            "rowModelType" : "@", // rowModelType can be set to "pagination" or "virtual" (infinite scrolling)

            "rowModelSelection" : "@", //"multiple" or "single"
            
            "suppressRowClickSelection" : "<?",
            
            "suppressCellSelection" : "<?",

            "rowDeselection" : "<?",

            "onSelectionChanged": "&?",

            "rowData" : "<?",

            "suppressFilter": "<?",

            "gridHeight" : "@",

            /** pagination properties **/
            "paginationPageSize" : "<?", // In virtual paging context means how big each page in our page cache will be, default is 100

            /** virtual paging properties **/
            "paginationOverflowSize" : "<?", // how many extra blank rows to display to the user at the end of the dataset, which sets the vertical scroll and then allows the grid to request viewing more rows of data. default is 1, ie show 1 row.

            /** virtual paging properties **/
            "maxConcurrentDatasourceRequests" : "<?", // how many server side requests to send at a time. if user is scrolling lots, then the requests are throttled down 

            /** virtual paging properties **/
            "paginationInitialRowCount" : "<?",// how many rows to initially show in the grid. having 1 shows a blank row, so it looks like the grid is loading from the users perspective (as we have a spinner in the first col)

            /** virtual paging properties **/
            "maxPagesInCache" : "<?", // how many pages to store in cache. default is undefined, which allows an infinite sized cache, pages are never purged. this should be set for large data to stop your browser from getting full of data
            "apiParams" : "<?",

            "deleteParams": "<?",

            "addParams": "<?",

            "editParams": "<?",  

            "onFormatData" : "&",

            "onCellValueChanged" : "&",

            "onCellClicked" : "&",  

            "msgTag" : "@",

            "class" : "@",

            "defaultCellRenderer": "&",  

            "onGridReady" : "&",
            
            "useWindowParams": "@",
            
            "onRowDoubleClicked": "&",
            
            "sizeColumnsToFit": "<?",
            
            "gridEventsId": "@",
            
            "removeRowConfig": "<?",
            
            "saveRowConfig": "<?",
            "customNoRowsLabel": "@"
        },

        templateUrl : '/identity/view/javascript/components/grid/grid.html',
        controller : ['$scope', '$window', '$uibModal', '$timeout', 'identityForms', 'wsClient', 'dataStore', 'identityFactory', '$routeParams', 'httpClient', '$route', '$timeout', '$q', '$loadingOverlay', function($scope, $window, $uibModal, $timeout, identityForms, wsClient, dataStore, identityFactory, $routeParams,httpClient, $route, $timeout, $q, identityConfig, $loadingOverlay) {

            var self = this;
			
            self.broadcastData = null;
			this.identityForms = identityForms;
            this.dataSource = {
                getRows : function(params) {
                    if(self.broadcastData != null){
                        if(self.broadcastData.api != null){
                            var api = self.broadcastData.api
                            }else{
                                var api = self.api
                                }
                        if(self.broadcastData.params != null){
                            self.apiParams = self.broadcastData.params
                        }
                        if(self.broadcastData.transport != null){
                            var transport = self.broadcastData.transport
                            }else{
                                var transport = self.transport
                                }
                    }else{
                        var api = self.api;
                        var apiParams = APIParams;
                        var transport = self.transport;
                    }
                    var APIParams = self.buildParams(params)
                    var tmp = null;
                    if(typeof self.onFormatData() == "function"){
                        tmp = function(data){ 
                            return self.onFormatData()(data); // Or we can have it as self.onFormatData({"data":data}) and pass it in the on-format-update as: vm.callback(data)
                        }
                    }
                    dataStore.getGridData(api, APIParams, transport, tmp).then(
                        function(data, response) {
                            if (data && data.documents) {
                                var rowsData = data.documents;
                                var count = parseInt(data.count);

                                var cleanedRows = self.cleanRows(rowsData);  
                                params.successCallback(cleanedRows, count);
                                if(self.sizeColumnsToFit)
                                	self.gridOptions.api.sizeColumnsToFit();

                                self.gridOptions.api.doLayout();
                                // if there's no rows to be shown, disbale the next button
                                if(cleanedRows == null || cleanedRows.length == 0){
                                    self.gridOptions.api.showNoRowsOverlay();  
                                    var el = angular.element( document.querySelector( '#btNext' ) );
                                    el.attr('disabled', 'true');
                                    
                                    if(count == 0) {
                                        angular.element(".ag-paging-page-summary-panel > span[ref=lbTotal]")[0].innerHTML = 1
                                    }
                                }else{
                                    self.gridOptions.api.hideOverlay();
                                }
                            } else {
                                params.failCallback();
                                self.gridOptions.api.showNoRowsOverlay();
                            }
                        }, function(err) {
                            console.log("reject", err);
                        });
                }
            }

            this.$onDestroy = function() {
                if(self.msgTag){
                    wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                }
            }

            this.cleanRows = function(rows){
                if(!Array.isArray(rows)){
                    rows = [rows];
                }
                var fieldExist = false;
                for(var i = 0; i < rows.length; i++){
                    for(row in rows[i]){
                        if(row != "key"){
                            fieldExist = false;
                            for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                                if(row == self.gridOptions.columnDefs[n].field){
                                    fieldExist = true;
                                    break;
                                }
                            }
                            if(!fieldExist){
                                delete rows[i][row];
                            }
                        }
                    }
                }
                return rows;
            }

            // Get data from backend
            this._createNewDatasource = function() {
                this.gridOptions.api.setDatasource(this.dataSource);
            }

            this.$onInit = function() {
                
                this._dataIdentifierProperty = (this.gridDataIdentifierProperty) ? this.gridDataIdentifierProperty : "key";
                this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                this.noRowsLabel = this.customNoRowsLabel ? this.customNoRowsLabel : "No Results To Show"
                this.sizeColumnsToFit = (this.sizeColumnsToFit !== undefined) ? this.sizeColumnsToFit : true; //backward compatibility default true
                this.gridOptions = {
                    angularCompileRows: true,
                    domLayout: "autoHeight",
                    rowHeight : (this.rowHeight) ? this.rowHeight : 25,
                    enableSorting: (typeof this.enableClientSideSorting != 'undefined')? this.enableClientSideSorting : true,
                    enableServerSideSorting : (typeof this.enableServerSideSorting != 'undefined')? this.enableServerSideSorting : true,
                    enableServerSideFilter : (typeof this.enableServerSideFilter != 'undefined') ? this.enableServerSideFilter : true,
                    enableColResize : (typeof this.enableColResize != 'undefined') ? this.enableColResize : false,
                    enableFilter : true,
                    columnDefs : this.columnsDefinition,
                    //editType : 'fullRow',    
                    pagination: (typeof this.pagination != "undefined") ? this.pagination : false,  
                    cacheBlockSize: (this.paginationPageSize) ? this.paginationPageSize : 50,
                    rowData: (this.rowData)? this.rowData : null,
                    rowModelType : "infinite",
                    rowSelection : (this.rowModelSelection) ? this.rowModelSelection : "multiple",
                    suppressRowClickSelection : (this.suppressRowClickSelection) ? this.suppressRowClickSelection : true,
                    suppressCellSelection : (this.suppressCellSelection) ? this.suppressCellSelection : true,
                    paginationPageSize : (this.paginationPageSize) ? this.paginationPageSize : 50,
                    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">'+this.noRowsLabel+'</span>',
                    overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><i class="fa fa-spinner fa-spin fa-fw fa-2x"></i>Loading...</span>',
                    defaultColDef : {
                        filter: false,
                        filterParams : {
                            apply : false
                        },
                        suppressFilter: (typeof this.suppressFilter != 'undefined')? this.suppressFilter : true,
                        editable : (typeof this.cellEditable != 'undefined')? this.cellEditable : true,
                        cellRenderer : (typeof this.defaultCellRenderer() == 'function')? this.defaultCellRenderer() : null  
                    },
                    onSelectionChanged: function() {
                        if(self.onSelectionChanged != null && typeof self.onSelectionChanged() == "function"){
                            return self.onSelectionChanged()(self.gridOptions, self.gridApi);
                        }
                    },
                    onCellClicked: function(event) {
                        if(self.onCellClicked != null && typeof self.onCellClicked() == "function"){
                            return self.onCellClicked()(event,self.gridOptions, self.gridApi);
                        }
                    }, 
                    onCellValueChanged: function(event) {
                        
                    },
                    onRowValueChanged : function(event) { // used for adding/editing a row 
                        
                    },
                    onGridReady : function(event) {
                        console.log('the grid is now ready');
                        $timeout(function() {
                            self.gridOptions.api = event.api;
                            self.gridApi = event.api;  
                        }, 3000) 
                        if(typeof self.onGridReady() == "function"){
                            self.onGridReady()(self);
                        }
                        // set "Contains" in the column drop down filter to "StartWith" as it is not supported in document query 
                        event.api.filterManager.availableFilters.text.CONTAINS = "startsWith";
                        if(typeof self.rowData == 'undefined' || self.rowData == null || (self.rowData && self.rowData.length ==0)){
                            if(self.api){
                                self._createNewDatasource();
                            }else{
                                event.api.setRowData([]);
                            }
                        }else{
                            if(self.sizeColumnsToFit)
                            	event.api.sizeColumnsToFit();
                        }
                        // set a numeric filter model for each numerical column
                        if(this.columnsDefinition){
                            for(var i = 0; i < this.columnsDefinition.length; i++){
                                if(this.columnsDefinition[i].hasOwnProperty("type") && this.columnsDefinition[i]["type"] == "numeric"){
                                    this.columnsDefinition[i].filter = "number";
                                }
                            }  
                        }else{
                            //    self.gridOptions.api.showNoRowsOverlay();
                        }
                    },
                    onGridSizeChanged: function(event){
                        if(self.sizeColumnsToFit)
                        	self.gridOptions.api.sizeColumnsToFit();
                    }

                };
                
                    if(self.onRowDoubleClicked != null && typeof self.onRowDoubleClicked() == "function"){
                        self.gridOptions.onRowDoubleClicked = function(row){
                            return self.onRowDoubleClicked()(row)  
                        }
                    }
                this.style = {"height": "100%", "width": "100%"};   
                this.refreshOnEdit = (typeof this.refreshOnEdit != "undefined") ? this.refreshOnEdit : false;
                this.transport = (this.transport) ? this.transport : "wss";
                this.disableDeleteRow =  (this.enableDeleteRow == true) ? false : true;
                this.disableAddRow =  (this.enableAddRow == true) ? false : true;
                this.mode =  (this.gridOptions.rowModelType == 'infinite') ? "infinite" : "normal";

                if(self.msgTag){
                    dataStore.subscribe(this.onServerCall, self.msgTag, $scope);
                }

                $scope.$on("updateGridData-"+self.gridEventsId, function(event, broadcastData) {
                    self.broadcastData = broadcastData;
                    self._createNewDatasource();
                });
                
                $scope.$on("showGridAlert-"+self.gridEventsId, function(event, broadcastData) {
                    self.broadcastData = broadcastData;
                    self.showAlert(self.broadcastData.type, self.broadcastData.content);
                });
            }

            this.closeAlert = function() {
                this.show = false;
            };

            this.showAlert = function(type, content) {
                $loadingOverlay.hide();
                self.message = {
                    "type" : type,
                    "content" : content
                }
                self.showError = true;
                $timeout(function(){
                    self.showError = false;
                }, 5000);
            }

            this._saveData = function(event){
                if(event.data && event.data[self._dataIdentifierProperty]){
                    var params = event.data;
                    params.action = "edit";
                    if(this.editParams){
                        for(var key in this.editParams){
                            params[key] = this.editParams[key]
                        }
                    }  
                    dataStore.gridHelper(self.api, params).then(
                        function(data, response) {
                            self.gridOptions.api.hideOverlay();  
                            if (data && (data.result == "success" || data.status == "success")) {
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }
                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occurred. Please try again later.");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occurred. Please try again later.");
                        });
                }else{
                    var params = event.data;
                    params.action = "add";
                    if(this.addParams){
                        for(var key in this.addParams){
                            params[key] = this.addParams[key]
                        }
                    }   
                    dataStore.gridHelper(self.api, event.data).then(
                        function(data, response) {
                            self.gridOptions.api.hideOverlay();   
                            if (data && (data.result == "success" || data.status == "success")) {
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }

                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occurred. Please try again later.");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);g
                            self.showAlert("danger", "An error has occurred. Please try again later.");
                        });
                }
            }

            this.onAddRow = function(){
                 self.loadOverlay(null, this.saveRowConfig.schemaFormDefinition, this.saveRowConfig.api);
            }
            
            this.loadOverlay = function(marker, overlayForm, backendApi) {
                var of = angular.copy(overlayForm);
                of.title = "Add "+of.title;
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
                    if(wdgModel != 'cancel') {
                        var successHandler = function(data) {
                            if(self.gridEventsId == "group"){
                                if(data.scriptHandleId != null && data.scriptHandleId != ""){
                                    $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Saving group and updating devices...</b>');
                                    identityFactory.getJobStatus(backendApi, {scriptHandleId:  data.scriptHandleId }, 30, function (res){
                                        if (res && res == "success") {
                                            self._createNewDatasource();
                                            self.showAlert("success", "Successfully saved group and updated devices");
                                        } else {
                                            //This is in case some devices failed to update, they are returned for the user to be informed
                                            self.showAlert("warning", res);
                                        }
                                    },function(err){
                                        self.showAlert("warning", "Successfully saved group. Error when updating devices");
                                    })
                                }else{
                                    self._createNewDatasource();
                                    self.showAlert("success", "Group saved successfully");
                                }
                            }else{
                                var gridId = self.gridEventsId.charAt(0).toUpperCase() + self.gridEventsId.substring(1);
                                self._createNewDatasource();
                                self.showAlert("success", gridId+" saved successfully"); 
                            }
                        }
                        var failureHandler = function(err) {
                            var errDesc = 'Unknown error';
                            if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                                errDesc = err.data.metadata.description.en;
                            } else if (err.errorDetail) {
                                errDesc = err.errorDetail;
                            }
                            self.showAlert("danger", "Could not save "+self.gridEventsId+": "+errDesc);
                        }
                        self.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler);
                    }
                }, function () {
                    console.info('modal-component for widget update dismissed at: ' + new Date());
                });
            }
            
            this.callBackendApiPost = function(apiId, parameters, successHandler, failureHandler) {
                console.log	('POST calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
                self._callBackendApi(apiId, parameters, 'P', successHandler, failureHandler);
            }

            this._callBackendApi = function(apiId, parameters, method, successHandler, failureHandler) {
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
            
            

            this.openConfirmationPopUp = function(){
                if(self.gridOptions.api.getSelectedNodes().length > 0){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'deleteConfirmationOverlay',
                        size: 'lg',
                        scope: $scope,
                        resolve: {
                            grid: function () {
                                return self;
                            }
                        }
                    }); 
                }else {
                    self.showAlert("danger", "No row(s) selected");
                }
            }
            
            this.confirmRefreshTokensPopUp = function(){
                if(self.gridOptions.api.getSelectedNodes().length > 0){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'confirmRefreshTokenPopup',
                        size: 'lg',
                        scope: $scope,
                        resolve: {
                            grid: function () {
                                return self;
                            }
                        }
                    }); 
                }
                else {
                    self.showAlert("danger", "No device(s) selected");
                }
            }
            
            this.refreshTokens = function(){
                var selectedNodes = self.gridOptions.api.getSelectedNodes();
                var selectedKeys = [];
                for(var i = 0; i < selectedNodes.length; i++){
                    selectedKeys.push(selectedNodes[i].data[self._dataIdentifierProperty]);
                }
                if(selectedKeys.length > 0){
                    var parameters = {
                        "id": selectedKeys,
                    }
                httpClient.post(identityConfig.device.apis.generate, parameters).then(
                    function(data, response) {

                        if(data.scriptHandleId != null && data.scriptHandleId != ""){
                            $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Refreshing Token(s)...</b>');
                            identityFactory.getJobStatus(identityConfig.device.apis.generate, {scriptHandleId:  data.scriptHandleId }, 30, function (res){
                                $loadingOverlay.hide();
                                self.showTokenButtons = true;
                                if(res.status && res.status == "failure"){
                                    var errDesc = 'Unknown error';
                                    if (res.errorDetail) {
                                        res = data.errorDetail;
                                    }
                                    self.showAlert("danger", "Unable to refresh token(s), please try again later.");
                                    return;
                                }

                                self.token = res.token ? res.token : "N/A";
                                self._createNewDatasource();
                                self.gridOptions.api.deselectAll();
                                self.showAlert("success", "Token(s) refreshed successfully");
                            },function(err) {
                                self.showTokenButtons = true;
                                var errDesc = 'Unknown error';
                                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                                    errDesc = err.data.metadata.description.en;
                                } else if (err.errorDetail) {
                                    errDesc = err.errorDetail;
                                }
                                self.showAlert("danger", "Unable to refresh token(s), please try again later.");
                            })
                        }
                    
                        else
                            self.showAlert("danger", "Unable to refresh token(s), please try again later.");



                    },function(err){
                        self.showAlert("danger", "Unable to refresh token(s), please try again later.");
                    })
                } else
                    self.showAlert("danger", "No device(s) selected");
            }
            
            this.exportData = function(){
                $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Exporting file, please wait...</b>');
                var params = {"gridType": self.gridEventsId, "queryFilter": self.serverFilterText};
                httpClient.post(identityConfig.reports.apis.export, params).then(
                    function(data, response) {
                        if(data.status == "failure") {
                            self.showAlert("danger", "Unable to export, please try again");
                        } else {
                             identityFactory.getJobStatus(identityConfig.reports.apis.export, {scriptHandleId:  data.scriptHandleId }, 30, function (res){
                                 params.docKey = res;
                                 httpClient.get(identityConfig.reports.apis.getCSV, params).then(
                                    function(data, response) {
                                        self.showAlert("success", "Data exported successfully");
                                        var element = document.createElement('a');
                                        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + data.data);
                                        element.setAttribute('download', self.gridEventsId + 's.csv');
                                        element.style.display = 'none';
                                        document.body.appendChild(element);
                                        element.click();
                                        document.body.removeChild(element);
                                },function(err){
                                	self.showAlert("danger", "Unable to export, please try again");
                                });
                            },function(err){
                                 self.showAlert("danger", "Unable to export, please try again");
                            })
                        } 
                    }, function(err) {
                        self.showAlert("danger", "Unable to export, please try again");
                    }
                );
            }
            
            this.loadImportOverlay = function(){
                var of = angular.copy(this.identityForms.uploaderForm);
                var form = angular.copy(of.form);
                var self = this;
                var formWidget = {
                    'label': of.title,
                    'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
                    'schema': angular.copy(of.schema),
                    'form': form,
                    'model': {},
                    'parent': self
                }

                
                var modalInstance= $uibModal.open({
                    animation: true,
                    component: 'uploadFileComponent',
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
                        
                    }
                }, function () {
                    console.info('modal-component for widget update dismissed at: ' + new Date());
                });
            }

            this.onRemoveRow = function(key) {
                if(self.gridOptions.rowModelType == "infinite"){
                    if(self.removeRowConfig && self.removeRowConfig.api){
                        $loadingOverlay.show('<i class="fa fa-spinner fa-spin fa-1x"></i>&nbsp;<b>Deleting row(s)...</b>');
                        var api = self.removeRowConfig.api;
                        var selectedNodes = self.gridOptions.api.getSelectedNodes();
                        var selectedKeys = [];
                        for(var i = 0; i < selectedNodes.length; i++){
                           	 selectedKeys.push(selectedNodes[i].data[self._dataIdentifierProperty]);
                        }
                        if(selectedKeys.length > 0){
                            var params = {};
                            if(self.removeRowConfig.queryParam) {
                            	params[self.removeRowConfig.queryParam] =  selectedKeys;
                            } else {
                                params[self._dataIdentifierProperty] =  selectedKeys;
                            }
                            params["module"] =  self.gridEventsId;
                            
                            dataStore.postGridHelper(api, params).then(
                                function(data, response) {
                                    if(selectedKeys.length > 1){
                                        if(data.status == "failure") {
                                            self.showAlert("danger", "Unable to delete row(s), please try again");
                                        } else {
                                            identityFactory.getJobStatus(api, {scriptHandleId:  data.scriptHandleId }, 30, function (res){
                                                self.gridOptions.api.hideOverlay();     
                                                if (res && (res.result == "success" || res.status == "success")) {
                                                    self.showAlert("success", "Row(s) deleted successfully");
                                                    self.onServerCall();
                                                    self.gridOptions.api.deselectAll();
                                                } else {
                                                    if(res && res.errorDetail){
                                                        self.showAlert("danger", res.errorDetail);
                                                    }else{
                                                        self.showAlert("danger", "Unable to delete row(s), please try again");
                                                    }
                                                }
                                            },function(err){
                                                self.gridOptions.api.hideOverlay();
                                                console.log("failure", err);
                                                self.showAlert("danger", "Unable to delete row(s), please try again");
                                            })
                                        }
                                    }else{
                                        self.gridOptions.api.hideOverlay();     
                                        if (data && (data.result == "success" || data.status == "success")) {
                                            self.showAlert("success", "Row(s) deleted successfully");
                                            self.onServerCall();
                                            self.gridOptions.api.deselectAll();
                                        } else {
                                            if(data && data.errorDetail){
                                                self.showAlert("danger", data.errorDetail);
                                            }else{
                                                self.showAlert("danger", "Unable to delete row(s), please try again");
                                            }
                                        }
                                    }
                                },
                                function(err) {
                                    self.gridOptions.api.hideOverlay();     
                                    console.log("reject", err);
                                    self.showAlert("danger", "An error has occurred. Please try again later.");
                                });
                        }
                    }else{
                        self.showAlert("danger", "No script defined for delete row");
                    }
                }else{
                    var selectedNodes = self.gridOptions.api.getSelectedNodes();
                    self.gridOptions.api.removeItems(selectedNodes);
                }
            }

            this.onServerCall = function(data){
                self.gridOptions.api.refreshInfiniteCache();
            }

            this.undoChanges = function(data){
                if(self.oldEditedValue){ // undo field rename
                    self.gridOptions.api.forEachNode(function(node) {
                        if (node.childIndex == self.editedChildIndex || node.id == self.editedChildIndex) {
                            node.setSelected(true, true);
                        }
                    });
                    var selectedNode = self.gridOptions.api.getSelectedNodes()[0];
                    selectedNode.data[self.editedColumn] = self.oldEditedValue;
                    self.gridOptions.api.refreshView();
                }else{ // undo insert row
                    self.gridOptions.api.refreshInfiniteCache();
                }
            }

            this.onFilterChanged = function() {
                this.gridOptions.enableServerSideFilter = false;
                this.gridOptions.api.setQuickFilter(this.quickFilterValue);
                this.gridOptions.enableServerSideFilter = true;
            }

            this.onServerFilterChanged = function() {
                if (self.timeoutId == null) {
                    self.timeoutId = $timeout(function(){}, 1000).then(function(){
                        self.timeoutId = null;
                        self._createNewDatasource();
                    });
                }
                //self._createNewDatasource();
            }

            this.buildParams = function(params) {
                var queryFilter = self.serverFilterText;
                var columnName = null;
                var type = null;
                var pageNumber = params.endRow / this.gridOptions.paginationPageSize;
                if (params.sortModel && params.sortModel.length > 0) {
                    var sort = params.sortModel[0].sort;
                    var sortingColumnName = params.sortModel[0].colId;
                    type = (this.gridOptions.api.getColumnDef(sortingColumnName).type) ? this.gridOptions.api.getColumnDef(sortingColumnName).type : null;
                }
                if (params.filterModel) {
                    for (p in params.filterModel) {
                        queryFilter = params.filterModel[p].filter;
                        var queryType = params.filterModel[p].type;
                        var filterColumnName = p;
                        type = (this.gridOptions.api
                                .getColumnDef(filterColumnName).type) ? this.gridOptions.api
                            .getColumnDef(filterColumnName).type
                        : null;
                    }
                }
                var APIParams = {
                    "resultsPerPage" : this.gridOptions.paginationPageSize,
                    "pageNumber" : pageNumber
                }
                if (sortingColumnName) {
                    APIParams["sortingColumnName"] = sortingColumnName;
                }
                if (filterColumnName) {
                    APIParams["filterColumnName"] = filterColumnName;
                }
                if (sort) {
                    APIParams["sort"] = sort;
                }
                if (type) {
                    APIParams["sortType"] = type;
                }
                if (queryFilter) {
                    APIParams["queryFilter"] = queryFilter;
                }
                if (queryType) {
                    APIParams["queryType"] = queryType;
                }
                APIParams["startRow"] = params.startRow;
                APIParams["endRow"] = params.endRow;
                if(this.apiParams){
                    for(var param in this.apiParams){
                        APIParams[param] = this.apiParams[param];
                    }
                }
                if (self.useWindowParams && self.useWindowParams == "true") {
                    APIParams = angular.merge(APIParams,$routeParams)
                }
                return APIParams;
            }

        }]
    });

angular
    .module('Identity')
    .service("dataStore", ['httpClient', 'wsClient', '$q', function(httpClient, wsClient, $q) {
    this.subscribe = function(callback, tag, $scope){
        wsClient.onReady.then(function() {
            wsClient.subscribe(tag, callback.bind(self), $scope.$id);
        });
    }

    this.gridHelper = function(api, params){
        var d = $q.defer(); 
        httpClient
            .get(api, params).then(function(data, response){
            d.resolve(data, response)
        }, function(err) {
            d.reject(err)
        });
        return d.promise;
    }
    
    
    this.postGridHelper = function(api, params){
        var d = $q.defer(); 
      httpClient.post(api, params)
        .then(
        function(data, response) {
           d.resolve(data, response)
            console.log(data);
        },
        function(err) {
            d.reject(err)
            console.log(err);
        });
        return d.promise;
    }


    this.getGridData = function(api, params, transport, formatterFnc) {

        var d = $q.defer(); 
        var self = this;
        if(transport == "https"){
            httpClient
                .get(api, params).then(function(data, response){
                if(formatterFnc /**Check if function also*/){
                    data = formatterFnc(data);
                }
                if(data && data.documents){
                    var data = {"documents": data.documents, "count": data.count}
                    d.resolve(data, response)
                }else{
                    d.resolve(null, response)
                }
            }, function(err) {
                d.resolve(null);
                d.reject(err);
            });
            return d.promise;
        } else if(transport == "wss"){
            if(api && typeof api != 'undefined'){
                wsClient.onReady.then(function() {
                    wsClient
                        .call(api, params, "grid").then(function(data, response) {
                        if(formatterFnc /**Check if function also*/){
                            data = formatterFnc(data);
                        }
                        if(data && data.documents){
                            var data = {"documents": data.documents, "count": data.count}
                            d.resolve(data, response)
                        }else{
                            d.resolve(null, response)
                        }
                    }, function(err) {
                        d.resolve(null);
                        d.reject(err);
                    }
                                                       ); 
                }); 
                return d.promise;
            }else{
                wsClient.onReady.then(function() {
                    wsClient.publish(params, "publish").then(function(data, response) {
                        if(data && data.documents){
                            var data = {"documents": data.documents, "count": data.count}
                            d.resolve(data, response)
                        }else{
                            d.resolve(null, response);
                        }
                    }, function(err) {
                        d.resolve(null);
                        d.reject(err);
                    }
                                                            );
                }); 
                return d.promise;
            }
        }
    }

}]);

angular
    .module('Identity')
    .component('deleteConfirmationOverlay', 
               {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    templateUrl:  '/identity/view/javascript/components/grid/popup.html',
    controller: ['$scope', function ($scope) {
  this.$onInit = function () {
       this.title = "Delete";
      this.bodyMessage = "Are you sure you want to delete the selected row(s)?"
        this.onSubmit = function() {
            this.resolve.grid.onRemoveRow();
            this.close({$value: true});
        };
        this.onCancel = function () {
            this.dismiss({$value: false});
        };
    }
    }]
});

angular
    .module('Identity')
    .component('confirmRefreshTokenPopup', 
               {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    templateUrl:  '/identity/view/javascript/components/grid/popup.html',
    controller: ['$scope', function ($scope) {
  this.$onInit = function () {
       this.title = "Generate/Regenerate Token(s)";
      this.bodyMessage = "Are you sure you want to generate/regenerate the tokens of the selected row(s)?"
        this.onSubmit = function() {
            this.resolve.grid.refreshTokens();
            this.close({$value: true});
        };
        this.onCancel = function () {
            this.dismiss({$value: false});
        };
    }
    }]
});

angular
    .module("Identity")
    .factory(
      "identityFactory",
      ['httpClient', function(httpClient) {
           var factory = {};
          factory.getJobStatus = function(api, params, timeout, onSuccess, onFailure){
              var checkInterval = 1;
              if(timeout > 0 ){
                  timeout = timeout - checkInterval;
                  httpClient.get(api, params).then(
                      function(data, response) {
                          console.dir(data);
                          if(data.jobStatus == "complete"){
                              var jobResult = JSON.parse(data.jobResult);
                              if(jobResult.resultJSON.response.metadata.status == "success"){
                                  onSuccess(jobResult.resultJSON.response.result);
                                  return;
                              }else{
                                  onFailure("An error has occurred. Please try again later.");
                              }

                          }
                          var nextFireTime = checkInterval * 1000;
                          setTimeout(factory.getJobStatus, nextFireTime, api,params, timeout, onSuccess, onFailure);
                      },function(ex){
                          onFailure(ex);
                      });
              }else{
                  onFailure("TIME_OUT");
              }
          }
          return factory;
          
      }]);

angular
    .module("Identity").constant(
    "identityForms",
    {
        'group': { 
            'title': 'Group',
            'form': [
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-6',
                            'items': [{
                                'key': "name",
 								 "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}.",
                                    //302: "Name is required, cannot be empty!"
                            	}
                            }]
                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            "key": "devices",
                            "type": 'uiselectmultiple',
                            'htmlClass': 'col-xs-12',
                            "placeholder": "Select Devices",
                            "options": {
                                "multiple": true,
                                "closeOnSelect": true,
                                "httpGet":{
                                    "url":"identity/api/devices/listDevices",
                                    "parameter": "{\"count\": false, \"fields\": \"id,name\"}"
                                } ,
                                "map": {valueProperty: "id", nameProperty: "name"},
                            },
                        },
                    ]
                },

            ],
            'schema': {
                'type': 'object',
                'title': 'groupSchema',
                'properties': {
                    "name": {
                        'title': 'Group Name',
                        'type': 'string',
                        'maxLength': 116
                    },
                    "devices": {
                        "type": "array",
                        "title": "Devices",
                        "description": "Select your group devices",
                        "items": {
                            "type": "object"
                        }
                    }

                },
                'required': ["name"]
            }
        },
        'device': {
            'title': 'Device',
            'form': [
                {
                    'type': 'section',
                    'htmlClass':'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-12 col-sm-6',
                            'items': [{
                                'key': 'name',
                                "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                              }]
                        },
                        {
                            "type": "section",
                            //"readonly": true,
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                'key': 'id',
                                "validationMessage": {
                                    201: "ID is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]

                        }
                    ]
                },

                {
                    'type': 'section',
                    'htmlClass':'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-12 col-sm-6',
                            'items': [{
                                "key" : "password",
                                "type": "password",
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["confirmPassword"])
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                "key" : "confirmPassword",
                                "type": "password",
                                "condition":"model.password",
                                "required":true,
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["password"])
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            },
                                      {
                                          "key" : "confirmPassword",
                                          "type": "password",
                                          "condition":"!model.password",
                                          "ngModelOptions": { allowInvalid: true },
                                          /* "onChange": function(modelValue, form, model, scope) {
                                                console.log(model)
                                                 if(modelValue != model["password"])
                                                    scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                                 else {
                                                     scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                                     scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                                 }
                                             }*/
                                      } ]

                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            "htmlClass": "col-xs-12",
                            'items': [{
                                'key': 'description',
                                "validationMessage": {
                                    201: "Description is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]
                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            "htmlClass": "col-xs-12",
                            'items':[
                                {
                                    'type': 'radios-inline',
                                    "title": "Status",
                                    'key': 'isSuspended',
                                    'titleMap': [{
                                        'value': "false",
                                        'name': "Active"
                                    }, {
                                        'value': "true",
                                        'name': "Suspended"
                                    }]
                                }
                            ]
                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            'items':[
                                {
                                    'type':'uiselectmultiple',
                                    "placeholder": "Select Group",
                                    'key': 'groups',
                                    "options": {
                                        "httpGet":{
                                            "url":"identity/api/groups/listGroups",
                                            "parameter": "{\"count\": false}"
                                        } ,
                                        "map": {valueProperty: "name", nameProperty: "name"} 
                                    }
                                }
                            ]

                        },
                    ]
                },
                {
                  "key": "_oldDeviceAttrs",
                  "type": "hidden",
        		   "notitle": true,
                  "onFieldLoad" : function(modelValue, form, model){
                       model["_oldDeviceAttrs"] = _.pluck(model["deviceAttrs"], "name");
                   }
                },
                {
                    "type": "section",
                    "htmlClass": "",
                    "items": [{
                        "key": "deviceAttrs",
                        "title": "Device Attributes",
                        "items": [{
                            "type": "section",
                            "htmlClass": "row",
                            "items": [ {
                                "type": "section",
                                "htmlClass": "col-xs-6 col-sm-3",
                                "items": [{
                                    "key": "deviceAttrs[].name",
                                    "title": "name",

                                }]
                            },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              'type':'select',
                                              "key": "deviceAttrs[].type",
                                              'placeholder': 'select type',
                                              'titleMap': [
                                                  {
                                                      "value": "string",
                                                      "name": "string"
                                                  },
                                                  {
                                                      "value": "numeric",
                                                      "name": "numeric"
                                                  },
                                                  {
                                                      "value": "date",
                                                      "name": "date"
                                                  },
                                                  {
                                                      "value": "text",
                                                      "name": "text"
                                                  },
                                                  {
                                                      "value": "geospatial",
                                                      "name": "geospatial"
                                                  },
                                              ],
                                              "title": "type",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "deviceAttrs[].value",
                                              "title": "value",
                                          }]
                                      }]
                        }]
                    }]
                }

            ],

            'schema': {
                'type': 'object',
                'title': 'deviceSchema',
                'properties': {
                    'name': {
                        'title': 'Device',
                        'type': 'string',
                        'maxLength': 1024,
                    },
                    'id': {
                        'title': 'Device ID',
                        'type': 'string',
                        'maxLength': 117,
                    },
                    'password': {
                        'title': 'Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'confirmPassword': {
                        'title': 'Confirm Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'description': {
                        'title': 'Description',
                        'type': 'string',
                        'maxLength': 1024,
                        'x-schema-form': {
                            'type': 'textarea',
                            'placeholder': 'Description for this device'
                        }
                    },
                    "groups": {
                        "type": "array",
                        "title": "Groups",
                       // "description": "Select your group",
                        "items": {
                            "type": "object"
                        }
                    },
                    "isSuspended": {
                        "title": "Status",
                        "type": "string",
                        "default":"false"
                    },
                    "deviceAttrs":{
                        'title': 'Device Attributes',
                        "type": "array",
                        "items":{
                            "type": "object",
                            "properties":{
                                "name": {
                                    "title": "Name",
                                    "type": "string",
                                },
                                "type": {
                                    "title": "type",
                                    "type": "string",
                                    "placeholder":"select type"
                                },
                                "value": {
                                    "title": "Value",
                                    "type": "string",
                                }
                            }
                        }
                    },
                    
                    "_oldDeviceAttrs": {
                        "type": "string"
                    }
                },
                'required': ["name","id","password","confirmPassword"]
            }
        },
        'user': {
            'title': 'User',
            'form': [
                {
                    'type': 'section',
                    'htmlClass':'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-12 col-sm-6',
                            'items': [{
                                'key': 'name',
                                "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]
                        },
                         {
                            "type": "section",
                            //"readonly": true,
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                'key': 'id',
                                "validationMessage": {
                                    201: "login username is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]

                        },
                    ]
                },

                {
                    'type': 'section',
                    'htmlClass':'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-12 col-sm-6',
                            'items': [{
                                "key" : "password",
                                "type": "password",
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["confirmPassword"])
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                "key" : "confirmPassword",
                                "type": "password",
                                "condition":"model.password",
                                "required":true,
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["password"])
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            },
                                      {
                                          "key" : "confirmPassword",
                                          "type": "password",
                                          "condition":"!model.password",
                                          "ngModelOptions": { allowInvalid: true },
                                          "onChange": function(modelValue, form, model, scope) {
                                                    console.log(model)
                                                     if(modelValue != model["password"])
                                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                                     else {
                                                         scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                                         scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                                     }
                                                 }
                                      } ]

                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            "htmlClass": "col-xs-12",
                            'items': [{
                                'key': 'email',
                                 "validationMessage": {
                                    202: "Invalid email address",
                            	}
                            }]
                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            "htmlClass": "col-xs-12",
                            'items':[
                                {
                                    'type': 'radios-inline',
                                    "title": "Status",
                                    'key': 'isSuspended',
                                    'titleMap': [{
                                        'value': "false",
                                        'name': "Active"
                                    }, {
                                        'value': "true",
                                        'name': "Suspended"
                                    }]
                                }
                            ]
                        }
                    ]
                },
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            'items':[
                                {
                                    'type':'uiselectmultiple',
                                    "placeholder": "Select Group",
                                    'key': 'groups',
                                    "options": {
                                        "httpGet":{
                                            "url":"identity/api/groups/listGroups",
                                            "parameter": "{\"count\": false}"
                                        } ,
                                        "map": {valueProperty: "name", nameProperty: "name"} 
                                    }
                                }
                            ]

                        },
                    ]
                },
                {
                    "key": "_oldUserAttrs",
                    "type": "hidden",
                    "notitle": true,
                    "onFieldLoad" : function(modelValue, form, model){
                        model["_oldUserAttrs"] = _.pluck(model["userAttrs"], "name");
                    }
                },
                {
                    "type": "section",
                    "htmlClass": "",
                    "items": [{
                        "key": "userAttrs",
                        "title": "User Attributes",
                        "items": [{
                            "type": "section",
                            "htmlClass": "row",
                            "items": [ {
                                "type": "section",
                                "htmlClass": "col-xs-6 col-sm-3",
                                "items": [{
                                    "key": "userAttrs[].name",
                                    "title": "name",

                                }]
                            },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              'type':'select',
                                              "key": "userAttrs[].type",
                                              'placeholder': 'select type',
                                              'titleMap': [
                                                  {
                                                      "value": "string",
                                                      "name": "string"
                                                  },
                                                  {
                                                      "value": "numeric",
                                                      "name": "numeric"
                                                  },
                                                  {
                                                      "value": "date",
                                                      "name": "date"
                                                  },
                                                  {
                                                      "value": "text",
                                                      "name": "text"
                                                  },
                                                  {
                                                      "value": "geospatial",
                                                      "name": "geospatial"
                                                  },
                                              ],
                                              "title": "type",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "userAttrs[].value",
                                              "title": "value",
                                          }]
                                      }]
                        }]
                    }]
                }

            ],

            'schema': {
                'type': 'object',
                'title': 'userSchema',
                'properties': {
                    'name': {
                        'title': 'User Name',
                        'type': 'string',
                        'maxLength': 1024,
                    },
                    'id': {
                        'title': 'Login',
                        'type': 'string',
                        'maxLength': 1024,
                    },
                    'password': {
                        'title': 'Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'confirmPassword': {
                        'title': 'Confirm Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'email': {
                        'title': 'Email Address',
                        'type': 'string',
                        'pattern':'^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,})$' 
                    },
                    "groups": {
                        "type": "array",
                        "title": "Groups",
                        //"description": "Select your group",
                        "items": {
                            "type": "object"
                        }
                    },
                    "isSuspended": {
                        "title": "Status",
                        "type": "string",
                        "default":"false"
                    },
                    "userAttrs":{
                        'title': 'User Attributes',
                        "type": "array",
                        "items":{
                            "type": "object",
                            "properties":{
                                "name": {
                                    "title": "Name",
                                    "type": "string",
                                },
                                "type": {
                                    "title": "type",
                                    "type": "string",
                                    "placeholder":"select type"
                                },
                                "value": {
                                    "title": "Value",
                                    "type": "string",
                                }
                            }
                        }
                    },

                    "_oldUserAttrs": {
                        "type": "string"
                    }
                },
                'required': ["name","id","password","confirmPassword"]
            }
        },
        'uploaderForm': {
            "form": [
                {
                    "type": "section",
                    "items": [
                        {
                            "type": "section",
                            "items": [{
                                "key": "csvFile",
                                "type": "nwpFileUpload",
                                "showProgress": false,
                                "simpleImageUpload": false,
                                "i18n": {
                                    "add": "Open file browser",
                                    "preview": "Preview Upload",
                                    "filename": "File Name",
                                    "progress": "Progress Status",
                                    "upload": "Upload",
                                    "dragorclick": "Drag and drop your file here or click here",
                                    "required": "Required"
                                },
                                "notitle": false
                            }]
                        }

                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                  "csvFile": {
                        "title":"File",
                        "type": "array",
                        "format": "singlefile",
                        "x-schema-form": {
                            "type": "array"
                        },
                        "pattern":       {
                            "mimeType":  ".csv",
                            "validationMessage": "Wrong File Type. Allowed types ",
                        },
                        "maxSize":       {
                            "maximum": "10MB",
                            "validationMessage": "File exceeded allowed size of "
                        }
                    },
                },
                "required": [
                    "csvFile"
                ]
            }
        }
    }
)