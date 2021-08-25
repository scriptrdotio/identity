var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/ACL.html',
    "<div class=acl-wrapper ng-click=\"$ctrl.showAccessControlList = true\"><span class=acl-btn ng-class=\"($ctrl.users.length == 1 && $ctrl.users[0].code == 'anonymous') ? 'unlocked' : 'locked'\"><a ng-click=$ctrl.openModal() href=javascript:void(0); uib-tooltip={{$ctrl.accessType}} tooltip-placement=right><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAARCAYAAADZsVyDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExOUI1NTNCNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExOUI1NTNDNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTE5QjU1Mzk0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTE5QjU1M0E0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vZpebAAAB2UlEQVR42rSUv0sCYRjH37vu0BNNdG2Qk1ocEk53F1tapdnlqECac2hIbkloFOL8F8IlwqUmQZwOsUHBIZMWRSQHFVTyeh55kzc9Ray+8OX96eee93mfVy6TyRBQCOwh2+kDbCQSiR+TAlgHn5LfKQs+Yyf4P4ASKwZP/kkCbQ2aq23koXdkCU6Cn7cER8FPq8CoS7rpiG6MbgBN1uv1fbfbTVRVXQm+Z6JOriu/Vqt1gK3L5bIPBgMVTNLp9LmmaYN+v/+IaRUscmWsq2v4obfdbl9Mp1NpPB7P51Op1N1wOCROp/MN9sgsGGF+2vdbXQjKbreL4E+EdLvd+TyOUYFAwBeLxXaEhSInTCqWVC6X8RQnDofjcBZJKGTG43ETIuR1XTebzSbX6/VIPp+/EhaK3E+hN1YRy7LsbTQaynd0kUiEwEeIJEkkHA7PwHCZ6GsWbDD9V6u6Nk1zz2az7UJ+fZPJRAQQHn221ul0OGzxIzzPGwKTX4MCo7RdfgkejwF+qFartzAM5nI5DoAIJbVabQZWFOWlWCyGBeboGwnTMBqN5uNCocCx66VSScYYODjexk+MeQT4j0hEUXyHlGjYDwaDWqVSOaZFkN0WTJiy1Gn/iF34EmAAsBK5Pr0LIbQAAAAASUVORK5CYII=\" alt=restrictions> <i class=\"fa fa-lock acl-icon-locked red\"></i> <i class=\"fa fa-unlock-alt acl-icon acl-icon-unlocked light-green\"></i></a></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/dygraphs/dygraphs.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=\"$ctrl.dataFailureMessage ? $ctrl.dataFailureMessage : $ctrl.stalledDataMessage ? $ctrl.stalledDataMessage : $ctrl.invalidData ? $ctrl.invalidData : '' \" action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=$ctrl.datas><ng-dygraphs data=$ctrl.datas options=$ctrl.options legend=$ctrl.legend></ng-dygraphs></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/myModalContent.html',
    "<div class=acl-controls><div class=modal-header><h3 class=modal-title>Access Control List</h3></div><div class=modal-body><div ng-if=$ctrl.show uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=$ctrl.closeAlert() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div><h5 class=text-info>List of groups and devices allowed to run the script <a href=javascript:void(0); class=text-primary uib-popover-html=$ctrl.popoverContent popover-placement=right><i class=\"fa fa-question-circle\"></i></a></h5><div ng-show=$ctrl.showMsg class=\"col-xs-12 center-div alert fadeIn animated alert-info\"><div class=\"col-xs-9 pdl0\"><div class=\"mt8 ml10\"><span>Access permission to the \"anonymous\" predefined group allows anyone to serve the file. Adding it to your access control list will automatically remove any other groups or devices. Are you sure you want to continue?</span></div></div><div class=\"col-xs-3 pdr0 text-right\"><button ng-click=$ctrl.removeAnonymousAccess() type=button class=\"btn btn-default btn-sm mr5\">No</button> <button ng-click=$ctrl.addAnonymousAccess() type=button class=\"btn btn-primary btn-sm\">Yes</button></div></div><scriptr-autocomplete id=devicesList placeholder=\"Select a user/group\" pause=400 hide-list=false search-fields=code default-set-object=$ctrl.defaultSetObject selected-object=$ctrl.onSelect title-field=code objects=$ctrl.users clear-selected=true description-field=description image-field=pic list-selected-object=true minlength=0 text-no-results=\"No results\" text-searching=Searching... transport=https on-format-data=$ctrl.callback api=UIComponents/dashboard/frontend/examples/list/getDevices input-class=\"form-control form-control-small\"></scriptr-autocomplete><div class=clearfix></div><div class=\"italic text-muted fnt12 mt10\"><i class=\"fa fa-info-circle\" aria-hidden=true></i><span id=permissionsNote> Note that removing scriptr device from the access control list will prevent you from serving the file from the IDE.</span></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Close</button> <button type=button class=\"btn btn-warning\" ng-click=$ctrl.updateFileACL()>Save changes</button></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/chart/chart.html',
    "<div class=morris-chart-container><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData loading-message={{$ctrl.loadingMessage}} use-popover=$ctrl.usePopover failure-message=\"$ctrl.dataFailureMessage ? $ctrl.dataFailureMessage : $ctrl.stalledDataMessage ? $ctrl.stalledDataMessage : $ctrl.invalidData ? $ctrl.invalidData : '' \" action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=\"$ctrl.datas.length > 0\" class=fullHeight><div ng-if=\"$ctrl.type == 'line'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div line-data=$ctrl.datas line-xkey={{$ctrl.xkey}} line-ykeys=$ctrl.ykeys line-labels=$ctrl.labels line-colors=$ctrl.colors line-line-width=$ctrl.lineWidth line-point-size=$ctrl.pointSize line-point-fill-colors=$ctrl.pointFillColors line-point-stroke-colors=$ctrl.pointStrokeColors line-ymax=$ctrl.ymax line-ymin=$ctrl.ymin line-smooth=$ctrl.smooth line-hide-hover=$ctrl._hideHover line-hover-callback=$ctrl.onHoverCallback line-parse-time=$ctrl.parseTime line-units=$ctrl.units line-post-units=$ctrl.postUnits line-pre-units=$ctrl.preUnits line-date-format=$ctrl.onDateFormat line-x-labels=$ctrl.xlabels line-x-label-format=$ctrl.onXlabelFormat line-x-label-angle=$ctrl.xlabelAngle line-y-label-format=$ctrl.onYlabelFormat line-goals=$ctrl.goals line-goal-stroke-width=$ctrl.goalStrokeWidth line-goal-line-colors=$ctrl.goalLineColors line-events=$ctrl.events line-event-stroke-width=$ctrl.eventStrokeWidth line-event-line-colors=$ctrl.eventLineColors line-continuous-line=$ctrl.continuousLine line-axes=$ctrl.axes line-grid=$ctrl.grid line-grid-text-color=$ctrl.gridTextColor line-grid-text-size=$ctrl.gridTextSize , line-grid-text-family=$ctrl.gridTextFamily line-grid-text-weight=$ctrl.gridTextWeight line-fill-opacity=$ctrl.fillOpacity line-resize=$ctrl.resize line-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'bar'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div bar-data=$ctrl.datas bar-x={{$ctrl.xkey}} bar-y=$ctrl.ykeys bar-labels=$ctrl.labels bar-colors=$ctrl.colors bar-resize=$ctrl.resize bar-stacked=$ctrl.stacked bar-hide-hover=$ctrl._hideHover bar-hover-callback=$ctrl.onHoverCallback bar-grid=$ctrl.grid bar-grid-text-color=$ctrl.gridTextColor bar-grid-text-size=$ctrl.gridTextSize , bar-grid-text-family=$ctrl.gridTextFamily bar-grid-text-weight=$ctrl.gridTextWeight bar-axes=$ctrl.axes bar-ymax=$ctrl.ymax bar-ymin=$ctrl.ymin bar-goals=$ctrl.goals bar-goal-stroke-width=$ctrl.goalStrokeWidth bar-goal-line-colors=$ctrl.goalLineColors bar-x-label-angle=$ctrl.xlabelAngle bar-y-label-format=$ctrl.onYlabelFormat bar-date-format=$ctrl.onDateFormat bar-x-label-format=$ctrl.onXlabelFormat bar-parse-time=$ctrl.parseTime bar-events=$ctrl.events bar-event-stroke-width=$ctrl.eventStrokeWidth bar-event-line-colors=$ctrl.eventLineColors bar-post-units=$ctrl.postUnits bar-pre-units=$ctrl.preUnits bar-horizontal=$ctrl.horizontal bar-bar-size=$ctrl.barSize bar-bar-size-ratio=$ctrl.barSizeRatio bar-bar-gap=$ctrl.barGap bar-bar-opacity=$ctrl.barOpacity bar-bar-radius=$ctrl.barRadius bar-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'area'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div area-chart line-colors=$ctrl.colors area-data=$ctrl.datas area-xkey={{$ctrl.xkey}} area-ykeys=$ctrl.ykeys area-labels=$ctrl.labels area-line-width=$ctrl.lineWidth area-point-size=$ctrl.pointSize area-point-fill-colors=$ctrl.pointFillColors area-point-stroke-colors=$ctrl.pointStrokeColors area-ymax=$ctrl.ymax area-ymin=$ctrl.ymin area-smooth=$ctrl.smooth area-hide-hover=$ctrl._hideHover area-hover-callback=$ctrl.onHoverCallback area-parse-time=$ctrl.parseTime area-units=$ctrl.units area-post-units=$ctrl.postUnits area-pre-units=$ctrl.preUnits area-date-format=$ctrl.onDateFormat area-x-labels=$ctrl.xlabels area-x-label-format=$ctrl.onXlabelFormat area-x-label-angle=$ctrl.xlabelAngle area-y-label-format=$ctrl.onYlabelFormat area-goals=$ctrl.goals area-goal-stroke-width=$ctrl.goalStrokeWidth area-goal-line-colors=$ctrl.goalLineColors area-events=$ctrl.events area-event-stroke-width=$ctrl.eventStrokeWidth area-event-line-colors=$ctrl.eventLineColors area-continuous-line=$ctrl.continuousLine area-axes=$ctrl.axes area-grid=$ctrl.grid area-grid-text-color=$ctrl.gridTextColor area-grid-text-size=$ctrl.gridTextSize , area-grid-text-family=$ctrl.gridTextFamily area-grid-text-weight=$ctrl.gridTextWeight area-fill-opacity=$ctrl.fillOpacity area-resize=$ctrl.resize area-behave-like-line=$ctrl.behaveLikeLine></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'donut'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div class=morris-chart-dimension donut-data=$ctrl.datas donut-hover-callback=$ctrl.onHoverCallback donut-label-color=$ctrl.labelColor donut-background-color=$ctrl.backgroundColor donut-colors=$ctrl.colors donut-formatter=$ctrl.donutFormatter(y,data) donut-resize=$ctrl.resize donut-chart></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && !$ctrl.noResults\"><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/gauge/gauge.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=\"$ctrl.dataFailureMessage ? $ctrl.dataFailureMessage : $ctrl.stalledDataMessage ? $ctrl.stalledDataMessage : $ctrl.invalidData ? $ctrl.invalidData : '' \" action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div style=\"width: 100%; height: 100%\" class=gauge ng-if=\"$ctrl.gaugeValue !== undefined && $ctrl.gaugeValue !== null\"><h2 ng-show=$ctrl.title ng-style=\"{ 'background' : '{{$ctrl.titleBackgroundColor}}', 'font-weight' : '{{$ctrl.titleFontWeight}}','font-size' : '{{$ctrl.titleFontSize}}', 'font-family' : '{{$ctrl.titleFontFamily}}', 'color' : '{{$ctrl.titleFontColor}}', 'text-align' : '{{$ctrl.titlePosition}}', 'text-shadow' : '{{$ctrl.titleShadow}}', 'text-transform' : '{{$ctrl.titleTextTransform}}', 'padding' : '{{$ctrl.titlePadding}}', 'height' : '{{$ctrl.titleHeight}}', 'margin' : '{{$ctrl.titleMargin}}' }\" translate>{{$ctrl.title}}</h2><div value={{$ctrl.gaugeValue}} value-font-color={{$ctrl.valueFontColor}} min={{$ctrl.min}} max={{$ctrl.max}} style=\"width: 100%; height: 100%\" hide-min-max={{$ctrl.hideMinMax}} hide-value={{$ctrl.hideValue}} show-inner-shadow={{$ctrl.showInnerShadow}} gauge-color={{$ctrl.gaugeColor}} shadow-opacity={{$ctrl.shadowOpacity}} shadow-size={{$ctrl.shadowSize}} custom-sectors={{$ctrl.customSectors}} label={{$ctrl.label}} label-font-color={{$ctrl.labelFontColor}} start-animation-type={{$ctrl.startAnimationType}} refresh-animation-type={{$ctrl.refreshAnimationType}} counter={{$ctrl.counter}} value-font-family={{$ctrl.valueFontFamily}} relative-gauge-size={{$ctrl.relativeGaugeSize}} value-min-font-size={{$ctrl.valueMinFontSize}} label-min-font-size={{$ctrl.labelMinFontSize}} min-label-min-font-size={{$ctrl.minLabelMinFontSize}} max-label-min-font-size={{$ctrl.maxLabelMinFontSize}} gauge-width-scale={{$ctrl.gaugeWidthScale}} shadow-vertical-offset={{$ctrl.shadowVerticalOffset}} level-colors={{$ctrl.levelColors}} no-gradient={{$ctrl.noGradient}} start-animation-time={{$ctrl.startAnimationTime}} refresh-animation-time={{$ctrl.refreshAnimationTime}} donut={{$ctrl.donut}} donut-start-angle={{$ctrl.donutStartAngle}} reverse={{$ctrl.reverse}} decimals={{$ctrl.decimals}} symbol={{$ctrl.symbol}} format-number={{$ctrl.formatNumber}} human-friendly={{$ctrl.humanFriendly}} human-friendly-decimal={{$ctrl.humanFriendlyDecimal}} on-animation-end={{$ctrl.onAnimationEnd}} pointer={{$ctrl.pointer}} justgage></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/grid.html',
    "<div class=filter-bar ng-if=\"($ctrl.enableClientSideFilter && $ctrl.mode == 'normal') || ($ctrl.enableServerSideFilter && $ctrl.mode == 'infinite') || !$ctrl.disableAddRow || !$ctrl.disableDeleteRow\"><div class={{$ctrl.class}}><form><div ng-if=\"$ctrl.enableClientSideFilter && $ctrl.mode == 'normal'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onFilterChanged() ng-model=$ctrl.quickFilterValue placeholder=\"Client filter\"></div></div><div ng-if=\"$ctrl.enableServerSideFilter && $ctrl.mode == 'infinite'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onServerFilterChanged() ng-model=$ctrl.serverFilterText placeholder=\"Server filter\"></div></div><div class=\"col-xs-12 col-sm-6 pull-right text-right\"><button ng-hide={{$ctrl.disableDeleteRow}} ng-click=$ctrl.openConfirmationPopUp() class=\"btn btn-default mt4\" tooltip-placement=left uib-tooltip=\"Delete selected row\"><i class=\"fa fa-close\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.disableAddRow}} ng-click=$ctrl.onAddRow() class=\"btn btn-warning mt4\" tooltip-placement=bottom uib-tooltip=\"Insert row\"><i class=\"fa fa-plus\" aria-hidden=true></i></button></div></form></div></div><div class=col-xs-12 ng-show=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div class=clearfix></div><div class=col-xs-12><div ag-grid=$ctrl.gridOptions class=ag-bootstrap ng-style=$ctrl.style></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/popup.html',
    "<div class=modal-header><h3 class=modal-title>Delete</h3></div><div class=modal-body>Are you sure you want to delete the selected row(s)?</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=$ctrl.onCancel()>No</button> <button class=\"btn btn-warning\" type=button ng-click=$ctrl.onSubmit()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/list/autocomplete.html',
    "<div><span ng-show=$ctrl.showList ng-hide=$ctrl.hideObjects class=script-wrap ng-if=$ctrl.listSelectedObject ng-repeat=\"obj in $ctrl.objects track by $index\"><span style=\"position: relative\"><span class=script-text uib-tooltip={{obj[$ctrl.titleField]}} tooltip-placement=bottom><i class=\"mr5 text-primary {{obj.icon}}\"></i> {{obj[$ctrl.titleField]}}</span> <a ng-if=\"obj[$ctrl.titleField] != 'nobody'\" href=javascript:void(0); ng-click=$ctrl.addObjectToList(obj) uib-tooltip=Remove tooltip-placement=right><i class=\"fa fa-close\"></i></a></span></span><div class=clearfix></div><div class=\"text-center loading\" ng-show=!$ctrl.showList><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><angucomplete-alt ng-show=$ctrl.showList id={{$ctrl.id}} placeholder={{$ctrl.placeholder}} default-set-object=$ctrl.defaultSetObject pause={{$ctrl.pause}} hide-objects=$ctrl.hideObjects list-selected-object=$ctrl.listSelectedObject objects=$ctrl.objects selected-object=$ctrl.selectedObject local-data=$ctrl.localData image-field={{$ctrl.imageField}} search-fields={{$ctrl.searchFields}} title-field={{$ctrl.titleField}} separator={{$ctrl.separator}} description-field={{$ctrl.descriptionField}} image-field={{$ctrl.imageField}} minlength={{$ctrl.minlength}} input-class={{$ctrl.inputClass}} match-class={{$ctrl.matchClass}} maxlength={{$ctrl.maxlength}} selected-object-data=$ctrl.selectedObjectData input-name={{$ctrl.inputName}} clear-selected={{$ctrl.clearSelected}} override-suggestions={{$ctrl.overrideSuggestions}} field-required=$ctrl.fieldRequired field-required-class={{$ctrl.fieldRequiredClass}} initial-value=$ctrl.initialValue input-changed=$ctrl.inputChanged(text) auto-match=$ctrl.autoMatch focus-in=$ctrl.focusIn focus-out=$ctrl.focusOut disable-input=$ctrl.disableInput focus-first=$ctrl.focusFirst field-tabindex={{$ctrl.fieldTabindex}} text-searching={{$ctrl.textSearching}} text-no-results={{$ctrl.textNoResults}}></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/map/map.html',
    "<div class=map-wrap><section ng-if=\"$ctrl.clusteredView == true && $ctrl.showDetailedMap == false\"><ng-map id=\"{{'clustered-'+$ctrl.$wdgid}}\" on-zoom_changed=$ctrl.onClusteredZoomChanged(); single-info-window=true zoom-to-inlude-markers=true center=\"{{$ctrl.mapcenter || $ctrl.defaultcenter}}\" zoom={{$ctrl.clusterZoom}}><drawing-manager ng-if=\"$ctrl.geofenceManager == true\" on-overlaycomplete=$ctrl.onMapOverlayCompleted() drawing-control-options={{$ctrl.drawingOptions}} drawingcontrol={{$ctrl.drawingControl}} drawingmode=null rectangleoptions={{$ctrl.overlaySettings}} polygonoptions={{$ctrl.overlaySettings}} circleoptions={{$ctrl.overlaySettings}}></drawing-manager></ng-map><div class=messages ng-show=\"$ctrl.drawingMessages != null\"><div class=\"alert alert-warning\">{{$ctrl.drawingMessages}}</div></div><div class=heatmap ng-if=\"$ctrl.heatmap == true\"><h5>Enable Heatmap</h5><span><scriptr-toggle-switch resize=false on-switch-change=$ctrl.activateHeatMap switch-status=$ctrl.switchStatus class=\"switch-success switch-small\"></scriptr-toggle-switch></span></div></section><section ng-if=\"$ctrl.clusteredView == false || $ctrl.showDetailedMap == true\"><ng-map id=\"{{'detailed-'+$ctrl.$wdgid}}\" on-zoom_changed=$ctrl.onDetailedZoomChanged(); single-info-window=true zoom-to-inlude-markers=true center=\"{{$ctrl.mapcenter || $ctrl.defaultcenter}}\" zoom={{$ctrl.detailedmapzoom}} on-click=$ctrl.hideinfoWindow()><drawing-manager ng-if=\"$ctrl.geofenceManager == true\" on-overlaycomplete=$ctrl.onMapOverlayCompleted() drawing-control-options={{$ctrl.drawingOptions}} drawingcontrol={{$ctrl.drawingControl}} drawingmode=null rectangleoptions={{$ctrl.overlaySettings}} polygonoptions={{$ctrl.overlaySettings}} circleoptions={{$ctrl.overlaySettings}}></drawing-manager><div><div ng-repeat=\"(key, asset) in $ctrl.displayedAssets\" ng-if=\"$ctrl.heatmap != true && $ctrl.switchStatus != true\"><shape name=polyline path={{asset.path}} stroke-color={{asset.pathColor}} stroke-opacity={{asset.strokeOpacity}} stroke-width={{asset.strokeWeight}} icons={{asset.pathIcon}}></shape><div ng-repeat=\"marker in asset.markers track by $index\"><div ng-if=\"$ctrl.trackedAsset == null\"><marker position={{marker.position}} title={{marker.display}} animation={{marker.animation}} icon={{marker.icon}} data={{marker.id}} on-click=\"$ctrl.showAssetInfo(event, 'click', marker, '{{marker.assetKey}}', '{{marker.tripKey}}', '{{marker.id}}')\" on-mouseover=\"$ctrl.showAssetInfo(event, 'mouseover', marker, '{{marker.assetKey}}', '{{marker.tripKey}}', '{{marker.id}}')\"></marker></div><div ng-if=\"$ctrl.trackedAsset !=null\"><marker position={{marker.position}} title={{marker.display}} animation={{marker.animation}} icon={{marker.icon}} clickable=false></marker></div></div></div></div><div ng-if=\"$ctrl.markerInfoWindow == true\"><div ng-transclude></div><info-window id=\"{{'infoWindowTemplate_default_'+$ctrl.$wdgid}}\"><div ng-non-bindable=\"\"><table class=\"table table-bordered\"><thead><tr><th ng-repeat=\"(key, value) in marker.details\">{{key}}</th></tr></thead><tbody><tr><td ng-repeat=\"(key, value) in marker.details\">{{value.value || \"N/A\"}}</td></tr></tbody></table></div></info-window></div></ng-map><div class=messages ng-show=\"$ctrl.drawingMessages != null\"><div class=\"alert alert-warning\">{{$ctrl.drawingMessages}}</div></div><div class=heatmap ng-if=\"$ctrl.heatmap == true\"><h5>Enable Heatmap</h5><span><scriptr-toggle-switch resize=false on-switch-change=$ctrl.activateHeatMap switch-status=$ctrl.switchStatus class=\"switch-success switch-small\"></scriptr-toggle-switch></span></div></section><div><div ng-if=\"$ctrl.geofenceManager == true\" class=drawingmanager-buttons><span><a ng-click=$ctrl.hideShowGeofences() title=\"Hide all geofences\"><i class=fa ng-class='{\"fa-eye-slash\":  $ctrl.geofencesVisible, \"fa-eye\": !$ctrl.geofencesVisible }' aria-hidden=true></i> </a></span><span><a ng-click=$ctrl.clearAllGeofences() title=\"Erase all geofences\"><i class=\"fa fa-eraser\" aria-hidden=true></i></a></span></div><div ng-if=\"$ctrl.geofenceManager == true\" class=drawingmanager-action-buttons><button class=\"btn btn-primary btn-sm btn-block\" ng-click=$ctrl.saveAllGeofences() data-toggle=tooltip title=\"Save all geofences\">Save</button></div></div></div><div class=geofence-menu><a title=\"Configure this widget\" ng-click=$ctrl.editSelectedGeofenceSettings()><i class=\"glyphicon glyphicon-pencil\"></i> </a><a title=\"Remove this widget\" ng-click=$ctrl.removeSelectedGeofence()><i class=\"glyphicon glyphicon-trash\"></i></a></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
    "<div><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style class=thermowrapper ng-if=$ctrl.value><tg-thermometer-vertical value={{$ctrl.value}} unit={{$ctrl.thermoUnit}} percent={{$ctrl.percent}} sectors=$ctrl.sectors ticks=$ctrl.ticks height={{$ctrl.height}} mercury-color=$ctrl.mercuryColor></tg-thermometer-vertical></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html',
    "<div style=\"height: 90%\" class=tg-thermometer style=display:none><div class=draw-a></div><div class=draw-b><div style=\"width: 6px;position: absolute;\n" +
    "            left: 0;\n" +
    "            right: 0;\n" +
    "            width: 10px;\n" +
    "            top: 0;\n" +
    "            margin: auto;\n" +
    "            height: 20px;\n" +
    "            border-radius: 10px 10px 0 0;background-color: {{mercuryColor}}\"></div><div style=\"width: 14px;height: 14px; position: absolute;\n" +
    "            left: 0;\n" +
    "            right: 0;\n" +
    "            top: 0;\n" +
    "            bottom: 0;\n" +
    "            margin: auto;\n" +
    "            width: 24px;\n" +
    "            height: 24px;\n" +
    "            border-radius: 50%; background-color: {{mercuryColor}}\"></div></div><div class=meter><div class=statistics><div class=percent style=\"bottom: calc({{val.percent}}% - 2px)\" ng-repeat=\"val in ticks track by $index\">{{val.tick}}{{unit}}</div></div><div style=\"height: {{percent}}%; background-color: {{mercuryColor}}\" class=mercury><div class=percent-current>{{value}}{{unit}}</div><div class=mask><div class=bg-color style=\"height: calc({{height}}% - 57px); background: {{mercuryColor}}\"></div></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/odometer/odometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style ng-if=$ctrl.odometerValue><span odometer=$ctrl.odometerValue odometer-options=$ctrl.odometerOptions></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/searchBox/searchBox.html',
    "<div class=row ng-show=\"$ctrl.showFilter == 'true'\"><div class=\"col-xs-12 col-md-8\"><input class=\"form-control input-sm\" ng-keyup=\"$event.keyCode == 13 ? $ctrl.onFilterChanged() : null\" ng-model=$ctrl.searchValue placeholder={{$ctrl.searchText}}></div><div class=\"col-xs-12 col-md-4\"><button ng-click=$ctrl.onFilterChanged() class=\"btn btn-primary btn-sm btn-block\">Go</button></div><div ng-show=$ctrl.noResults class=\"col-xs-12 alert\"><span class=\"alert alert-danger col-xs-12\">no results</span></div></div><div><div class=\"text-center loading\" ng-show=$ctrl.searching><i class=\"fa fa-spinner fa-spin fa-2x\"></i></div><abn-tree tree-data=$ctrl.treeData tree-control=$ctrl.treeControl icon-leaf={{$ctrl.iconLeaf}} icon-expand={{$ctrl.iconExpand}} icon-collapse={{$ctrl.iconCollapse}} on-select=$ctrl.onSelect(branch) expand-level=$ctrl.expandLevel initial-selection=$ctrl.initialSelection></abn-tree></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage loading-message={{$ctrl.loadingMessage}} action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div class=speedometer-wrapper></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div class=accelerometer-wrapper ng-if=\"$ctrl.xLine && $ctrl.yLine && $ctrl.angle\"><div class=\"line y\" ng-style=\"{ 'transform' :  $ctrl.yLine, 'border': '1px solid blue' }\"></div><div class=line ng-style=\"{ 'transform':  $ctrl.xLine}\"></div><div class=angle ng-style=\"{ 'transform':  $ctrl.angle }\"></div><div class=guideX></div><div class=guideY></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/button/button.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style ng-if=$ctrl.label><button ng-if=$ctrl.isDisabled disabled class=\"{{$ctrl.class}} is-disabled ui-button\" ng-click=$ctrl.click() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button> <button ng-if=!$ctrl.isDisabled class=\"{{$ctrl.class}} ui-button\" ng-click=$ctrl.click() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/slider/slider.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage loading-message={{$ctrl.loadingMessage}} action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=$ctrl.max ng-style=$ctrl.style class=slider><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-high=$ctrl.max rz-slider-options=$ctrl.options></rzslider></div><div ng-if=!$ctrl.max ng-style=$ctrl.style class=slider><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-options=$ctrl.options></rzslider></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/IFrame/IFrame.html',
    "<iframe ng-if=$ctrl.link src={{$ctrl.trustSrc($ctrl.link)}} frameborder=0 allowfullscreen></iframe><h3 ng-if=!$ctrl.link>No URL set</h3>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover data-failure-message=$ctrl.data-failure-message loading-message={{$ctrl.loadingMessage}} action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-click=$ctrl.publishData() ng-style=$ctrl.style ng-if=\"$ctrl.switchStatus === false || $ctrl.switchStatus === true\"><toggle-switch ng-model=$ctrl.switchStatus on-label={{$ctrl.onLabel}} off-label={{$ctrl.offLabel}} knob-label={{$ctrl.knobLabel}} is-disabled=$ctrl.isDisabled class={{$ctrl.class}}></toggle-switch></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/3dsurface.html',
    "<div class=surface><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl._layout></angular-plotly></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/windrose.html',
    "<div class=wind-rose style=\"display: inline-block\"><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-show=\"$ctrl.transformedData.length > 0\" ng-style=$ctrl.style class=plotly-chart-wrapper ng-class=\"($ctrl.showLegend) ? 'with-legend' : ' ' \"><div class=plotly-chart-dimension><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl.layout></angular-plotly></div></div><div class=plotly-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.transformedData.length > 0\"><ul ng-repeat=\"entry in $ctrl.plotCustomRanges\" style=\"list-style: none\"><li><span><i class=\"fa fa-square\" style=\"color: {{entry.color}}\"></i> {{entry.lo}} - {{entry.hi}} {{$ctrl.speedUnit}}</span></li></ul></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/heatmap.html',
    "<div class=plotly-dot-graph style=\"display: inline-block\"><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-show=\"$ctrl.transformedData.length > 0\" ng-style=$ctrl.style class=plotly-chart-wrapper ng-class=\"($ctrl.showLegend) ? 'with-legend' : ' ' \"><div class=plotly-chart-dimension><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl._layout></angular-plotly></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/bubbleChart.html',
    "<div class=plotly-dot-graph style=\"display: inline-block\"><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-show=\"$ctrl.transformedData.length > 0\" ng-style=$ctrl.style class=plotly-chart-wrapper ng-class=\"($ctrl.showLegend) ? 'with-legend' : ' ' \"><div class=plotly-chart-dimension><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl._layout></angular-plotly></div></div><div class=plotly-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.transformedData.length > 0\"><ul ng-repeat=\"entry in $ctrl.legendProperties\" style=\"list-style: none\"><li><span><i class=\"fa fa-circle\" style=\"color: {{entry.color}}\"></i> {{entry.name}}</span></li></ul></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/scatter.html',
    "<div class=surface><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl._layout></angular-plotly></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/common/notifications.html',
    "<div class=\"data-notification center\" ng-hide=\"$ctrl.hasData || $ctrl.noResults\"><i class=\"fa fa-spinner fa-spin fa-1x\"></i><div ng-if=!$ctrl.usePopover translate>{{$ctrl.loadingMessage}}</div></div><div class=data-notification ng-if=\"!$ctrl.usePopover && $ctrl.noResults\" ng-class=\"{'center': !$ctrl.stalledData, 'bottom': $ctrl.stalledData}\"><div uib-alert ng-class=\"{'alert-warning': $ctrl.stalledData, 'alert-danger': !$ctrl.stalledData}\"><i class=\"fa fa-exclamation-triangle fa-1x\"></i>{{$ctrl.failureMessage || ('DASHBOARDS.GLOBAL.DEFAULT_FAILURE_MESSAGE') | translate}}</div></div><div class=\"data-notification bottom\" ng-if=\"$ctrl.usePopover && $ctrl.noResults\" ng-class=\"{'danger': ($ctrl.noResults && !$ctrl.stalledData), 'warning': $ctrl.stalledData}\" ng-init=\"$ctrl.popClass = (($ctrl.noResults && !$ctrl.stalledData) ? 'data-notification-popup alert alert-danger' : (($ctrl.stalledData) ? 'data-notification-popup alert alert-warning' : 'data-notification-popup alert alert-info'))\"><div translate uib-popover=\"{{$ctrl.failureMessage || ('DASHBOARDS.GLOBAL.DEFAULT_FAILURE_MESSAGE') | translate}}\" popover-placement=\"auto right\" popover-append-to-body=true popover-class={{$ctrl.popClass}} popover-trigger=\"'outsideClick'\"><i class=\"fa fa-exclamation-triangle fa-1x\"></i></div></div><div ng-if=\"$ctrl.actionMessage && $ctrl.usePopover\" class=\"data-notification action alert\" ng-class=\"{'alert-success': $ctrl.actionSuccess, 'alert-danger':  !$ctrl.actionSuccess}\" ng-init=\"$ctrl.popClass = (($ctrl.noResults && !$ctrl.stalledData) ? 'data-notification-popup alert alert-danger' : (($ctrl.actionSuccess) ? 'data-notification-popup alert alert-success' : 'data-notification-popup alert alert-danger'))\"><div translate uib-popover={{$ctrl.actionMessage}} popover-placement=\"auto top\" popover-append-to-body=true popover-class={{$ctrl.popClass}} popover-trigger=\"'outsideClick'\"><div class=center-icon><i class=\"fa fa-times fa-1x\" ng-if=!$ctrl.actionSuccess></i> <i class=\"fa fa-check fa-1x\" ng-if=$ctrl.actionSuccess></i></div></div></div><div ng-if=\"$ctrl.actionMessage && !$ctrl.usePopover\" class=\"data-notification action\"><div translate uib-alert ng-class=\"{'alert-success': $ctrl.actionSuccess, 'alert-danger':  !$ctrl.actionSuccess}\">{{$ctrl.actionMessage}}</div></div><div class=greyout ng-hide=$ctrl.hasData><img ng-src={{$ctrl.icon}}></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/box.html',
    "<div class=box ng-mouseover=\"$ctrl.showActionBar = true\" ng-mouseout=\"$ctrl.showActionBar = false\" ng-class=\"{'box-without-header' : ($ctrl.widget.options.boxHeader === false || $ctrl.widget.options.boxHeader == 'false' || $ctrl.widget.sizeY == 1) ,  'vertical' : ($ctrl.widget.sizeX == 1)}\"><div class=\"box-header-btns pull-right\" ng-show=\"$ctrl.showActionBar == true\"><a title=\"Configure this widget\" ng-if=$ctrl.widget.form ng-click=$ctrl.openSettings($ctrl.widget)><i class=\"glyphicon glyphicon-cog\"></i> </a><a title=\"Remove this widget\" ng-click=$ctrl.remove($ctrl.widget)><i class=\"glyphicon glyphicon-trash\"></i> </a><a class=drag-box title=\"Drag this widget\" ng-if=\"$ctrl.isMobile== false\"><i class=\"glyphicon glyphicon-move\"></i></a></div><div class=box-header><div class=box-label><span tooltip-append-to-body=true uib-tooltip={{$ctrl.widget.options.boxLabel}}>{{$ctrl.widget.options.boxLabel}}</span></div></div><div class=clearfix></div><div class=box-content></div></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/dashboard.html',
    "<div class=\"board-menu-base clearfix\">\n" +
    "  <!-- begin left side -->\n" +
    "  <div ng-if=\"!$ctrl.isInIde && $ctrl.loadTree\" class=\"left-dashboard col-xs-3 col-sm-2 pdl0 pdr0\">\n" +
    "    <div class=\"devices-models-tree\">\n" +
    "      <scriptr-searchbox \n" +
    "                         transport=\"https\"\n" +
    "                         load-tree = \"$ctrl.loadTree\"\n" +
    "                         icon-expand = \"{{$ctrl.iconExpand || 'fa expand-collapse fa-caret-right'}} \"\n" +
    "                         icon-collapse = \"{{$ctrl.iconCollapse || 'fa expand-collapse fa-caret-right'}}\"\n" +
    "                         tree-search-criteria = \"{{$ctrl.treeSearchCriteria}}\"\n" +
    "                         api='{{$ctrl.devicesModel}}'\n" +
    "                         on-select=\"$ctrl.selectBranch\"\n" +
    "      </scriptr-searchbox>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!-- end left side -->\n" +
    "\n" +
    "  <!-- begin dashboard content -->\n" +
    "  <div class=\"dashboard-content pdr0 pdl0\" ng-class='{\"col-xs-9 col-sm-10\": (!$ctrl.isInIde && $ctrl.loadTree), \"col-xs-12 col-sm-12\": ($ctrl.isInIde || $ctrl.loadTree)}'>\n" +
    "      <!-- begin page header -->\n" +
    "      <div class=\"page-header col-xs-12\" ng-if=\"!$ctrl.isInIde\">\n" +
    "           <div ng-if=\"$ctrl.show\" uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=\"$ctrl.closeAlert()\" dismiss-on-timeout=\"5000\">{{$ctrl.message.content}}</div>\n" +
    "           <form name=\"scriptForm\" ng-submit=\"$ctrl.saveDashboard(scriptForm)\">\n" +
    "            <div class=\"form-group col-xs-12 col-sm-6\">\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-xs-12 col-sm-4\"><a class=\"back-to-panel btn-block btn btn-info\" ng-href=\"#/dashboardsList\"><i class=\"fa fa-arrow-circle-left\"></i> Back to dashboard panel</a></div>   \n" +
    "\n" +
    "                <div class=\"col-xs-12 col-sm-5\"><div ng-if=\"!$ctrl.isInIde\" sf-options=\"$ctrl.frmGlobalOptions\" sf-schema=\"$ctrl.schema\" sf-form=\"$ctrl.form\" sf-model=\"$ctrl.model\" ></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-xs-12 col-sm-2\"><button class=\"btn btn-primary btn-sm btn-block\"  type=\"submit\" ng-if=\"!$ctrl.isInIde\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>\n" +
    "                  </div>\n" +
    "                   <div ng-if=\"$ctrl.savedScript && !$ctrl.isInIde\" class=\"col-xs-12 col-sm-1\">\n" +
    "                      <scriptr-acl \n" +
    "                                   users=\"$ctrl.users\"\n" +
    "                                   default-set-object=\"[{code : 'nobody',icon : 'fa fa-group'}]\"\n" +
    "                                   on-save=\"$ctrl.onACLChange\"       \n" +
    "                                   >\n" +
    "                      </scriptr-acl>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-12 col-sm-6 pull-right\" ng-if=\"!$ctrl.isInIde\">\n" +
    "               <a class=\"pull-right btn btn-sm btn-primary ml5\" ng-if=\"!$ctrl.isInIde\" ng-click=\"$ctrl.logout()\"><i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i> Logout</a>\n" +
    "               <a class=\"pull-right  btn-sm  btn btn-primary ml5\" ng-if=\"!$ctrl.isInIde\" ng-if=\"$ctrl.isEdit\" ng-click=\"$ctrl.viewDasboard()\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> View</a>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "      </div>	\n" +
    "      <!-- end page header -->\n" +
    "      <!-- begin slick wrap -->\n" +
    "    <div class=\"col-xs-12 pdl0 slick-wrap\">\n" +
    "          <!-- begin carousel options -->\n" +
    "          <div>\n" +
    "            <div class=\"dashboard-config col-xs-12 col-sm-2 col-sm-push-10\">\n" +
    "                <a ng-click=\"$ctrl.clear()\" uib-tooltip=\"Clear widgets\" tooltip-placement=\"bottom\"><i class=\"fa fa-eraser\" aria-hidden=\"true\"></i></a>\n" +
    "                <a ng-click=\"$ctrl.setDashboardSettings()\" uib-tooltip=\"Settings\" tooltip-placement=\"bottom\"><i class=\"fa fa-cog\" aria-hidden=\"true\"></i></a>\n" +
    "            </div>\n" +
    "            <div class=\"slick-container col-xs-12 col-sm-10 col-sm-pull-2\">\n" +
    "                <slick \n" +
    "                       settings=\"$ctrl.slickConfig\"\n" +
    "                       infinite=\"true\" \n" +
    "                       slides-to-show=\"$ctrl.widgetsConfig.length\"\n" +
    "                       slides-to-scroll=\"0\"\n" +
    "                       ng-if=\"$ctrl.dataLoaded\" \n" +
    "                       init-onload=\"false\"\n" +
    "                       data=\"$ctrl.dataLoaded\"\n" +
    "                       >\n" +
    "                  <div class=\"slick-item\" ng-repeat=\"item in $ctrl.widgetsConfig\" ng-if=\"item.show != false\">\n" +
    "                     <span >\n" +
    "                         <a ng-click=\"$ctrl.addWidget(item)\"  uib-tooltip=\"{{ item.label }}\" tooltip-placement=\"auto\" tooltip-append-to-body=\"true\">\n" +
    "                           <img ng-if=\"item.imgSrc\" ng-src=\"{{ item.imgSrc }}\" class=\"{{item.imgCls}}\" alt=\"{{ item.label}}\" />\n" +
    "                           <i ng-if=\"item.iconSrc\" class=\"{{ item.iconSrc }}\" aria-hidden=\"true\" alt=\"{{ item.label}}\" /></i>\n" +
    "                           <!--  span class=\"slick-label\">{{ item.label }}</span -->\n" +
    "                         </a>\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                </slick>\n" +
    "             </div>\n" +
    "	        <div class=\"clearfix\"></div>\n" +
    "          </div>\n" +
    "          <!-- end carousel options -->\n" +
    "\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        <!-- begin gridster -->\n" +
    "        <div class=\"dashboardContainer\">\n" +
    "            <div gridster=\"$ctrl.gridsterOptions\">\n" +
    "                <ul>\n" +
    "                    <li gridster-item=\"widget\" ng-repeat=\"widget in $ctrl.dashboard.widgets\" ng-class=\"{'fit-to-widget': (widget.fitToWidget === true)}\">\n" +
    "                      <box widget=\"widget\"></box>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "        	</div>\n" +
    "     	</div>\n" +
    "        <!-- end gridster -->\n" +
    "    </div>\n" +
    "    <!-- end slick wrap -->\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!-- end dashboard content -->\n"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/dashboardsList.html',
    "<div><div class=container><div class=\"col-xs-12 mb20\"><div class=\"box-shadow text-white add-dashboard\"><div class=\"col-xs-12 text-center\"><h5 class=\"box-title text-uppercase\">Add custom dashboard</h5></div>Create and manage visually your dashboard.<div><a class=\"btn btn-primary add-btn\" ng-href=#/newDashboard><i class=\"fa fa-plus-circle\" aria-hidden=true></i> Add</a></div></div></div><div ng-if=$ctrl.showPanelMsg class=col-xs-12><div uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\" close=$ctrl.closeMsg() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div></div><span class=\"col-xs-12 col-sm-4 mb20\" ng-show=$ctrl.noDashboards>No Dashboards created.</span><div class=\"text-center loading\" ng-show=$ctrl.loading><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><div ng-repeat=\"dashboard in $ctrl.customDashboards track by $index\" class=\"col-xs-12 col-sm-4 mb20 custom-dashboard-box\"><div index=\"{{scriptName = dashboard.path}}\" class=\"box-shadow bg-white\"><div class=\"col-xs-12 added-box-title text-left\"><div class=pull-left><h4 onbeforesave=\"$ctrl.renameDashboard(scriptName, $data)\" href=# editable-text=dashboard.path e-form=textBtnForm uib-tooltip={{dashboard.path}} tooltip-placement=bottom>{{dashboard.label}}</h4></div><a title=\"Edit widget\" ng-click=textBtnForm.$show() ng-hide=textBtnForm.$visible><i class=\"edit-name glyphicon glyphicon-pencil\"></i></a><div class=\"pull-right remove-widget\"><a title=\"Remove widget\" ng-click=\"$ctrl.deleteDashboardConfirmation(dashboard.path, dashboard.name)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><a ng-href=#/scriptName/{{scriptName}}><div class=clickable><div class=\"col-xs-12 center-div custom-widget-icon\"><i class=\"fa fa-pie-chart\" aria-hidden=true></i></div><div class=clearfix></div></div></a></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/deletePopup.html',
    "<div class=modal-header><h3 class=modal-title>Delete Dashboard</h3></div><div class=modal-body>Are you sure you want to delete '{{name}}' dashboard?</div><div class=modal-footer><button class=\"btn btn-primary\" type=button ng-click=close()>No</button> <button class=\"btn btn-primary\" type=button ng-click=ondeleteDashboard()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/confirmation.html',
    "<div class=modal-header><h4 class=modal-title>{{ $ctrl.data.title }}</h4></div><div class=modal-body>{{ $ctrl.data.body }}</div><div class=modal-footer><button type=reset class=\"btn btn-default\" ng-click=$ctrl.onCancel()>No</button> <button type=submit ng-click=$ctrl.onSubmit() class=\"btn btn-primary\">Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/myModalContent.html',
    "<div class=modal-header><h4 class=modal-title id=modal-title>{{$ctrl.widget.label}}</h4></div><form name=myForm ng-submit=$ctrl.onSubmit(myForm)><div class=modal-body><div html-class=bls sf-options=$ctrl.frmGlobalOptions sf-schema=$ctrl.schema sf-form=$ctrl.form sf-model=$ctrl.model></div></div><div class=modal-footer><button type=reset class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Cancel</button> <button type=submit class=\"btn btn-primary\">Save</button></div></form>"
  );


  $templateCache.put('/UIComponents/layout/frontend/components/header/header.html',
    "<header><div class={{$ctrl.class}}><div class=\"logo pull-left\"><img src={{$ctrl.logo}} class=img-responsive></div><div class=\"pull-left appname\">{{$ctrl.appname}}</div><div class=pull-right><div class=\"header-items pull-left\"><div ng-repeat=\"item in $ctrl.items track by $index\" class=pull-left ng-if=\"$ctrl.inGroup(item.roles) || !item.roles\"><a ng-click=$ctrl.onItemClick(item) route={{item.route}} index=\"{{colIndex = $index}}\" ng-click=$ctrl.addSelectedClass(colIndex) ng-class=\"{'selected': item.route == $ctrl.currentRoute}\" href={{item.route}} ng-if=\"!item.subitems || item.subitems.length == 0\"><i class={{item.icon}} aria-hidden=true></i> {{item.label}}</a><div class=\"btn-group dropdownContainer\" uib-dropdown ng-if=\"item.subitems && item.subitems.length > 0\"><button type=button class=menuContent uib-dropdown-toggle ng-disabled=disabled ng-class=\"{'selected': $ctrl.checkIfSelected(item.subitems)}\"><i class={{item.icon}} aria-hidden=true></i> {{item.label}}</button><ul class=\"subMenu dropdown-menu dropdown-menu-left\" uib-dropdown-menu role=menu aria-labelledby=single-button><li ng-if=\"$ctrl.inGroup(subitem.roles) || !subitem.roles\" role=menuitem ng-repeat=\"subitem in item.subitems track by $index\"><a href={{subitem.route}} ng-class=\"{'selected': $ctrl.checkIfSelected([subitem]) }\"><i class={{subitem.icon}} aria-hidden=true></i>{{subitem.label}}</a></li></ul></div></div></div><div class=\"pull-left username\"><div class=btn-group><button id=username-button type=button class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=disabled><i ng-show=\"$ctrl.user != null\" class=\"fa fa-user-circle\"></i> {{$ctrl.user.login || $ctrl.caretlabel }} <span class=caret></span></button><ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=menu aria-labelledby=single-button><li ng-if=\"$ctrl.inGroup(item.roles) || !item.roles\" role=menuitem ng-repeat=\"item in $ctrl.subitems track by $index\"><a href={{item.route}} ng-class=\"{'selected': $ctrl.checkIfSelected([item])}\"><i class={{item.icon}} aria-hidden=true></i> {{item.label}}</a></li><li ng-show=\"$ctrl.logout && $ctrl.subitems.length > 0\" class=divider></li><li ng-show=$ctrl.logout role=menuitem><a href={{$ctrl.logout.route}}><i class={{$ctrl.logout.icon}} aria-hidden=true></i> {{$ctrl.logout.label || \"Logout\"}}</a></li></ul></div></div></div></div></header>"
  );


  $templateCache.put('/UIComponents/layout/frontend/components/menu/menu.html',
    "<div><div id=\"{{colIndex = $index}}\" ng-class=\"{'side-bar sm level-bg-{{$index}}' : col.class == 'sm', 'side-bar md level-bg-{{$index}}' : col.class == 'md'}\" ng-repeat=\"col in $ctrl.cols track by $index\"><ul class=\"nav nav-pills\" ng-if=$ctrl.currentRoute><li class=menu-entry ng-if=\"col.class == 'sm' && ($ctrl.inGroup(item.roles) || !item.roles)\" tooltip-placement=right-top tooltip-append-to-body=true uib-tooltip={{item.label}} index=\"{{liIndex = $index}}\" ng-repeat=\"item in $ctrl.menuItems[col.key] track by $index\" ng-class=\"(item.route == $ctrl.currentRoute) ? 'active' : ''\"><a ng-if=item.route ng-href={{item.route}}/{{$ctrl.lockId.value}} ng-click=\"$ctrl.route(item, $event, col.key, colIndex, liIndex)\"><i aria-hidden=true class={{item.iconClass}}></i><strong>{{item.label}}</strong> <i ng-show=item.sub aria-hidden=true class=\"fa fa-angle-right sub-menu-indicator\"></i> </a><a ng-if=!item.route ng-click=\"$ctrl.route(item, $event, col.key, colIndex, liIndex)\"><i aria-hidden=true class={{item.iconClass}}></i><strong>{{item.label}}</strong> <i ng-show=item.sub aria-hidden=true class=\"fa fa-angle-right sub-menu-indicator\"></i></a></li><li class=menu-entry ng-if=\"col.class == 'md' && ($ctrl.inGroup(item.roles) || !item.roles)\" index=\"{{liIndex = $index}}\" ng-repeat=\"item in $ctrl.menuItems[col.key] track by $index\" class=tool-tip ng-class=\"(item.route == $ctrl.currentRoute) ? 'active' : ''\"><a ng-if=item.route ng-href={{item.route}}/{{$ctrl.lockId.value}} ng-click=\"$ctrl.route(item, $event, col.key, colIndex, liIndex)\" title={{item.label}}><i aria-hidden=true class={{item.iconClass}}></i><strong>{{item.label}}</strong> <i ng-show=item.sub aria-hidden=true class=\"fa fa-angle-right sub-menu-indicator\"></i> </a><a ng-if=!item.route ng-click=\"$ctrl.route(item, $event, col.key, colIndex, liIndex)\" title={{item.label}}><i aria-hidden=true class={{item.iconClass}}></i><strong>{{item.label}}</strong> <i ng-show=item.sub aria-hidden=true class=\"fa fa-angle-right sub-menu-indicator\"></i></a></li></ul></div></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboard.html',
    "<dashboard load-tree=false tree-search-criteria=model.Car devices-model=modules/devicemodels/api/getSensors></dashboard>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardTemplate.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "	&lt;meta charset=&quot;UTF-8&quot;&gt;\n" +
    "    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,user-scalable=no&quot;&gt;\n" +
    "    &lt;link rel=&quot;shortcut icon&quot; type=&quot;image/x-icon&quot; href=&quot;https://www.scriptr.io/themes/scriptr/images/favicon.ico&quot;&gt;\n" +
    "    &lt;title&gt;Dashboard Builder&lt;/title&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;link href=&quot;//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&quot; rel=&quot;stylesheet&quot;&gt;\n" +
    "  \n" +
    "      &lt;!-- CSS --&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/css/components.min.css&quot;/&gt;\n" +
    "    \n" +
    "    &lt;link name=&quot;light&quot; rel=&quot;stylesheet&quot; href=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/css/light.min.css&quot;&gt; \n" +
    "    &lt;link name=&quot;dark&quot; disabled=&quot;true&quot; rel=&quot;stylesheet&quot; href=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/css/dark.min.css&quot;&gt; &lt;!-- this the default theme --&gt;\n" +
    "      \n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/external_libraries1.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/external_libraries2.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    \n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;!-- NG material --&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.1/ng-tags-input.min.js&quot;&gt;&lt;/script&gt;  \n" +
    "      \n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/templates.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "	&lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;!-- Directives --&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/directives_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/directives_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;!-- Libraries --&gt;\n" +
    "    &lt;script src=&quot;//cdn.plot.ly/plotly-latest.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/dashboard_builder_constants.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;!-- Components --&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/components.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//scriptr-cdn.s3.amazonaws.com/creatr/dist/javascript/editor.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;/UIComponents/config/scriptrTransport.js&quot;&gt;&lt;/script&gt;\n" +
    "            \n" +
    "\n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "  \n" +
    "&lt;style&gt;\n" +
    "  {{compiledCss}}\n" +
    "&lt;/style&gt;\n" +
    "&lt;style&gt;\n" +
    "  {{dashboardSettings.inline-style}}\n" +
    "&lt;/style&gt;\n" +
    "\n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {\n" +
    "	\n" +
    "  if(&quot;{{{dashboardSettings.requiresLogin}}}&quot; == &quot;Yes&quot;){\n" +
    "  \n" +
    "   var scriptName = window.location.pathname.substring(1,window.location.pathname.length )\n" +
    "   var loginTemplateTarget =&quot;/UIComponents/dashboardBuilder/loginTemplate.html?redirectTarget=&quot;+scriptName+&quot;&amp;anon_token={{{anon_token}}}&quot;\n" +
    "\n" +
    "    var authorization  = $.scriptr.authorization(\n" +
    "        {\n" +
    "          onTokenValid: function(){ }, \n" +
    "          loginPage: loginTemplateTarget\n" +
    "        }\n" +
    "      );\n" +
    "    }\n" +
    "  \n" +
    "  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "    \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{dashboardSettings.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{dashboardSettings.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer', 'Display', &quot;ngAnimate&quot;, &quot;ngSanitize&quot;, 'Dygraphs', 'DataService', 'Plotly', 'Alert'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "     \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location, dataService, $interval) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          defaultSizeY: 50,\n" +
    "          defaultSizeX:50,\n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 10, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1, // the minimum columns the grid must have\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "          \n" +
    "          {{#if dashboardSettings.transport}}\n" +
    "          		   vm.refreshTimer = null;\n" +
    "          		   vm.data = null;\n" +
    "                   vm.dashboardSettings = {\n" +
    "                        {{#if dashboardSettings.api}}    &quot;api&quot;: &quot;{{dashboardSettings.api}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.transport}}    &quot;transport&quot;: &quot;{{dashboardSettings.transport}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.msg-tag}}    &quot;msgTag&quot;: &quot;{{dashboardSettings.msg-tag}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.api-params}}    &quot;apiParams&quot;: &quot;{{dashboardSettings.api-params}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.use-window-params}}    &quot;useWindowParams&quot;: &quot;{{dashboardSettings.use-window-params}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.http-method}}    &quot;httpMethod&quot;: &quot;{{dashboardSettings.http-method}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.fetch-data-interval}}&quot;fetchDataInterval&quot;: &quot;{{dashboardSettings.fetch-data-interval}}&quot;, {{/if}}\n" +
    "                        &quot;widgetId&quot;: $scope.$id\n" +
    "                        \n" +
    "                    };\n" +
    "                    \n" +
    "                    \n" +
    "                    vm.initDashboardDataService();\n" +
    "                    \n" +
    "                    \n" +
    "                    $scope.$on(&quot;waiting-for-data&quot;, function() {\n" +
    "                      	vm.consumeData(vm.data)\n" +
    "                    })\n" +
    "           {{/if}}\n" +
    "        }\n" +
    "        \n" +
    "        {{#if dashboardSettings.transport}}\n" +
    "            vm.initDashboardDataService =  function() {\n" +
    "\n" +
    "                        var requestInfo = {\n" +
    "                                &quot;api&quot;: vm.dashboardSettings.api,\n" +
    "                                &quot;transport&quot;: vm.dashboardSettings.transport,\n" +
    "                                &quot;msgTag&quot;: vm.dashboardSettings.msgTag,\n" +
    "                                &quot;apiParams&quot;: vm.dashboardSettings.apiParams,\n" +
    "                                &quot;useWindowParams&quot;: vm.dashboardSettings.useWindowParams,\n" +
    "                                &quot;httpMethod&quot;: vm.dashboardSettings.httpMethod,\n" +
    "                                &quot;widgetId&quot;: vm.dashboardSettings.widgetId\n" +
    "                           };\n" +
    "                           dataService.scriptrRequest(requestInfo, vm.consumeData.bind(vm));\n" +
    "\n" +
    "                          if(vm.dashboardSettings[&quot;fetchDataInterval&quot;] != null &amp;&amp; vm.refreshTimer == null) {\n" +
    "                              //Assuming this is success\n" +
    "                              self.refreshTimer = $interval(\n" +
    "                                  function(){\n" +
    "                                     vm.initDashboardDataService()\n" +
    "                                  }, vm.dashboardSettings[&quot;fetchDataInterval&quot;]  * 1000);\n" +
    "                          }\n" +
    "\n" +
    "            }\n" +
    "            \n" +
    "             vm.consumeData = function(data, response) {\n" +
    "                vm.data = data;\n" +
    "                $scope.$broadcast(&quot;update-data&quot;, data);\n" +
    "            }\n" +
    "        \n" +
    "         {{/if}}\n" +
    "        \n" +
    "        \n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{{this.formatFunctionValue}}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "        \n" +
    "        /**{{#each items}}\n" +
    "           	{{#if this.functions}}   \n" +
    "            	{{#each this.functions}}\n" +
    "                    vm.{{this.name}} = function(arguments){\n" +
    "                      {{{this.value}}}\n" +
    "                    }\n" +
    "                 {{/each}}\n" +
    "           	{{/if}} \n" +
    "        {{/each}}**/\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "   &lt;body class=&quot;dashboard-template dashboardTheme &quot;&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot; class=&quot;dashboardContainer&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem {{#if_eq  fitToWidget true}} fit-to-widget {{/if_eq}}&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    \n" +
    "						&lt;div class=&quot;box {{#if_eq  this.options.boxHeader &quot;false&quot;}} box-without-header {{/if_eq}} {{#if_eq  this.options.boxHeader false}} box-without-header {{/if_eq}}&quot;&gt;\n" +
    "						  &lt;div class=&quot;box-header&quot;&gt;\n" +
    "						    &lt;div class=&quot;box-label&quot;&gt;&lt;span tooltip-append-to-body=&quot;true&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot;&gt;{{this.options.boxLabel}}&lt;/span&gt;&lt;/div&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "                          &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;\n" +
    "						  &lt;div class=&quot;box-content&quot;&gt;\n" +
    "						  		&lt;{{type}}\n" +
    "                                    {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                    {{/buildAttr}}\n" +
    "                                    {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                    {{/if}} \n" +
    "                           		&gt;\n" +
    "                                \n" +
    "                                {{#if this.functions}}   \n" +
    "                                       {{#each this.functions}}\n" +
    "                                  			{{this.attribute}}='vm.{{this.name}}'\n" +
    "                                        {{/each}}\n" +
    "                                    {{/if}} \n" +
    "                                   \n" +
    " \n" +
    " \n" +
    "          \n" +
    " 					{{#if this.options.default-info-window}}\n" +
    "                                &lt;info-window id=&quot;{{this.options.default-info-window.id}}&quot; template=&quot;{{this.options.default-info-window.template}}&quot; max-width=&quot;{{this.options.default-info-window.max-width}}&quot; max-height=&quot;{{this.options.default-info-window.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                    {{/if}}\n" +
    "                    \n" +
    "       			{{#if this.options.source-info-window}}\n" +
    "                    	{{#each this.options.source-info-window}}\n" +
    "                        		 &lt;info-window id=&quot;infoWindowTemplate_{{this.source}}&quot; template=&quot;{{this.template}}&quot; max-width=&quot;{{this.max-width}}&quot; max-height=&quot;{{this.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                        {{/each}}\n" +
    "                    {{/if}}\n" +
    "                                &lt;/{{type}}&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "						&lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/ide/dashboardTemplate_ide.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "	&lt;meta charset=&quot;UTF-8&quot;&gt;\n" +
    "    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,user-scalable=no&quot;&gt;\n" +
    "    &lt;link rel=&quot;shortcut icon&quot; type=&quot;image/x-icon&quot; href=&quot;https://www.scriptr.io/themes/scriptr/images/favicon.ico&quot;&gt;\n" +
    "    &lt;title&gt;Dashboard Builder&lt;/title&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;link href=&quot;//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&quot; rel=&quot;stylesheet&quot;&gt;\n" +
    "  \n" +
    "    &lt;!-- CSS --&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;/UIComponents/build/css/UIComponents/components.min.css&quot;/&gt;\n" +
    "    \n" +
    "    \n" +
    "     &lt;!-- Theme --&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/dashboardBuilder/css/{{dashboardSettings.theme}}.css&quot;&gt;\n" +
    "    \n" +
    "    \n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/external_libraries1.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/external_libraries2.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    \n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "   \n" +
    "    &lt;!-- NG material --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "    &lt;!-- Directives --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/directives_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/directives_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;!-- Libraries --&gt;\n" +
    "    &lt;script src=&quot;//cdn.plot.ly/plotly-latest.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Components --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/UIComponents/components.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    \n" +
    "    &lt;script src=&quot;/UIComponents/dashboardBuilder/javascript/config/config.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;/UIComponents/config/scriptrTransport.js&quot;&gt;&lt;/script&gt;\n" +
    "            \n" +
    "\n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "  \n" +
    "&lt;style&gt;\n" +
    "  {{compiledCss}}\n" +
    "&lt;/style&gt;\n" +
    "&lt;style&gt;\n" +
    "  {{dashboardSettings.inline-style}}\n" +
    "&lt;/style&gt;\n" +
    "\n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "    \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{dashboardSettings.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{dashboardSettings.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer', 'Display', &quot;ngAnimate&quot;, &quot;ngSanitize&quot;, 'Dygraphs', 'DataService', 'Plotly', 'Alert'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "     \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location, dataService, $interval) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          defaultSizeY: 50,\n" +
    "          defaultSizeX:50,\n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 10, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1, // the minimum columns the grid must have\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "          \n" +
    "          {{#if dashboardSettings.transport}}\n" +
    "          		   vm.refreshTimer = null;\n" +
    "          		   vm.data = null;\n" +
    "                   vm.dashboardSettings = {\n" +
    "                        {{#if dashboardSettings.api}}    &quot;api&quot;: &quot;{{dashboardSettings.api}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.transport}}    &quot;transport&quot;: &quot;{{dashboardSettings.transport}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.msg-tag}}    &quot;msgTag&quot;: &quot;{{dashboardSettings.msg-tag}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.api-params}}    &quot;apiParams&quot;: &quot;{{dashboardSettings.api-params}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.use-window-params}}    &quot;useWindowParams&quot;: &quot;{{dashboardSettings.use-window-params}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.http-method}}    &quot;httpMethod&quot;: &quot;{{dashboardSettings.http-method}}&quot;, {{/if}}\n" +
    "                        {{#if dashboardSettings.fetch-data-interval}}&quot;fetchDataInterval&quot;: &quot;{{dashboardSettings.fetch-data-interval}}&quot;, {{/if}}\n" +
    "                        &quot;widgetId&quot;: $scope.$id\n" +
    "                        \n" +
    "                    };\n" +
    "                    \n" +
    "                    \n" +
    "                    vm.initDashboardDataService();\n" +
    "                    \n" +
    "                    \n" +
    "                    $scope.$on(&quot;waiting-for-data&quot;, function() {\n" +
    "                      	vm.consumeData(vm.data)\n" +
    "                    })\n" +
    "           {{/if}}\n" +
    "        }\n" +
    "        \n" +
    "        {{#if dashboardSettings.transport}}\n" +
    "            vm.initDashboardDataService =  function() {\n" +
    "\n" +
    "                        var requestInfo = {\n" +
    "                                &quot;api&quot;: vm.dashboardSettings.api,\n" +
    "                                &quot;transport&quot;: vm.dashboardSettings.transport,\n" +
    "                                &quot;msgTag&quot;: vm.dashboardSettings.msgTag,\n" +
    "                                &quot;apiParams&quot;: vm.dashboardSettings.apiParams,\n" +
    "                                &quot;useWindowParams&quot;: vm.dashboardSettings.useWindowParams,\n" +
    "                                &quot;httpMethod&quot;: vm.dashboardSettings.httpMethod,\n" +
    "                                &quot;widgetId&quot;: vm.dashboardSettings.widgetId\n" +
    "                           };\n" +
    "                           dataService.scriptrRequest(requestInfo, vm.consumeData.bind(vm));\n" +
    "\n" +
    "                          if(vm.dashboardSettings[&quot;fetchDataInterval&quot;] != null &amp;&amp; vm.refreshTimer == null) {\n" +
    "                              //Assuming this is success\n" +
    "                              self.refreshTimer = $interval(\n" +
    "                                  function(){\n" +
    "                                     vm.initDashboardDataService()\n" +
    "                                  }, vm.dashboardSettings[&quot;fetchDataInterval&quot;]  * 1000);\n" +
    "                          }\n" +
    "\n" +
    "            }\n" +
    "            \n" +
    "             vm.consumeData = function(data, response) {\n" +
    "                vm.data = data;\n" +
    "                $scope.$broadcast(&quot;update-data&quot;, data);\n" +
    "            }\n" +
    "        \n" +
    "         {{/if}}\n" +
    "        \n" +
    "        \n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{{this.formatFunctionValue}}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "        \n" +
    "        /**{{#each items}}\n" +
    "           	{{#if this.functions}}   \n" +
    "            	{{#each this.functions}}\n" +
    "                    vm.{{this.name}} = function(arguments){\n" +
    "                      {{{this.value}}}\n" +
    "                    }\n" +
    "                 {{/each}}\n" +
    "           	{{/if}} \n" +
    "        {{/each}}**/\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "   &lt;body class=&quot;dashboard-template dashboardTheme &quot;&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot; class=&quot;dashboardContainer&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem {{#if_eq  fitToWidget true}} fit-to-widget {{/if_eq}}&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    \n" +
    "						&lt;div class=&quot;box {{#if_eq  this.options.boxHeader &quot;false&quot;}} box-without-header {{/if_eq}} {{#if_eq  this.options.boxHeader false}} box-without-header {{/if_eq}}&quot;&gt;\n" +
    "						  &lt;div class=&quot;box-header&quot;&gt;\n" +
    "						    &lt;div class=&quot;box-label&quot;&gt;&lt;span tooltip-append-to-body=&quot;true&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot;&gt;{{this.options.boxLabel}}&lt;/span&gt;&lt;/div&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "                          &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;\n" +
    "						  &lt;div class=&quot;box-content&quot;&gt;\n" +
    "						  		&lt;{{type}}\n" +
    "                                    {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                    {{/buildAttr}}\n" +
    "                                    {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                    {{/if}} \n" +
    "                           		&gt;\n" +
    "                                \n" +
    "                                {{#if this.functions}}   \n" +
    "                                       {{#each this.functions}}\n" +
    "                                  			{{this.attribute}}='vm.{{this.name}}'\n" +
    "                                        {{/each}}\n" +
    "                                    {{/if}} \n" +
    "                                   \n" +
    " \n" +
    " \n" +
    "          \n" +
    " 					{{#if this.options.default-info-window}}\n" +
    "                                &lt;info-window id=&quot;{{this.options.default-info-window.id}}&quot; template=&quot;{{this.options.default-info-window.template}}&quot; max-width=&quot;{{this.options.default-info-window.max-width}}&quot; max-height=&quot;{{this.options.default-info-window.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                    {{/if}}\n" +
    "                    \n" +
    "       			{{#if this.options.source-info-window}}\n" +
    "                    	{{#each this.options.source-info-window}}\n" +
    "                        		 &lt;info-window id=&quot;infoWindowTemplate_{{this.source}}&quot; template=&quot;{{this.template}}&quot; max-width=&quot;{{this.max-width}}&quot; max-height=&quot;{{this.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                        {{/each}}\n" +
    "                    {{/if}}\n" +
    "                                &lt;/{{type}}&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "						&lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/css/customStyleTemplate.css',
    "<script type=text/x-handlebars-template id=handlebar-customcss-template>.dashboardTheme .dashboardContainer {\n" +
    "      {{#if_eq style.dashboard.background-type \"solid\"}}\n" +
    "      	background-color: {{style.dashboard.background-color}};\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.dashboard.background-type \"gradient\"}}\n" +
    "      	background-image: {{style.dashboard.background-gradient}};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "    	{{#if_eq style.dashboard.background-type \"image\"}}\n" +
    "      	background-image: url(\"{{style.dashboard.background-image}}\");\n" +
    "        background-position-x: {{style.dashboard.background-position-x}};\n" +
    "        background-position-y: {{style.dashboard.background-position-y}};\n" +
    "        background-repeat: {{style.dashboard.background-repeat}};\n" +
    "        background-size: {{style.dashboard.background-size}};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "       {{#if_eq style.dashboard.border true}}\n" +
    "      		border: {{style.dashboard.border-width}}px {{style.dashboard.border-style}} {{style.dashboard.border-color}} ;\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.dashboard.border false}}\n" +
    "      		border: none;\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "      {{#if style.dashboard.border-radius}}\n" +
    "    		border-radius: {{style.dashboard.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "    \n" +
    "      {{#if_eq style.dashboard.box-shadow \"true\"}}\n" +
    "    	box-shadow: 2px 2px 12px 0px {{ style.dashboard.box-shadow-color }};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "       {{#if_eq style.dashboard.box-shadow \"false\"}}\n" +
    "      		box-shadow: none;\n" +
    "      {{/if_eq}}\n" +
    "}\n" +
    "\n" +
    ".dashboardTheme .box {\n" +
    "      {{#if_eq style.box.background-type \"solid\"}}\n" +
    "      	background-color: {{style.box.background-color}};\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box.background-type \"gradient\"}}\n" +
    "      	background-image: {{style.box.background-gradient}};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "       {{#if_eq style.box.border true}}\n" +
    "      		border: {{style.box.border-width}}px {{style.box.border-style}} {{style.box.border-color}} ;\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box.border false}}\n" +
    "      		border: none;\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "      {{#if style.box.border-radius}}\n" +
    "    		border-radius: {{style.box.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "    \n" +
    "      {{#if_eq style.box.box-shadow \"true\"}}\n" +
    "    	box-shadow: 2px 2px 12px 0px {{ style.box.box-shadow-color }};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "       {{#if_eq style.box.box-shadow \"false\"}}\n" +
    "      		box-shadow: none;\n" +
    "      {{/if_eq}}\n" +
    "}\n" +
    "\n" +
    "\n" +
    ".dashboardTheme .box .box-content {\n" +
    "      {{#if_eq style.box-content.background-type \"solid\"}}\n" +
    "      	background-color: {{style.box-content.background-color}};\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box-content.background-type \"gradient\"}}\n" +
    "      	background-image: {{style.box-content.background-gradient}};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "      {{#if_eq style.box-content.border true}}\n" +
    "      		border: {{style.box-content.border-width}}px {{style.box-content.border-style}} {{style.box-content.border-color}} ;\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box-content.border false}}\n" +
    "      		border: none;\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "      {{#if style.box.border-radius}}\n" +
    "    	border-bottom-left-radius: {{style.box.border-radius}}px;\n" +
    "    	border-bottom-right-radius: {{style.box.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "    \n" +
    "      {{#if style.box-content.border-radius}}\n" +
    "    		border-radius: {{style.box-content.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "}  \n" +
    "\n" +
    ".dashboardTheme .box .box-header {\n" +
    "    \n" +
    "     {{#if_eq style.box-header.background-type \"solid\"}}\n" +
    "      	background-color: {{style.box-header.background-color}};\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box-header.background-type \"gradient\"}}\n" +
    "      	background-image: {{style.box-header.background-gradient}};\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "    \n" +
    "      {{#if_eq style.box-header.border true}}\n" +
    "      		border: {{style.box-header.border-width}}px {{style.box-header.border-style}} {{style.box-header.border-color}} ;\n" +
    "      {{/if_eq}}\n" +
    "      {{#if_eq style.box-header.border false}}\n" +
    "      		border: none;\n" +
    "      {{/if_eq}}\n" +
    "    \n" +
    "      {{#if style.box.border-radius}}\n" +
    "    	border-top-left-radius: {{style.box.border-radius}}px;\n" +
    "    	border-top-right-radius: {{style.box.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "    \n" +
    "      {{#if style.box-header.border-radius}}\n" +
    "    		border-radius: {{style.box-header.border-radius}}px;\n" +
    "      {{/if}}\n" +
    "}  \n" +
    "\n" +
    ".dashboardTheme .box .box-header .box-label {\n" +
    "    \n" +
    "      {{#if style.box-label.display}}\n" +
    "      	display: {{style.box-label.display}};\n" +
    "      {{/if}}\n" +
    "      {{#if style.box-label.color}}\n" +
    "      	color: {{style.box-label.color}};\n" +
    "      {{/if}}\n" +
    "      {{#if style.box-label.font-size}}\n" +
    "    	font-size: {{style.box-label.font-size}}px;\n" +
    "      {{/if}}\n" +
    "      {{#if style.box-label.font-weight}}\n" +
    "    	font-weight: {{style.box-label.font-weight}};\n" +
    "      {{/if}}\n" +
    "      {{#if style.box-label.text-align}}\n" +
    "    	text-align: {{style.box-label.text-align}};\n" +
    "      {{/if}}\n" +
    "    \n" +
    "}</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardsList.html',
    "<dashboards-list></dashboards-list>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/lib/schemaForm/nwp-file.html',
    "<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}} file-upload mb-lg\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }\" ng-schema-file ng-if=!form.simpleImageUpload ng-model=$$value$$ sf-changed=form schema-validate=form><label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{'sr-only': !showTitle()}\" for={{form.key.slice(-1)[0]}}>{{form.title | translate}}</label><div class=\"row mb\" ng-if=\"$$value$$ && $$value$$.length > 0\"><div class=\"col-sm-5 mb-sm\"><label title=\"{{ form.i18n.preview? form.i18n.preview : ('modules.upload.field.preview' | translate)}}\" class=text-info>{{ form.i18n.preview? (form.i18n.preview | translate) : ('modules.upload.field.preview' | translate)}}</label></div><div class=\"col-sm-5 mb-sm\"><label title=\"{{ form.i18n.filename ? form.i18n.filename : ('modules.upload.field.filename' | translate)  }}\" class=text-info>{{ form.i18n.filename ? (form.i18n.filename | translate) : ('modules.upload.field.filename' | translate)}}</label></div><div class=\"col-sm-2 mb-sm\"></div></div><div ng-if=files ng-repeat=\"file in files\"><div class=\"row mb\"><div class=\"col-sm-5 mb-sm\"><img ngf-src=file class=\"img-thumbnail img-responsive\"><div class=img-placeholder ng-class=\"{'show': isEmptyObject(file) || (file.$invalid && !file.$ngfBlobUrl), 'hide': !file || file.$ngfBlobUrl}\">{{ form.i18n.preview? (form.i18n.nopreview | translate) : ('modules.upload.field.nopreview' | translate)}}</div></div><div class=\"col-sm-5 mb-sm\"><div class=filename title=\"{{ file.name }}\">{{ file.name }}</div></div><div class=\"col-sm-2 mb-sm\"><div class=remove-file><a ng-click=removeFile(file) uib-tooltip=Remove tooltip-placement=auto tooltip-append-to-body=true><i class=\"fa fa-times\" aria-hidden=true></i></a></div></div></div></div><div class=\"well well-sm bg-white mb\" ng-class=\"{'has-error border-danger': (hasError() && errorMessage(schemaError()))}\"><small class=text-muted ng-show=form.description ng-bind-html=form.description></small><div ng-if=\"form.schema.format == 'singlefile'\" ng-include=\"'singleFileUpload.html'\"></div><div ng-if=\"form.schema.format == 'multifile'\" ng-include=\"'multiFileUpload.html'\"></div><span ng-if=\"hasError() || hasSuccess()\" class=sr-only>{{ hasSuccess() ? '(success)' : '(error)' }}</span><div class=help-block sf-message=\"form.description | translate\" ng-if=\"!invalidFiles || invalidFiles.length <= 0\"></div><div ng-messages=invalidFile.$errorMessages ng-messages-multiple ng-repeat=\"invalidFile in invalidFiles\"><div class=\"text-danger errorMsg\" ng-message=maxSize>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong>. ({{ form.schema[invalidFile.$error].validationMessage2 | translate:invalidFile }} <strong>{{invalidFile.size / 1000000|number:1}}MB</strong>)</div><div class=\"text-danger errorMsg\" ng-message=pattern>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-message=maxItems>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile}} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-message=minItems>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-show=errorMsg>{{errorMsg}}</div></div></div></div><script type=text/ng-template id=singleFileUpload.html><div ngf-drop ngf-select ngf-change=\"selectFile($files, $invalidFiles)\" type=\"file\" ngf-multiple=\"false\" ngf-pattern=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-accept=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-max-size=\"{{form.schema.maxSize && form.schema.maxSize.maximum ? form.schema.maxSize.maximum : undefined }}\" ng-required=\"form.required\" accept=\"{{form.schema.pattern && form.schema.pattern.mimeType}}\" ng-model-options=\"form.ngModelOptions\" ngf-drag-over-class=\"dragover\" class=\"drop-box dragAndDropDescription\">\n" +
    "        <p class=\"text-center\" >{{form.i18n.dragorclick ? (form.i18n.dragorclick | translate):('modules.upload.descriptionSinglefile' | translate)}}</p>\n" +
    "    </div>\n" +
    "    <div ngf-no-file-drop>{{ 'modules.upload.dndNotSupported' | translate}}</div>\n" +
    "    <button ngf-select ngf-change=\"selectFile($files, $invalidFiles)\" ngf-multiple=\"false\" ngf-pattern=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-accept=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-max-size=\"{{form.schema.maxSize && form.schema.maxSize.maximum ? form.schema.maxSize.maximum : undefined }}\" ng-required=\"form.required\" accept=\"{{form.schema.pattern && form.schema.pattern.mimeType}}\" ng-model-options=\"form.ngModelOptions\" class=\"btn btn-primary btn-block {{form.htmlClass}} mt-lg mb\">\n" +
    "        <fa fw=\"fw\" name=\"upload\" class=\"mr-sm\"></fa>\n" +
    "        {{form.i18n.add ? (form.i18n.add | translate ) : ('buttons.add' | translate)}}\n" +
    "    </button></script><script type=text/ng-template id=multiFileUpload.html><div ngf-drop ngf-select ngf-change=\"selectFile($files, $invalidFiles)\" type=\"file\" ngf-multiple=\"form.schema.format == 'multifile'\" ngf-pattern=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-accept=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-max-size=\"{{form.schema.maxSize && form.schema.maxSize.maximum ? form.schema.maxSize.maximum : undefined }}\" ng-required=\"form.required\" accept=\"{{form.schema.pattern && form.schema.pattern.mimeType}}\" ng-model-options=\"form.ngModelOptions\" ngf-drag-over-class=\"dragover\" class=\"drop-box dragAndDropDescription\">\n" +
    "        <p class=\"text-center\">{{form.i18n.dragorclick ? (form.i18n.dragorclick | translate):('modules.upload.descriptionMultifile' | translate)}}</p>\n" +
    "    </div>\n" +
    "    <div ngf-no-file-drop>{{ 'modules.upload.dndNotSupported' | translate}}</div>\n" +
    "    <button ngf-select ngf-change=\"selectFile($files, $invalidFiles)\" ngf-multiple=\"form.schema.format == 'multifile'\" multiple  accept=\"{{form.schema.pattern && form.schema.pattern.mimeType}}\" ngf-pattern=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-accept=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-max-size=\"{{form.schema.maxSize && form.schema.maxSize.maximum ? form.schema.maxSize.maximum : undefined }}\" ng-required=\"form.required\" ng-model-options=\"form.ngModelOptions\" class=\"btn btn-primary btn-block {{form.htmlClass}} mt-lg mb\">\n" +
    "        <fa fw=\"fw\" name=\"upload\" class=\"mr-sm\"></fa>\n" +
    "        {{form.i18n.add ? (form.i18n.add | translate) : ('buttons.add' | translate)}}\n" +
    "    </button></script><div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}} simple-image-upload mb-lg\" ng-class=\"{'has-error border-danger': form.disableErrorState !== true && hasError() && errorMessage(schemaError()), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }\" ng-schema-file ng-if=form.simpleImageUpload ng-model=$$value$$ sf-changed=form schema-validate=form><label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{'sr-only': !showTitle()}\" for={{form.key.slice(-1)[0]}}>{{form.title | translate}}</label><div class=upload-section><div ngf-drop ngf-select ngf-change=\"selectFile($files, $invalidFiles)\" type=file ngf-multiple=\"form.schema.format == 'multifile'\" ngf-pattern=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-accept=\"'{{form.schema.pattern && form.schema.pattern.mimeType ? form.schema.pattern.mimeType : undefined }}'\" ngf-max-size=\"{{form.schema.maxSize && form.schema.maxSize.maximum ? form.schema.maxSize.maximum : undefined }}\" ng-required=form.required accept=\"{{form.schema.pattern && form.schema.pattern.mimeType}}\" ng-model-options=form.ngModelOptions ngf-drag-over-class=dragover class=\"drop-box dragAndDropDescription\"><div class=\"default-image fas\" ng-if=\"!$$value$$ || $$value$$.length == 0\"><img ng-if=form.schema.default ng-src={{form.schema.default}}> <i ng-if=!form.schema.default class=\"fa fa-paperclip pdt6\" aria-hidden=true></i></div><div ng-if=\"$$value$$ && $$value$$.length > 0\" class=uploaded-image><div class=mb><div class=table-display><div class=cell-display><img ngf-src=$$value$$[0] class=img-responsive></div></div></div></div></div><div class=remove-file ng-show=\"$$value$$ && $$value$$.length > 0\"><a ng-click=removeFile() uib-tooltip=\"Remove Image\" tooltip-placement=auto tooltip-append-to-body=true><i class=\"fa fa-times\" aria-hidden=true></i></a></div></div><small class=text-muted ng-show=form.description ng-bind-html=form.description></small><div class=\"help-block mb0\" ng-show=\"uploadForm.$error.required && !uploadForm.$pristine\">{{ 'modules.attribute.fields.required.caption' | translate }}</div><div class=\"help-block mb0\" ng-show=\"(hasError() && errorMessage(schemaError()))\" ng-bind-html=\"(hasError() && errorMessage(schemaError()))\"></div><span ng-if=\"hasError() || hasSuccess()\" class=sr-only>{{ hasSuccess() ? '(success)' : '(error)' }}</span><div class=help-block sf-message=\"form.description | translate\" ng-if=\"!invalidFiles || invalidFiles.length <= 0\"></div><div ng-messages=invalidFile.$errorMessages ng-messages-multiple ng-repeat=\"invalidFile in invalidFiles\"><div class=\"text-danger errorMsg\" ng-message=maxSize>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong>. ({{ form.schema[invalidFile.$error].validationMessage2 | translate }} <strong>{{invalidFile.size / 1000000|number:1}}MB</strong>)</div><div class=\"text-danger errorMsg\" ng-message=pattern>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-message=maxItems>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-message=minItems>{{ form.schema[invalidFile.$error].validationMessage | translate:invalidFile }} <strong>{{invalidFile.$errorParam}}</strong></div><div class=\"text-danger errorMsg\" ng-show=errorMsg>{{errorMsg}}</div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/imagemap/imagemap.html',
    "<button ng-show=$ctrl.enableDraw ng-click=$ctrl.saveAllZones() data-toggle=tooltip title=\"Save all zones\">Save</button><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><leaflet id={{$ctrl.id}} lf-center=$ctrl.center defaults=$ctrl.defaults markers=$ctrl.markers layers=$ctrl.layers geojson=$ctrl.geojson controls width=100% height=100% maxbounds=$ctrl.maxBounds></leaflet>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/displayCount/displayCount.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover loading-message={{$ctrl.loadingMessage}} failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div class=display-count ng-if=$ctrl.value><div ng-if=\"$ctrl.widgetLayout == 'vertical'\" ng-style=\"{ 'border' : '{{$ctrl.borderSize}}px solid {{$ctrl.borderColor}}' }\"><div class=vertical-count-media ng-style=$ctrl.numberStyle>{{$ctrl.value}}</div><div class=vertical-count-media ng-style=\"{ 'background' : '{{$ctrl.messageBackgroundColor}}', 'font-weight' : '{{$ctrl.messageFontWeight}}', 'font-family' : '{{$ctrl.messageFontFamily}}', 'color' : '{{$ctrl.messageTextColor}}', 'text-align' : '{{$ctrl.messageTextAlignment}}' }\">{{$ctrl.message}}</div></div><div ng-if=\"$ctrl.widgetLayout == 'horizontal'\" ng-style=\"{ 'border' : '{{$ctrl.borderSize}}px solid {{ $ctrl.borderColor}}' }\"><div ng-if=\"$ctrl.numberCellSize == 'small'\" class=\"media horizontal-count-media\"><div class=\"media-left media-middle pull-none col-xs-3\" ng-style=$ctrl.numberStyle><i ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'block' : 'none' }\" class=\"fas fa-spinner fa-spin\"></i> <span ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'none' : 'block' }\">{{$ctrl.value}}</span></div><div class=\"media-body media-middle\" ng-style=\"{ 'background' : '{{$ctrl.messageBackgroundColor}}'}\"><span ng-style=\"{ 'color:' : '{{$ctrl.messageTextColor}}', 'font-weight' : '{{$ctrl.messageFontWeight}}', 'font-family' : '{{$ctrl.messageFontFamily}}', 'text-align' : '{{$ctrl.messageTextAlignment}}' }\">{{$ctrl.message}}</span></div></div><div ng-if=\"$ctrl.numberCellSize == 'medium'\" class=\"media horizontal-count-media\"><div class=\"media-left media-middle pull-none col-xs-6 col-sm-5 col-md-6\" ng-style=$ctrl.numberStyle><i ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'block' : 'none' }\" class=\"fas fa-spinner fa-spin\"></i><span ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'none' : 'block' }\">{{$ctrl.value}}</span></div><div class=\"media-body media-middle\" ng-style=\"{ 'background' : '{{$ctrl.messageBackgroundColor}}'}\"><span ng-style=\"{ 'color' : '{{$ctrl.messageTextColor}}', 'font-weight' : '{{$ctrl.messageFontWeight}}', 'font-family' : '{{$ctrl.messageFontFamily}}', 'text-align' : '{{$ctrl.messageTextAlignment}}'}\">{{$ctrl.message}}</span></div></div><div ng-if=\"$ctrl.numberCellSize == 'large'\" class=\"media horizontal-count-media\"><div class=\"media-left media-middle pull-none col-xs-10\" ng-style=$ctrl.numberStyle><i ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'block' : 'none' }\" class=\"fas fa-spinner fa-spin\"></i><span ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'none' : 'block' }\">{{$ctrl.value}}</span></div><div class=\"media-body media-middle\" ng-style=\"{ 'background' : '{{$ctrl.messageBackgroundColor}}' }\"><span ng-style=\"{ 'color' : '{{$ctrl.messageTextColor}}', 'font-weight' : '{{$ctrl.messageFontWeight}}', 'font-family' : '{{$ctrl.messageFontFamily}}', 'text-align' : '{{$ctrl.messageTextAlignment}}' }\">{{$ctrl.message}}</span></div></div><div ng-if=\"$ctrl.numberCellSize == ''\" class=\"media horizontal-count-media\"><div class=\"media-left media-middle pull-none\" ng-style=$ctrl.numberStyle><i ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'block' : 'none' }\" class=\"fas fa-spinner fa-spin\"></i><span ng-style=\"{ 'display' : ($ctrl.isLoading) ? 'none' : 'block' }\">{{$ctrl.value}}</span></div><div class=\"media-body media-middle\" ng-style=\"{ 'background' : '{{$ctrl.messageBackgroundColor}}' }\"><span ng-style=\"{ 'color' : '{{$ctrl.messageTextColor}}', 'font-weight' : '{{$ctrl.messageFontWeight}}', 'font-family' : '{{$ctrl.messageFontFamily}}', 'text-align' : '{{$ctrl.messageTextAlignment}}' }\">{{$ctrl.message}}</span></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker_directive.html',
    "<div class=\"datetimepicker table-responsive\"><table class=\"table table-condensed {{ data.currentView }}-view\"><thead><tr><th class=left data-ng-click=\"changeView(data.currentView, data.leftDate, $event)\" data-ng-show=data.leftDate.selectable><i class=\"glyphicon glyphicon-arrow-left\"><span class=sr-only>{{ screenReader.previous }}</span></i></th><th class=switch colspan=5 data-ng-show=data.previousViewDate.selectable data-ng-click=\"changeView(data.previousView, data.previousViewDate, $event)\">{{ data.previousViewDate.display }}</th><th class=right data-ng-click=\"changeView(data.currentView, data.rightDate, $event)\" data-ng-show=data.rightDate.selectable><i class=\"glyphicon glyphicon-arrow-right\"><span class=sr-only>{{ screenReader.next }}</span></i></th></tr><tr><th class=dow data-ng-repeat=\"day in data.dayNames\">{{ day }}</th></tr></thead><tbody><tr data-ng-if=\"data.currentView !== \\'day\\'\"><td colspan=7><span class=\"{{ data.currentView }}\" data-ng-repeat=\"dateObject in data.dates\" data-ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}\" data-ng-click=\"changeView(data.nextView, dateObject, $event)\">{{ dateObject.display }}</span></td></tr><tr data-ng-if=\"data.currentView === \\'day\\'\" data-ng-repeat=\"week in data.weeks\"><td data-ng-repeat=\"dateObject in week.dates\" data-ng-click=\"changeView(data.nextView, dateObject, $event)\" class=day data-ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}\">{{ dateObject.display }}</td></tr></tbody></table></div>')"
  );
}])