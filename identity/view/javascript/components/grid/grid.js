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
        controller : function($scope, $window, $uibModal, $timeout, identityForms, wsClient, dataStore, identityFactory, $routeParams,httpClient, $route, $timeout, $q, identityConfig, $loadingOverlay) {

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
                                    self.showAlert("danger", "An error has occured. Please try again later.");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occured. Please try again later.");
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
                                    self.showAlert("danger", "An error has occured. Please try again later.");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);g
                            self.showAlert("danger", "An error has occured. Please try again later.");
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
                                    self.showAlert("danger", "An error has occured. Please try again later.");
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
                self._createNewDatasource();
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

        }
    });

angular
    .module('Identity')
    .service("dataStore", function(httpClient, wsClient, $q) {
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

});

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
    controller: function ($scope) {
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
    }
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
    controller: function ($scope) {
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
    }
});

angular
    .module("Identity")
    .factory(
      "identityFactory",
      function(httpClient) {
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
                                  onFailure("An error has occured. Please try again later.");
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
          
      });
