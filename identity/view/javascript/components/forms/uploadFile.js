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
    controller: function ($scope, httpClient, $q) {
        var self = this;
        self.showLoading = false;
        this.$onInit = function(){
            this.widget = this.resolve.widget;
            $scope.$broadcast('schemaFormRedraw')
            this.frmGlobalOptions = {
                "destroyStrategy" : "remove",
                "formDefaults": {"feedback": true}
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
        }

        this.onCancel = function (myForm) {
            this.schema = {};
            this.form = {};
            this.model = angular.copy(this.widget.options);
            this.dismiss({$value: 'cancel'});
            console.log("Dissmissed")
        }

        this.save = function(form){
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');
            // Then we check if the form is valid
            if (form.$valid) {
                self.showLoading = true;
                var d = $q.defer();  
                var data = angular.copy(this.model);
                if(form.uploadForm.file.$dirty) {
                    data["file"] = form.uploadForm.file.$modelValue
                } 
                delete data["csvFile"]
                var fd = new FormData();
                for ( var key in data ) {
                    fd.append(key, data[key]);
                }

                httpClient.post("identity/api/reports/scheduleImport", fd, null,true).then(
                    function(data, response) {
                        if(data.status == "failure") {
                            self.showLoading = false;
                            self.showAlert("danger", data.errorDetail);
                        } else {
                            self.getJobStatus("identity/api/reports/scheduleImport", {scriptHandleId: data.scriptHandleId }, 30, function (){
                                self.showAlert("success", "The devices have been imported successfully.");
                                $scope.$broadcast("updateGridData-device", {});
                                self.showLoading = false;
                                d.resolve(data, response);  
                            },function(errorCode, errorDetail){
                                self.showAlert("danger", errorDetail? errorDetail : errorCode);
                                self.showLoading = false;
                                d.reject(errorCode, errorDetail);  
                            })

                        }

                    }, function(err) {
                        self.showAlert("danger", err.data.response.metadata.errorDetail);
                        self.showLoading = false;
                        console.log("reject", err.data.response.metadata.errorDetail);
                        d.reject(err); 

                    });
                return d.promise;  
            }
        }

        this.getJobStatus = function(api,params,timeout,successFnc, failureFnc){
            var checkInterval = 1;
            if(timeout > 0 ){
                timeout = timeout - checkInterval;
                httpClient.get(api, params, null,true).then(
                    function(data) {

                        if(data.jobStatus == "complete"){
                            var jobResult = JSON.parse(data.jobResult);
                            if(jobResult.resultJSON.response.result == "success"){
                                successFnc(jobResult.resultJSON.response.result);
                                return;
                            }else{
                                failureFnc("An error occurred, please try again later.");
                                return;
                            }
                        }
                        var nextFireTime = checkInterval * 1000;
                        setTimeout(self.getJobStatus, nextFireTime,api,params,timeout,successFnc, failureFnc);
                    },function(ex){
                        failureFnc(ex);
                    });
            }else{
                failureFnc("TIME_OUT");
            }
        }

        this.showAlert = function(type, content) {
            this.message = {
                "type" : type,
                "content" : content
            }
            this.hasAlert = true;
        };

        this.closeAlert = function() {
            this.hasAlert = false;
        };
    }
});