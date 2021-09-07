var identityConfig =
    {
        theme: "identityTheme",
        group: {
            apis: {
                "list": "identity/api/groups/listGroups",
                "delete":"identity/api/deleteIdentity",
                "save": "identity/api/groups/saveGroup",
                "getGroupDevices": "identity/api/groups/getGroupDevices",
                "getGroupDevicesToView": "identity/api/groups/getGroupDevicesToView"
            },
            identifierProperty: "name"
        },
        device: {
            apis: {
                "list" : "identity/api/devices/listDevices",
                "delete" : "identity/api/deleteIdentity",
                "save" : "identity/api/devices/saveDevice",
                "get" : "identity/api/getIdentity",
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
        },
        user: {
            apis: {
                "delete" : "identity/api/deleteIdentity",
                "get" : "identity/api/getIdentity",
                "list" : "identity/api/users/listUsers",
                "save" : "identity/api/users/saveUser",
            },
            identifierProperty: "id"
        }
    }