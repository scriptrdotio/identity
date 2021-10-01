angular
    .module("Identity").constant(
    "identityForms",
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
                                    //302: "Name is required, cannot be empty!"
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
                            "placeholder": "Select Devices",
                            "options": {
                                "multiple": true,
                                "closeOnSelect": true,
                                "httpGet":{
                                    "url":identityConfig.device.apis.list,
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
                        'maxLength': 116
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
                                "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                              }]
                        },
                        {
                            "type": "section",
                            //"readonly": true,
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                'key': 'id',
                                "validationMessage": {
                                    201: "ID is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
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
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
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
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
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
                                                     scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
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
                                "validationMessage": {
                                    201: "Description is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
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
                                    "placeholder": "Select Group",
                                    'key': 'groups',
                                    "options": {
                                        "httpGet":{
                                            "url":identityConfig.group.apis.list,
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
                  "key": "_oldDeviceAttrs",
                  "type": "hidden",
        		   "notitle": true,
                  "onFieldLoad" : function(modelValue, form, model){
                       model["_oldDeviceAttrs"] = _.pluck(model["deviceAttrs"], "name");
                   }
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
                        'maxLength': 1024,
                    },
                    'id': {
                        'title': 'Device ID',
                        'type': 'string',
                        'maxLength': 117,
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
                        'x-schema-form': {
                            'type': 'textarea',
                            'placeholder': 'Description for this device'
                        }
                    },
                    "groups": {
                        "type": "array",
                        "title": "Groups",
                       // "description": "Select your group",
                        "items": {
                            "type": "object"
                        }
                    },
                    "isSuspended": {
                        "title": "Status",
                        "type": "string",
                        "default":"false"
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
                    },
                    
                    "_oldDeviceAttrs": {
                        "type": "string"
                    }
                },
                'required': ["name","id","password","confirmPassword"]
            }
        },
        'user': {
            'title': 'User',
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
                                "validationMessage": {
                                    201: "Name is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]
                        },
                         {
                            "type": "section",
                            //"readonly": true,
                            "htmlClass": "col-xs-12 col-sm-6",
                            'items': [{
                                'key': 'id',
                                "validationMessage": {
                                    201: "login username is too long ({{viewValue.length}} chars), maximum allowed is {{schema.maxLength}}."
                                }
                            }]

                        },
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
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',false);
                                    else {
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
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
                                        scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                    }
                                }
                            },
                                      {
                                          "key" : "confirmPassword",
                                          "type": "password",
                                          "condition":"!model.password",
                                          "ngModelOptions": { allowInvalid: true },
                                          "onChange": function(modelValue, form, model, scope) {
                                                    console.log(model)
                                                     if(modelValue != model["password"])
                                                        scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                                     else {
                                                         scope.$root.$broadcast('schemaForm.error.password','doNotMatch',true);
                                                         scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                                     }
                                                 }
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
                                'key': 'email',
                                 "validationMessage": {
                                    202: "Invalid email address",
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
                                    "placeholder": "Select Group",
                                    'key': 'groups',
                                    "options": {
                                        "httpGet":{
                                            "url":identityConfig.group.apis.list,
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
                    "key": "_oldUserAttrs",
                    "type": "hidden",
                    "notitle": true,
                    "onFieldLoad" : function(modelValue, form, model){
                        model["_oldUserAttrs"] = _.pluck(model["userAttrs"], "name");
                    }
                },
                {
                    "type": "section",
                    "htmlClass": "",
                    "items": [{
                        "key": "userAttrs",
                        "title": "User Attributes",
                        "items": [{
                            "type": "section",
                            "htmlClass": "row",
                            "items": [ {
                                "type": "section",
                                "htmlClass": "col-xs-6 col-sm-3",
                                "items": [{
                                    "key": "userAttrs[].name",
                                    "title": "name",

                                }]
                            },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              'type':'select',
                                              "key": "userAttrs[].type",
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
                                              "key": "userAttrs[].value",
                                              "title": "value",
                                          }]
                                      }]
                        }]
                    }]
                }

            ],

            'schema': {
                'type': 'object',
                'title': 'userSchema',
                'properties': {
                    'name': {
                        'title': 'User Name',
                        'type': 'string',
                        'maxLength': 1024,
                    },
                    'id': {
                        'title': 'Login',
                        'type': 'string',
                        'maxLength': 1024,
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
                    'email': {
                        'title': 'Email Address',
                        'type': 'string',
                        'pattern':'^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,})$' 
                    },
                    "groups": {
                        "type": "array",
                        "title": "Groups",
                        //"description": "Select your group",
                        "items": {
                            "type": "object"
                        }
                    },
                    "isSuspended": {
                        "title": "Status",
                        "type": "string",
                        "default":"false"
                    },
                    "userAttrs":{
                        'title': 'User Attributes',
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
                    },

                    "_oldUserAttrs": {
                        "type": "string"
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
                                "showProgress": false,
                                "simpleImageUpload": false,
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
                        "title":"File",
                        "type": "array",
                        "format": "singlefile",
                        "x-schema-form": {
                            "type": "array"
                        },
                        "pattern":       {
                            "mimeType":  ".csv",
                            "validationMessage": "Wrong File Type. Allowed types ",
                        },
                        "maxSize":       {
                            "maximum": "10MB",
                            "validationMessage": "File exceeded allowed size of "
                        }
                    },
                },
                "required": [
                    "csvFile"
                ]
            }
        }
    }
)