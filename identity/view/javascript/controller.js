myApp.constant(
    "infoWindowActions",
    {
        'group': {
            'title': 'Group',
            'form': [
                {
                    'type': 'section',
                    'htmlClass': 'row',
                    'items': [
                        {
                            'type': 'section',
                            'htmlClass': 'col-xs-6',
                            'items': [{
                                'key': "name",
 								 "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}.",
                                    302: "Name is required, cannot be empty!"
                            	}
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
                        'type': 'string',
                        'maxLength': 116,
                        "validationMessage": "Maximum permitted value is 116 characters"
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
        'device': {
            'title': 'Device',
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
                                "key" : "password",
                                "type": "password",
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["confirmPassword"])
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                "key" : "confirmPassword",
                                "type": "password",
                                "condition":"model.password",
                                "required":true,
                                "ngModelOptions": { allowInvalid: true },
                                "onChange": function(modelValue, form, model, scope) {
                                    console.log(model)
                                    if(modelValue != model["password"])
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            },
                                      {
                                          "key" : "confirmPassword",
                                          "type": "password",
                                          "condition":"!model.password",
                                          "ngModelOptions": { allowInvalid: true },
                                          /* "onChange": function(modelValue, form, model, scope) {
                                                console.log(model)
                                                 if(modelValue != model["password"])
                                                    scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                                 else {
                                                     scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                                     scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                                 }
                                             }*/
                                      } ]

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
                        'title': 'Device',
                        'type': 'string',
                        'minLength': 1,
                        'maxLength': 1024,
                        "validationMessage": "Maximum permitted value is 1024 characters"
                    },
                    'id': {
                        'title': 'Device ID',
                        'type': 'string',
                        'minLength': 1,
                        'maxLength': 117,
                        "validationMessage": "Maximum permitted value is 117 characters"
                    },
                    'password': {
                        'title': 'Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'confirmPassword': {
                        'title': 'Confirm Password',
                        'type': 'string',
                        'validationMessage': {
                            "doNotMatch": "Passwords do not match"
                        },
                        'x-schema-form': {
                            'type': 'password',
                        }
                    },
                    'description': {
                        'title': 'Description',
                        'type': 'string',
                        'maxLength': 1024,
                        "validationMessage": "Maximum permitted value is 1024 characters",
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
        'uploaderForm': {
            "form": [
                {
                    "type": "section",
                    "items": [
                        {
                            "type": "section",
                            "items": [{
                                "key": "csvFile",
                                "type": "nwpFileUpload",
                                "i18n": {
                                    "add": "Open file browser",
                                    "preview": "Preview Upload",
                                    "filename": "File Name",
                                    "progress": "Progress Status",
                                    "upload": "Upload",
                                    "dragorclick": "Drag and drop your file here or click here",
                                    "required": "Required"
                                },
                                "notitle": false
                            }]
                        }

                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "csvFile": {
                        "title": "File",
                        "type": "array",
                        "format": "singlefile",
                        //"default": "fileattach.csv",
                        "x-schema-form": {
                            "type": "array"
                        },
                        "pattern":       {
                            "mimeType":          "text/csv",
                            "validationMessage": "Wrong File Type. Allowed types ",
                        },
                        "maxSize":       {
                            "maximum":            "10MB",
                            "validationMessage":  "File exceeded allowed size of "
                        }
                    }
                },
                "required": [
                    "csvFile"
                ]
            }
        }
    }
)