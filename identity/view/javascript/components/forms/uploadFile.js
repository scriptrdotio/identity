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
    controller: function ($scope, $timeout, httpClient, $q, $loadingOverlay,identityFactory) {
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
                self.closeAlert();
                self.skippedReport = "";
                self.failedReport = "";
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
                            self.showAlert("danger", data.errorDetail, 5000);
                        } else {
                            identityFactory.getJobStatus(identityConfig.reports.apis.import, {scriptHandleId: data.scriptHandleId }, 30, function (res){
                                self.showLoading = false;
                                self.copyReportTooltip = "Copy Report";
                                if (res.status && res.status == "success") {
                                    self.showAlert("success", "The "+self.gridType+"s have been imported successfully", 5000);
                                    self.parent._createNewDatasource();
                                    d.resolve(data, response);
                                } else if (res.status && res.status == "partial") {
                                    if(res.skippedReport)
                                        self.skippedReport = res.skippedReport.join(", ");
                                    self.showAlert("warning", res.message ? res.message : "The "+self.gridType+"s have been imported successfully");
                                    if(res.succeededReport)
                                        self.parent._createNewDatasource();
                                    d.resolve(data, response);
                                } else {
                                    //This is in case some devices/users failed to be created
                                    if(res.skippedReport)
                                        self.skippedReport = res.skippedReport.join(", ");
                                    if(res.failedReport)
                                        self.failedReport = res.failedReport.join(", ");
                                    var errorMsg = res.errorDetail? res.errorDetail : (res.message ? res.message : "Failed to import "+self.gridType+"s");
                                    self.showAlert("danger", errorMsg);
                                    if(res.succeededReport)
                                        self.parent._createNewDatasource();
                                    d.reject(res.errorCode?res.errorCode:400, errorMsg);
                                }
                            },function(errorDetail){
                                console.log("Failed to import: ", errorDetail);
                                self.showAlert("danger", "Failed to import "+self.gridType+"s", 5000);
                                self.showLoading = false;
                                d.reject(errorDetail);  
                            })

                        }

                    }, function(err) {
                        var errorMsg = (err.data && err.data.response && err.data.response.metadata && err.data.response.metadata.errorDetail) ? err.data.response.metadata.errorDetail : "Failed to import "+self.gridType+"s";
                        self.showAlert("danger", errorMsg, 5000);
                        self.showLoading = false;
                        d.reject(err); 

                    });
                return d.promise;  
            }
        }
        
        this.copyReport = function(type){
            var report = "";
            if(type=="skipped"){
                report = self.skippedReport;
            }else if(type=="failed"){
                report = self.failedReport;
            }
            navigator.clipboard.writeText(report).then(function() {
                console.log('Copying to clipboard was successful');
                self.copyReportTooltip = "Copied!";
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        }
        
        this.resetReportTooltip = function(){
            $timeout(function() {
               self.copyReportTooltip = "Copy Report";
            }, 500);
        }
        
        this.downloadTemplate = function(){
            var params = {
                    type: self.gridType,
                    fileName: self.gridType+"sTemplate.csv"
                };
            httpClient.post(identityConfig.reports.apis.template, params).then(
                function(data, response) {
                    self.showLoading = false;
                    if(data.status == "failure") {
                        self.showAlert("danger", "Unable to download template, please try again", 5000);
                    } else {
                        self.showAlert("success", "Template downloaded successfully", 5000);
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + data.data);
                        element.setAttribute('download', params.fileName);
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                    } 
                }, function(err) {
                    self.showLoading = false;
                    self.showAlert("danger", "Unable to download template, please try again", 5000);
                }
            );
        }

        this.showAlert = function(type, content, duration) {
            $loadingOverlay.hide();
            this.message = {
                "type" : type,
                "content" : content
            }
            if(duration)
                this.message["duration"] = duration;
            this.hasAlert = true;
        };

        this.closeAlert = function() {
            this.hasAlert = false;
        };
    }
});