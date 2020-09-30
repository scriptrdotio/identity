var wssConfig = ["wsClientProvider",function (wsClientProvider) {
    wsClientProvider.setPublishChannel("requestChannel");
    var subscribeChannels = ["responseChannel"]
    wsClientProvider.setSubscribeChannel(subscribeChannels);
}];
 
var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
}]

var identityConfig = {
    group: {
        apis : {
            "list" : "identity/api/groups/listGroups",
            "delete" :"identity/api/groups/deleteGroup",
            "save" : "identity/api/groups/saveGroup",
            "getGroupDevices" : "identity/api/groups/getGroupDevices",
            "getGroupDevicesToView" : "identity/api/groups/getGroupDevicesToView"
        },
        identifierProperty: "name"
    },
    device: {
        apis:{
            "list" : "identity/api/devices/listDevices",
            "delete" : "identity/api/devices/deleteDevice",
            "save" : "identity/api/devices/saveDevice",
            "getDevice" : "identity/api/devices/getDevice",
            "generate" : "identity/api/devices/generateTokens",
            "revoke" : "identity/api/devices/revokeToken"
        },
        identifierProperty: "id"
    },
    templates : {
        "viewGroup" : "html/views/groups/viewGroup.html",
        "viewDevice" : "html/views/devices/viewDevice.html",
        "confirm" : "html/views/confirmationDialog.html"
    }
}
