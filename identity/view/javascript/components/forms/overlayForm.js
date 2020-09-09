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
    controller: function ($scope) {
        
       var self=this;
       this.$onInit = function () {
          
        this.widget = this.resolve.widget;
        
        $scope.$broadcast('schemaFormRedraw')
       
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": false}
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
        console.log("Dissmissed")
      };

    }
});