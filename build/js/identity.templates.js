var appCachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/identity/view/html/views/groups/viewGroup.html',
    "<md-dialog class=dialog><div ng-if=vm.hasAlert uib-alert ng-class=\"'alert-' + ( vm.message.type || 'warning')  + ' m10'\" close=vm.closeAlert() dismiss-on-timeout=5000>{{vm.message.content}}</div><md-dialog-content><div ng-init=vm.init()><div class=\"dashboard-template dashboardTheme viewDeviceContainer\"><div class=\"dashboardContainer modal-lg\"><div class=box><div class=box-header><div class=title-header><h4 class=mrgb20>View Group</h4><div class=closeBtn><md-button class=\"md-icon-button closeHeaderBtn\" ng-click=vm.closeDialog()><md-icon class=\"glyphicon glyphicon-remove\" aria-hidden=true></md-icon></md-button></div></div><div class=clearfix></div><div ng-if=vm.groupFetched class=\"contentContainer container\"><div class=row><div class=col-xs-6><label>Group Name</label><p>{{vm.name}}</p></div><div class=col-xs-6><label>Devices belonging to this group</label><div ng-if=\"vm.devices == 'N/A'\" class=\"col-xs-12 col-md-6\"><p>{{vm.devices}}</p></div><div ng-hide=\"vm.devices == 'N/A'\" class=mt5><div ng-repeat=\"device in vm.devices\" class=blockContent>{{device.id}}</div></div></div></div></div></div></div></div></div></div></md-dialog-content><md-dialog-actions class=\"col-md-12 pb15 pt15\"><div ng-if=vm.showActionButtons><md-button ng-click=vm.editGroup() class=\"btn btn-default\">Edit</md-button><md-button ng-click=vm.confirmationDeleteGroup() class=\"btn btn-default\">Delete</md-button></div><div ng-if=!vm.showActionButtons class=\"col-xs-12 mb15\"><span>Are you sure you want to delete this group?</span><md-button ng-click=vm.cancelActionButtons() class=\"btn btn-default mgr5\">No</md-button><md-button ng-click=vm.deleteGroup() class=\"btn btn-default mgr5\">Yes</md-button></div></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('/identity/view/html/views/confirmationDialog.html',
    "<md-dialog class=dialog><md-dialog-content><div class=title-header><h4 class=mrgb20 ng-init=vm.init()>{{vm.header}}</h4></div><div class=\"contentContainer container\"><p>{{vm.promptMessage}}</p></div></md-dialog-content><md-dialog-actions class=\"col-md-12 pb15 pt15\" ng-hide=vm.isLoading><md-button ng-click=vm.closeDialog() class=\"btn btn-default btn-md\">No</md-button><md-button ng-click=vm.deleteIdentity() class=\"btn btn-default btn-md\">Yes</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('/identity/view/html/views/identityMain.html',
    "<scriptr-identity-main></scriptr-identity-main>"
  );


  $templateCache.put('/identity/view/html/views/viewIdentity.html',
    "<md-dialog class=dialog><div ng-if=vm.hasAlert uib-alert ng-class=\"'alert-' + ( vm.message.type || 'warning')  + ' m10'\" close=vm.closeAlert() dismiss-on-timeout=5000>{{vm.message.content}}</div><md-dialog-content class=dialogContainer><div ng-init=vm.init()><div class=\"dashboard-template dashboardTheme viewDeviceContainer\"><div class=\"dashboardContainer modal-lg\"><div class=box><div class=box-header><div class=title-header><h4 class=mrgb20>View {{vm.gridId}}</h4><div class=closeBtn><md-button class=\"md-icon-button closeHeaderBtn\" ng-click=vm.closeDialog()><md-icon class=\"glyphicon glyphicon-remove\" aria-hidden=true></md-icon></md-button></div></div><div class=clearfix></div><div ng-if=vm.identityFetched class=\"contentContainer container\"><div class=row><div class=col-xs-6><label>{{vm.identityNameLabel}}</label><p>{{vm.name}}</p></div><div class=col-xs-6><label>{{vm.identityIdLabel}}</label><p>{{vm.id}}</p></div><div ng-if=\"vm.parent.gridId == 'device'\" class=col-xs-6><label>Description</label><p>{{vm.description}}</p></div><div ng-if=\"vm.parent.gridId == 'user'\" class=col-xs-6><label>Email</label><p>{{vm.email}}</p></div><div class=col-xs-12><label>Groups this {{vm.parent.gridId}} belongs to</label><div ng-if=\"vm.groups == 'N/A'\" class=mt5><p>{{vm.groups[0]}}</p></div><div ng-hide=\"vm.groups == 'N/A'\" class=mt5><div ng-repeat=\"group in vm.groups\" class=blockContent>{{group}}</div></div></div><div class=col-xs-6><label>Status</label><p>{{vm.status}}</p></div><div ng-if=\"vm.parent.gridId == 'device'\" class=col-xs-12><label>Token</label><p>{{vm.token}}</p></div><div ng-if=\"vm.parent.gridId == 'device' && vm.showTokenButtons\" class=\"col-xs-12 mb15\"><button ng-if=\"vm.token != 'N/A'\" ng-click=vm.copyToken() ng-mouseleave=vm.resetCopyTooltip() class=\"btn btn-default mgr5\" id=copyButton uib-tooltip={{vm.copyTooltip}} tooltip-placement=top tooltip-append-to-body=true>Copy</button> <button ng-if=\"vm.token == 'N/A' && vm.status != 'Suspended'\" ng-click=vm.generateToken() class=\"btn btn-default mgr5\">Generate</button> <button ng-if=\"vm.token != 'N/A'\" ng-click=\"vm.confirmTokenAction('regenerate')\" class=\"btn btn-default mgr5\">Regenerate</button> <button ng-if=\"vm.token != 'N/A'\" ng-click=\"vm.confirmTokenAction('delete')\" class=\"btn btn-default mgr5\">Delete</button></div><div ng-if=\" vm.parent.gridId == 'device' && !vm.showTokenButtons\" class=\"col-xs-12 mb15\"><span>{{vm.tokenActionMsg}}</span> <button ng-click=vm.cancelTokenAction() class=\"btn btn-default mgr5\">No</button> <button ng-if=vm.actionDelete ng-click=vm.revokeToken() class=\"btn btn-default mgr5\">Yes</button> <button ng-if=!vm.actionDelete ng-click=vm.regenerateToken() class=\"btn btn-default mgr5\">Yes</button></div><div ng-if=vm.hasAttrs class=col-xs-12><label>{{vm.gridId}} Attributes</label><table border=1 class=table><thead><tr><th scope=col>Name</th><th scope=col>Type</th><th scope=col>Value</th></tr></thead><tbody><tr ng-repeat=\"attr in vm.identityAttrs\"><td>{{attr.name}}</td><td>{{attr.type}}</td><td>{{attr.value}}</td></tr></tbody></table></div></div></div></div></div></div></div></div></md-dialog-content><md-dialog-actions class=\"col-md-12 pb15 pt15\"><div ng-if=vm.showActionButtons><md-button ng-click=vm.editIdentity() class=\"btn btn-default btn-md\">Edit</md-button><md-button ng-click=vm.confirmationDeleteIdentity() class=\"btn btn-default btn-md\">Delete</md-button></div><div ng-if=!vm.showActionButtons class=\"col-xs-12 mb15\"><span>Are you sure you want to delete this {{vm.parent.gridId}}?</span><md-button ng-click=vm.cancelActionButtons() class=\"btn btn-default mgr5\">No</md-button><md-button ng-click=vm.deleteIdentity() class=\"btn btn-default mgr5\">Yes</md-button></div></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('/identity/view/javascript/components/forms/overlayForm.html',
    "<div class=modal-header><h4 class=modal-title id=modal-title>{{$ctrl.widget.label}}</h4><md-button class=closeHeaderBtn ng-click=$ctrl.onCancel()><md-icon class=\"glyphicon glyphicon-remove\" tooltip-placement=left uib-tooltip=Cancel aria-hidden=true></md-icon></md-button></div><form name=myForm ng-submit=$ctrl.onSubmit(myForm)><div class=modal-body><div html-class=bls sf-options=$ctrl.frmGlobalOptions sf-schema=$ctrl.schema sf-form=$ctrl.form sf-model=$ctrl.model></div></div><div class=modal-footer><button type=reset class=\"btn btn-default\" ng-click=$ctrl.onCancel()>{{$ctrl.widget.buttons.cancel.label}}</button> <button type=submit class=\"btn btn-default\">{{$ctrl.widget.buttons.save.label}}</button></div></form>"
  );


  $templateCache.put('/identity/view/javascript/components/forms/uploadFile.html',
    "<div><div ng-if=$ctrl.hasAlert uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=$ctrl.closeAlert() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div><div class=modal-header><div class=title-header><h4 class=mrgb20>Import {{$ctrl.gridTypeToUpperCase}}s</h4></div></div><form name=uploadFileForm class=adminHome ng-submit=$ctrl.save(uploadFileForm)><div class=modal-body><div sf-options=$ctrl.frmGlobalOptions sf-schema=$ctrl.schema sf-form=$ctrl.form sf-model=$ctrl.model></div><div class=modal-footer><button ng-hide=$ctrl.showLoading class=\"btn btn-default\" type=submit>Import</button> <button type=button ng-hide=$ctrl.showLoading class=\"btn btn-default\" ng-click=$ctrl.downloadTemplate()>Download Template</button> <button ng-hide=$ctrl.showLoading class=\"btn btn-default\" type=reset ng-click=$ctrl.onCancel()>Close</button></div></div></form></div>"
  );


  $templateCache.put('/identity/view/javascript/components/grid/grid.html',
    "<div class=\"filter-bar mt10\" ng-if=\"($ctrl.enableClientSideFilter && $ctrl.mode == 'normal') || ($ctrl.enableServerSideFilter && $ctrl.mode == 'infinite') || !$ctrl.disableAddRow || !$ctrl.disableDeleteRow\"><div class={{$ctrl.class}}><form><div ng-if=\"$ctrl.enableClientSideFilter && $ctrl.mode == 'normal'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onFilterChanged() ng-model=$ctrl.quickFilterValue placeholder=\"Client filter\"></div></div><div ng-if=\"$ctrl.enableServerSideFilter && $ctrl.mode == 'infinite'\" class=\"form-group col-xs-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onServerFilterChanged() ng-model=$ctrl.serverFilterText placeholder=Search></div></div><div class=\"col-xs-4 pull-right text-right\"><button ng-if=\"$ctrl.gridEventsId == 'device'\" ng-click=$ctrl.confirmRefreshTokensPopUp() class=\"btn btn-default mt4\" tooltip-placement=auto uib-tooltip=\"Generate/Regenerate token(s)\"><i class=\"glyphicon glyphicon-refresh\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.disableAddRow}} ng-click=$ctrl.onAddRow() class=\"btn btn-default mt4\" tooltip-placement=auto uib-tooltip=\"Add {{$ctrl.gridEventsId}}\"><i class=\"fa fa-plus\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.disableDeleteRow}} ng-click=$ctrl.openConfirmationPopUp() class=\"btn btn-default mt4\" tooltip-placement=auto uib-tooltip=\"Delete selected {{$ctrl.gridEventsId}}(s)\"><i class=\"fa fa-close\" aria-hidden=true></i></button> <button ng-click=$ctrl.exportData() class=\"btn btn-default mt4\" tooltip-placement=auto uib-tooltip=\"Export to CSV\"><i class=\"glyphicon glyphicon-export\" aria-hidden=true></i></button> <button ng-if=\"$ctrl.gridEventsId == 'device' || $ctrl.gridEventsId == 'user'\" ng-click=$ctrl.loadImportOverlay() class=\"btn btn-default mt4\" tooltip-placement=auto uib-tooltip=\"Import {{$ctrl.gridEventsId}}s\"><i class=\"glyphicon glyphicon-import\" aria-hidden=true></i></button></div></form></div></div><div class=col-xs-12 ng-show=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div class=clearfix></div><div class=col-xs-12><div ag-grid=$ctrl.gridOptions class=ag-bootstrap ng-style=$ctrl.style style=\"min-height: 200px\"></div></div>"
  );


  $templateCache.put('/identity/view/javascript/components/grid/popup.html',
    "<div class=modal-header><h3 class=modal-title>{{$ctrl.title}}</h3></div><div class=modal-body>{{$ctrl.bodyMessage}}</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=$ctrl.onCancel()>No</button> <button class=\"btn btn-warning\" type=button ng-click=$ctrl.onSubmit()>Yes</button></div>"
  );


  $templateCache.put('/identity/view/javascript/components/main/identity.html',
    "<div ng-init=$ctrl.$onInit();><h1 ng-if=!$ctrl.identityLayout class=col-xs-12>{{$ctrl.deviceTitle}}</h1><div class=col-xs-12 ng-if=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div><div ng-if=!$ctrl.identityLayout class=\"btn-group btnToggle\" data-toggle=buttons><label class=\"btn btnContent {{$ctrl.deviceTabClass}}\"><input type=radio name=device id=device class=device ng-model=$ctrl.gridId value=device ng-change=$ctrl.changeTab($ctrl.gridId)> Devices</label> <label class=\"btn btnContent {{$ctrl.groupTabClass}}\"><input id=group type=radio class=group ng-model=$ctrl.gridId value=group ng-change=$ctrl.changeTab($ctrl.gridId)> Groups</label> <label class=\"btn btnContent {{$ctrl.userTabClass}}\"><input type=radio name=user id=user class=user ng-model=$ctrl.gridId value=user ng-change=$ctrl.changeTab($ctrl.gridId)> Users</label></div><div class=\"col-xs-12 tabContent\" ng-if=\"$ctrl.gridId == 'device'\"><div class=row><scriptr-identity-grid ng-if=$ctrl.renderGrid columns-definition=$ctrl.devicesColDef grid-events-id={{$ctrl.gridId}} enable-sorting=false enable-delete-row=true boxlabel=\"{{ 'USERS.LIST' | translate}}\" fixed-height=true grid-height=350px enable-add-row=true msg-tag=grid cell-editable=false on-row-double-clicked=$ctrl.onRowDoubleClicked enable-client-side-filter=false enable-server-side-filter=true enable-server-side-sorting=true row-model-selection=multiple suppress-row-click-selection=true suppress-cell-selection=true pagination-page-size=10 cache-block-size=10 transport=https enable-client-side-sorting=false size-columns-to-fit=true enable-col-resize=false pagination=true row-model-type=pagination suppress-filter=true boxheader=true transport=https api={{$ctrl.gridAPI}} api-params=$ctrl.params row-height=50 grid-data-identifier-property={{$ctrl.identifierProperty}} remove-row-config=$ctrl.removeDeviceConfig save-row-config=$ctrl.saveDeviceConfig custom-no-rows-label=\"No Results Found\"></scriptr-identity-grid></div></div><div class=\"col-xs-12 tabContent\" ng-if=\"$ctrl.gridId == 'group'\"><div class=row><scriptr-identity-grid ng-if=$ctrl.renderGrid columns-definition=$ctrl.groupsColDef grid-events-id={{$ctrl.gridId}} enable-sorting=false enable-delete-row=true enable-add-row=true boxlabel=\"{{ 'USERS.LIST' | translate}}\" fixed-height=true grid-height=350px msg-tag=grid cell-editable=false on-row-double-clicked=$ctrl.onRowDoubleClicked enable-client-side-filter=false enable-server-side-filter=true enable-server-side-sorting=false row-model-selection=multiple suppress-row-click-selection=true suppress-cell-selection=true pagination-page-size=10 cache-block-size=10 transport=https enable-client-side-sorting=false enable-delete-row=true size-columns-to-fit=true enable-col-resize=false pagination=true row-model-type=pagination suppress-filter=true boxheader=true transport=https api={{$ctrl.gridAPI}} api-params=$ctrl.params row-height=50 grid-data-identifier-property={{$ctrl.identifierProperty}} remove-row-config=$ctrl.removeGroupConfig save-row-config=$ctrl.saveGroupConfig custom-no-rows-label=\"No Results Found\"></scriptr-identity-grid></div></div><div class=\"col-xs-12 tabContent\" ng-if=\"$ctrl.gridId == 'user'\"><div class=row><scriptr-identity-grid ng-if=$ctrl.renderGrid columns-definition=$ctrl.usersColDef grid-events-id={{$ctrl.gridId}} enable-sorting=false enable-delete-row=true enable-add-row=true fixed-height=true grid-height=350px msg-tag=grid cell-editable=false on-row-double-clicked=$ctrl.onRowDoubleClicked enable-client-side-filter=false enable-server-side-filter=true enable-server-side-sorting=false row-model-selection=multiple suppress-row-click-selection=true suppress-cell-selection=true pagination-page-size=10 cache-block-size=10 transport=https enable-client-side-sorting=false enable-delete-row=true size-columns-to-fit=true enable-col-resize=false pagination=true row-model-type=pagination suppress-filter=true boxheader=true transport=https api={{$ctrl.gridAPI}} api-params=$ctrl.params row-height=50 grid-data-identifier-property={{$ctrl.identifierProperty}} remove-row-config=$ctrl.removeUserConfig save-row-config=$ctrl.saveUserConfig custom-no-rows-label=\"No Results Found\"></scriptr-identity-grid></div></div></div></div>"
  );
}])