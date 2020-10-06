# Identity Management Component
This component allows users to manage their devices and groups associated with a scriptr account. Users can create, edit, delete devices and groups in one place while maintaining a user friendly interface.
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
	- If more than 1 device, schedule a long running job and returns the job handle id
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
- Params: id*, name*, update (set to true when calling from Edit so the device is saved not created), description (meta type is set to text in the API), groups, password, isSuspended, deviceAttrs (the API transforms these attributes and builds the meta-types param)

### Groups
