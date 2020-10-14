# Identity Management Component
This component allows users to manage their devices and groups associated with a scriptr account. Users can create, edit, delete devices and groups in one place while maintaining a user friendly interface.

### Integration Guide
Below are the main guidelines to follow in order to integrate this component into an application.
- Install Identity module:
	- Owner:scriptrdotio
	- Repository:identity
	- Path:/identity
	- Branch:master

- Include the following scripts in the application's index.html:
	- With the CSS:
	```html
	    <link rel="stylesheet" href="/identity/view/css/style.css">
	```
	- At the bottom before including layout and module scripts of the app (in that order):
	```html
	    <script src="/identity/view/javascript/components/main/config.js"></script>
	    <script src="/identity/view/javascript/components/grid/grid.js"></script>
	    <script src="/identity/view/javascript/components/main/main.js"></script>
	    <script src="/identity/view/javascript/components/forms/overlayForm.js"></script>
	    <script src="/identity/view/javascript/components/forms/uploadFile.js"></script>
	    <script src="/identity/view/javascript/components/main/formDefinitions.js"></script>
	    <script src="/identity/view/javascript/components/loadingOverlay/loadingOverlay.min.js"></script>
	```
- In modules.js make sure to add any missing dependencies:
"schemaForm", "Grid", "WsClient", "HttpClient", "ngSchemaFormFile", "List","ngLoadingOverlay","Identity"

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
