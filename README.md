# Identity Management Component
This component allows users to manage their devices and groups associated with a scriptr account. Users can create, edit, delete devices and groups in one place while maintaining a user friendly interface.

### Integration Guide
Below are the main guidelines to follow in order to integrate this component into an application.

##### Install Identity module:
- Owner:scriptrdotio
- Repository:identity
- Path:/identity
- Branch:master

##### Dependencies
- Run the following scripts once:
	- **identity/install/createDefaultManager**: This will create the "identity-managers" group that will have access to all APIs, and then it will create a default admin user that will be placed in that group. If you wish to create a different group that has access to the APIs, that group has to be placed in the "identityManagementGroups" array located in "identity/config/config".

	- **identity/install/createTemplateDocument**: This will create a CSV template that the users can download from the "Import CSV" window.

- Make sure to activate "**QueueScript**" for the scriptr account being used.

- Include the following scripts in the application's index.html:
	- CSS:
	```html
	    <link rel="stylesheet" href="/identity/view/css/style.css">
	```
	- Dependencies scripts:
	```html
	<!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js" ></script>

        <!-- Libraries -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.0/showdown.min.js" integrity="sha256-LSUpTY0kkXGKvcBC9kbmgibmx3NVVgJvAEfTZbs51mU=" crossorigin="anonymous"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>	
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/codemirror.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/addon/display/placeholder.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/mode/javascript/javascript.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.21/moment-timezone-with-data.min.js"></script>

        <!-- NG material -->
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-websocket/1.0.9/angular-websocket.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/angular-underscore.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/angular-translate.min.js"></script>
        <script src='/UIComponents/dashboardBuilder/lib/schemaForm/select.min.js'></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>      
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script> 
        <script src="//cdn.gitcdn.link/cdn/angular/bower-material/v1.1.3/angular-material.js"></script> 
        <script src="//s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js"></script> 

        <!-- Directives -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/spectrum.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/angular-spectrum-colorpicker.min.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/tv4.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/objectPath.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/codemirror/js/mode/ui-codemirror.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/schemaForm.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/bootstrapDecorator.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/bootstrap-colorpicker.min.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/bootstrap-ui-select.min.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/bootstrap-ui-codemirror.min.js"></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/autorefresh.js"></script>
        <script src='/UIComponents/dashboardBuilder/lib/schemaForm/angular-strap.js'></script>
        <script src='/UIComponents/dashboardBuilder/lib/schemaForm/angular-strap.tpl.min.js'></script>
        <script src='//cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js'></script>
        <script src='/UIComponents/dashboardBuilder/lib/schemaForm/angular-schema-form-dynamic-select.js'></script>
        <script src="/UIComponents/dashboardBuilder/lib/schemaForm/ng-file-upload.js"></script>
        <script src='/UIComponents/dashboardBuilder/lib/schemaForm/schema-form-file.js'></script>

        <!-- Components -->
        <script src="/UIComponents/wsProvider.js"></script>
        <script src="/UIComponents/httpProvider.js"></script>
        <script src="/UIComponents/dataService.js"></script>
	```
	- At the bottom before including layout and module scripts of the app (identity.js has to be before the rest):
	```html
	    <script src="/identity/view/javascript/components/main/identity.js"></script>
	    <script src="/identity/view/javascript/components/main/config.js"></script>
	    <script src="/identity/view/javascript/components/grid/grid.js"></script>
	    <script src="/identity/view/javascript/components/forms/overlayForm.js"></script>
	    <script src="/identity/view/javascript/components/forms/uploadFile.js"></script>
	    <script src="/identity/view/javascript/components/main/formDefinitions.js"></script>
	    <script src="/identity/view/javascript/components/loadingOverlay/loadingOverlay.min.js"></script>
	```
- In modules.js make sure to add the component dependency: "Identity"

- In layout.js, 
	- place the component in the menuItems section:
`{"id":"3","iconClass":"fa fa-dashboard","label":"Identity Management","route":"#/identitymanagement", "active":"false"}`

	- and place the following in the routingItems section:
`{"route": "identitymanagement", "template": "/identity/view/html/views/identityMain.html"}`

### Common Configuration
There are a couple of config files that hold common static values that are used throughout the project.
- identity/config/config (contains variables used by the backend)
	- The number of query documents per page (default per account is 50)
	- Paths to scripts that are scheduled in a long job
- identity/view/javascript/config.js (contains values used by the frontend)
	- API URLs for all needed actions
	- Identifier property for devices, groups
	- HTML templates used in multiple instances

### Devices
##### Token manipulation
- Generate, regenerate, and revoke tokens for each device from within the View Device panel.
- Batch generate/regenerate is also possible using the refresh tokens button at the top of the grid.
- Cannot generate a token for a suspended device. Only regenerating and deleting are allowed.

##### API
###### identity/api/devices/deleteDevice:
- Used for single row delete and multiple select batch delete
- Calling this API using POST:
	- If single device, deletes directly and returns response
	- If more than 1 device, schedule a long running job and returns the job handle id (if one device fails to delete, the whole batch will be rolled back)
	- Params: id* (can be a string of 1 device id or an array of multiple ids)
- Calling using GET:
	- Checks on the job that was scheduled
	- Params: scriptHandleId*

###### identity/api/devices/generateTokens
- Used for generating/regenerating tokens
- Called from within the View device panel (for single device) and from the Refresh Token(s) button (for multiple devices)

###### identity/api/devices/revokeToken
- Used for deleting a device's token
- Called from within the View device panel

###### identity/api/devices/getDevice
- Used for fetching device details
- Called before View device and Edit device
- Params: id* (string of a single device id)

###### identity/api/devices/listDevices
- Used to retrieve some or all devices, excluding the "scriptr" device
- Calling this API from the main grid:
	- Retrieves devices based on the results per page (assigned grid size) for a specific page number.
	- Supports sorting (based on the selected column)
	- Params: resultsPerPage, pageNumber, sort (ex: DESC), sortType (ex: string), sortingColumnName (the name of the attribute)
- Calling it from the UI Select (in the add / edit forms):
	- Retrieves all available devices (even if they exceed the max query per page value set in the account)
	- The param "count" must be included and assigned to false.
- Common params for both cases: fields (default is *), queryFilter (the keyword from the search bar)

###### identity/api/devices/saveDevice
- Used to update or create a device
- Can be called from Add or Edit panels
- Params: id\*, name\*, update (set to true when calling from Edit so the device is saved not created), description (meta type is set to text in the API), groups, password, isSuspended, deviceAttrs (the API transforms these attributes and builds the meta-types param)

### Groups
##### API
###### identity/api/groups/deleteGroup:
- Used for single row delete and multiple select batch delete
- Calling this API using POST:
	- If single group, deletes directly and returns response
	- If more than one group, schedule a long running job and returns the job handle id (if one group fails to delete, the whole batch will be rolled back)
	- Params: name* (can be a string of one group name or an array of multiple names)
- Calling using GET:
	- Checks on the job that was scheduled
	- Params: scriptHandleId*

###### identity/api/groups/getGroupDevices
- Used to get the devices IDs of a certain group to show them in the ui-selector when editing a group.
- Called before Edit group
- Params: name* (string of a single group name)

###### identity/api/groups/getGroupDevicesToView
- used to get group and devices found in this group to open them in view pannel

###### identity/api/groups/listGroups
- Used to retrieve some or all groups
- Calling this API from the main grid:
	- Retrieves groups based on the results per page (assigned grid size) for a specific page number.
	- Params: resultsPerPage, pageNumber, endRow, startRow.
- Calling it from the UI Select (in the add / edit forms):
	- Retrieves all available groups
	- The param "count" must be included and assigned to false to avoid executing unnecessary code.
- Common params for both cases: queryFilter (the keyword from the search bar) and  count.

###### identity/api/groups/saveGroup
- Used to update or create a group
- Can be called from Add or Edit panels
- Params: name*, update (set to true when updating 'renaming' the name of the group), newName (the new name of the group), devices (the devices sent from the widget), originalDevices (the original devices that were saved in this group), updateDevices (set to false when the original devices are the same of the devices sent from the widget)

### Export Devices / Groups
##### API
###### identity/api/reports/scheduleExport
- Used for exporting devices or groups in CSV format
- The content of the grid is exported in addition to all device attributes (in the case of devices export)
- Calling this API using POST:
	- Schedule a long job to build the CSV file
	- Params: gridType* (passed from the frontend, value is either device or group), queryFilter (in case the user wants to export only their search results)
- Calling using GET:
	- Checks on the job that was scheduled
	- Params: scriptHandleId*

###### identity/api/reports/buildCSV
- This script is called as part of the scheduled job to build and save the CSV file in a document in the DefaultStore
- Takes the params that were passed to scheduleExport API
- Returns the dockey of the created document

###### identity/api/reports/getCSVFile
- Used to prepare the CSV file (that was previously built and saved in a document) for direct browser download
- Params: gridType\*, docKey\*
- Writes the file content into the response and sets appropriate headers such as content-disposition, content-type.

### Import Devices
##### API
###### identity/api/reports/scheduleImport
- Users can refer to the CSV downloadble template as a guidline when building their file
- Calling this API using POST:
	- Schedule a long job to build the CSV file
	- Params: fileParam* (passed from the frontend, the file uploaded)
- Calling using GET:
	- Checks on the job that was scheduled
	- Params: scriptHandleId*
###### identity/api/reports/importCSV
- This script is called as part of the scheduled job
- Used for importing devices from a CSV file and creating the devices in the account
- If one device fails to create, the whole batch will be rolled back
- Takes the params that were passed to scheduleImport API
- This CSV file must contain the name and the id as headers
