angular
    .module("Identity").constant(
    "identityConfig",
    {
    theme: "identityTheme",
    group: {
        apis: {
            "list": "identity/api/groups/listGroups",
            "delete":"identity/api/groups/deleteGroup",
            "save": "identity/api/groups/saveGroup",
            "getGroupDevices": "identity/api/groups/getGroupDevices",
            "getGroupDevicesToView": "identity/api/groups/getGroupDevicesToView"
        },
        identifierProperty: "name"
    },
    device: {
        apis: {
            "list" : "identity/api/devices/listDevices",
            "delete" : "identity/api/devices/deleteDevice",
            "save" : "identity/api/devices/saveDevice",
            "getDevice" : "identity/api/devices/getDevice",
            "generate" : "identity/api/devices/generateTokens",
            "revoke" : "identity/api/devices/revokeToken"
        },
        identifierProperty: "id"
    },
    reports: {
        apis: {
            "export": "identity/api/reports/scheduleExport",
            "import": "identity/api/reports/scheduleImport",
            "getCSV": "identity/api/reports/getCSVFile",
            "template": "identity/api/reports/getCSVTemplate"
        }
    }
})