var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"1","iconClass":"fa fa-dashboard","label":"Devices Management","route":"#/devicemanagement", "active":"true"},
    {"id":"2", "iconClass":"fa fa-globe", "label": "Users Management", "route":"#/usermanagement", "active":"false"}
    
  ]
};
var headerItems = {
  "logo": "https://blog.scriptr.io/wp-content/uploads/2016/10/logo-1.png",
  "items": [
  ],
  "logout": {"route":"#/logout"}
};

var routingItems = {
  "params": [
      {"route": "usermanagement", "template": "/identity/view/templates/users.html"},
      {"route": "devicemanagement", "template": "/identity/view/html/views/identities.html", "controller": "identityHomeCtrl as vm"},
      {"route": "logout", "template": "/login/view/logout.html"}, 
  ]
};