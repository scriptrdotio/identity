var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"1","iconClass":"fa fa-dashboard","label":"Identity Management","route":"#/identitymanagement", "active":"true"},
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
      {"route": "identitymanagement", "template": "/identity/view/html/views/identityMain.html"},
      {"route": "logout", "template": "/login/view/logout.html"}, 
  ]
};