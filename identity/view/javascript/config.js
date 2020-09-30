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
            "list": "identity/api/groups/listGroups",
            "delete":"identity/api/groups/deleteGroup",
            "save":"identity/api/groups/saveGroup"
        }
    },
    device: {
        apis:{
            "list": "identity/api/devices/listDevices",
            "delete":"identity/api/devices/deleteDevice",
            "save":"identity/api/devices/saveDevice"
        }
    }
}
