agGrid.initialiseAgGridWithAngular1(angular);
angular.module('Identity', ['agGrid', 'ui.bootstrap', 'ngRoute']);

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

            "fixedHeight" : "<?",  

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
            
            "gridEventsId": "@"
        },

        templateUrl : '/identity/view/javascript/components/grid/grid.html',
        controller : function($scope, $window, $uibModal, $timeout, wsClient, dataStore, $routeParams) {

            var self = this;

            self.broadcastData = null;

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
                console.log("destory Grid")
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
                    rowModelType : (this.api) ? "infinite" : "",
                    rowSelection : (this.rowModelSelection) ? this.rowModelSelection : "multiple",
                    suppressRowClickSelection : (this.suppressRowClickSelection) ? this.suppressRowClickSelection : true,
                    suppressCellSelection : (this.suppressCellSelection) ? this.suppressCellSelection : true,
                    paginationPageSize : (this.paginationPageSize) ? this.paginationPageSize : 50,
                    overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><i class="fa fa-spinner fa-spin fa-fw fa-2x"></i> Please wait while your rows are loading</span>',
                    defaultColDef : {
                        filterParams : {
                            apply : true
                        },
                        suppressFilter: (typeof this.suppressFilter != 'undefined')? this.suppressFilter : false,
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
                this.fixedHeight = (typeof this.fixedHeight != 'undefined') ? this.fixedHeight : true;   
                this.style = {"height": "100%", "width": "100%"};   
                /**if(this.fixedHeight){
                    this.gridHeight = (this.gridHeight) ? this.gridHeight : "500";
                    this.style["height"] = this.gridHeight;
                    this.style["clear"] = "left";
                    this.style["width"] = "100%";
                }else{
                    this.style["height"] = "77%";
                } **/
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
                
            }

            this.closeAlert = function() {
                this.show = false;
            };

            this.showAlert = function(type, content) {
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
                                //       self.showAlert("success", "Row(s) updated successfuly");
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }
                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occured");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occured");
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
                                //	  self.showAlert("success", "Row(s) Added successfuly");
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }

                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occured");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occured");
                        });
                }
            }

            this.onAddRow = function(){
                var newRow = {};
                // Create a json object to save new row fields 
                for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                    newRow[self.gridOptions.columnDefs[n].field] = "";
                }
                self.gridOptions.api.insertItemsAtIndex(0, [newRow]);
                self.gridOptions.api.setFocusedCell(0, self.gridOptions.columnDefs[0].field);
                self.gridOptions.api.startEditingCell({
                    rowIndex: 0,
                    colKey: self.gridOptions.columnDefs[0].field,
                    charPress: self.gridOptions.columnDefs[0].field
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
                }
            }

            this.onRemoveRow = function(key) {
                if(self.gridOptions.rowModelType == "infinite"){
                    if(self.api){
                        var selectedNodes = self.gridOptions.api.getSelectedNodes();
                        var selectedKeys = [];
                       // console.log("the data is "+ data);
                        for(var i = 0; i < selectedNodes.length; i++){
                           	selectedKeys.push(selectedNodes[i].data[self._dataIdentifierProperty]);
                        }
                        if(selectedKeys.length > 0){
                            var params;
                            self.gridOptions.api.showLoadingOverlay();
                            if(self._dataIdentifierProperty == "groups")
                                params = {"groupName" : selectedKeys}
                            if(self._dataIdentifierProperty == "id")
                                    params = {"id" : selectedKeys}
                            if(this.deleteParams){
                                for(var key in this.deleteParams){
                                    params[key] = this.deleteParams[key]
                                }
                            }  
                            
                            dataStore.postGridHelper(params, self._dataIdentifierProperty).then(
                                function(data, response) {
                                    self.gridOptions.api.hideOverlay();     
                                    if (data && (data.result == "success" || data.status == "success")) {
                                        self.showAlert("success", "Row(s) deleted successfuly");
                                        self.onServerCall(data);
                                    } else {
                                        if(data && data.errorDetail){
                                            self.showAlert("danger", data.errorDetail);
                                        }else{
                                            self.showAlert("danger", "An error has occured");
                                        }
                                    }
                                },
                                function(err) {
                                    self.gridOptions.api.hideOverlay();     
                                    console.log("reject", err);
                                    self.showAlert("danger", "An error has occured");
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
    .module('Grid')
    .service("dataStore", function(httpClient, wsClient, $q) {
    this.subscribe = function(callback, tag, $scope){
        wsClient.onReady.then(function() {
            wsClient.subscribe(tag, callback.bind(self), $scope.$id);
        });
    }

    this.gridHelper = function(api, params){
        var d = $q.defer(); 
        httpClient
            .get(api, params, "grid").then(function(data, response){
            d.resolve(data, response)
        }, function(err) {
            d.reject(err)
        });
        return d.promise;
    }
    
    
    this.postGridHelper = function(params, dataIdentifierProperty){
        var d = $q.defer(); 
        var api;
        if(dataIdentifierProperty == "id")
            api = "identity/api/devices/deleteDevice";
        if(dataIdentifierProperty == "groups")
            api = "identity/api/groups/deleteGroup";
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