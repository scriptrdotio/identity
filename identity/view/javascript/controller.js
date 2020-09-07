myApp.constant(
    "infoWindowActions",
    {
       'addGroup': {
       'title': 'New Group',
       'form': [
            {
                'type': 'section',
                'htmlClass': 'row',
                'items': [
                    {
                        'type': 'section',
                        'htmlClass': 'col-xs-6',
                        'items': [{
                            'key': "name"
                            
                        }]
                    }
                ]
            },
            {
                'type': 'section',
                'htmlClass': 'row',
                'items': [
                    {
                        "key": "devices",
                        "type": 'uiselectmultiple',
                        'htmlClass': 'col-xs-12',
                        "placeholder": "Select devices",
                        "options": {
                            "multiple": true,
                            "closeOnSelect": true,
                            "httpGet":{
                                "url":"identity/api/devices/listDevices",
                                "parameter": "{\"count\": false, \"fields\": \"id,name\"}"
                            } ,
                            "map": {valueProperty: "id", nameProperty: "name"},
                        },
                    },
                ]
            },

        ],
           'schema': {
               'type': 'object',
               'title': 'groupSchema',
               'properties': {
                   "name": {
                       'title': 'Group Name',
                       'type': 'string'
                   },
                   "devices": {
                       "type": "array",
                       "title": "Devices",
                       "description": "Select your group devices",
                       "items": {
                           "type": "object"
                       }
                   }

               },
               'required': ["name"]
           }
       },
 'addDevice': {
    'title': 'New Device',
        'form': [
            {
                'type': 'section',
                'htmlClass':'row',
                'items': [
                    {
                        'type': 'section',
                        'htmlClass': 'col-xs-12 col-sm-6',
                        'items': [{
                            'key': 'name',
                        }]
                    },
                    {
                        "type": "section",
                        //"readonly": true,
                        "htmlClass": "col-xs-12 col-sm-6",
                        'items': [{
                            'key': 'id',
                        }]

                        }
                ]
            },
                 {
                'type': 'section',
                'htmlClass':'row',
                'items': [
                    {
                        'type': 'section',
                        'htmlClass': 'col-xs-12 col-sm-6',
                        'items': [{
                            'key': 'password',
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-12 col-sm-6",
                        'items': [{
                            'key': 'confirmPassword',
                        }]

                        }
                ]
            },
            {
                'type': 'section',
                'htmlClass': 'row',
                'items': [
                    {
                        'type': 'section',
                        "htmlClass": "col-xs-12",
                        'items': [{
                            'key': 'description',
                        }]
                    }
                ]
            },
                            {
           'type': 'section',
           'htmlClass': 'row',
           'items': [
                       {
                           'type': 'section',
                           "htmlClass": "col-xs-12",
                           'items':[
                               {
                                   'type': 'radios-inline',
                                   "title": "Status",
                                   'key': 'isSuspended',
                                   'titleMap': [{
                                       'value': "false",
                                       'name': "Active"
                                   }, {
                                       'value': "true",
                                       'name': "Suspended"
                                   }]
                               }
                           ]
                       }
                   ]
                   },
                 {
                'type': 'section',
                'htmlClass': 'row',
                'items': [
                    {
                         "type": "section",
                         "htmlClass": "col-xs-12",
                        'items':[
                            {
                                'type':'uiselectmultiple',
                                "placeholder": "select group",
                                'key': 'groups',
                                "options": {
                                    "httpGet":{
                                        "url":"identity/api/groups/listGroups",
                                         "parameter": "{\"count\": false}"
                                    } ,
                                    "map": {valueProperty: "name", nameProperty: "name"} 
                                }
                            }
                        ]
                       
                    },
                ]
            },
            {
                "type": "section",
                "htmlClass": "",
                "items": [{
                    "key": "deviceAttrs",
                    "title": "Device Attributes",
                    "items": [{
                        "type": "section",
                        "htmlClass": "row",
                        "items": [ {
                            "type": "section",
                            "htmlClass": "col-xs-6 col-sm-3",
                            "items": [{
                                "key": "deviceAttrs[].name",
                                "title": "name",

                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6 col-sm-3",
                            "items": [{
                                'type':'select',
                                "key": "deviceAttrs[].type",
                                'placeholder': 'select type',
                                'titleMap': [
                                    {
                                        "value": "string",
                                        "name": "string"
                                    },
                                    {
                                        "value": "numeric",
                                        "name": "numeric"
                                    },
                                    {
                                        "value": "date",
                                        "name": "date"
                                    },
                                    {
                                        "value": "text",
                                        "name": "text"
                                    },
                                    {
                                        "value": "geospatial",
                                        "name": "geospatial"
                                    },
                                ],
                                "title": "type",

                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6 col-sm-3",
                            "items": [{
                                "key": "deviceAttrs[].value",
                                "title": "value",
                            }]
                        }]
                    }]
                }]
            }

        ],
 
    'schema': {
        'type': 'object',
        'title': 'deviceSchema',
        'properties': {
            'name': {
                'title': 'Device Name',
                'type': 'string',
            },
            'id': {
                'title': 'Device ID',
                'type': 'string',
            },
            'password': {
                'title': 'Password',
                'type': 'string',
                 'x-schema-form': {
                    'type': 'password',
                }
            },
            'confirmPassword': {
                'title': 'Confirm Password',
                'type': 'string',
                 'x-schema-form': {
                    'type': 'password',
                }
            },
            'description': {
                'title': 'Description',
                'type': 'string',
                'x-schema-form': {
                    'type': 'textarea',
                    'placeholder': 'Description for this device'
                }
            },
            "groups": {
                "type": "array",
                "title": "groups",
                "description": "Select your group",
                "items": {
                    "type": "object"
                }
            },
            "deviceAttrs":{
                'title': 'Device Attributes',
                "type": "array",
                "items":{
                    "type": "object",
                    "properties":{
                        "name": {
                            "title": "Name",
                            "type": "string",
                        },
                        "type": {
                            "title": "type",
                            "type": "string",
                            "placeholder":"select type"
                        },
                        "value": {
                            "title": "Value",
                            "type": "string",
                        }
                    }
                }
            }
        },
        'required': ["name","id","password","confirmPassword"]
    }
     },
        }
    )