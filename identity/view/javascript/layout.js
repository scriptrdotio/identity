var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"1","iconClass":"fa fa-user","label":"Identity Management","route":"#/identitymanagement", "active":"true"},    
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
      {"route": "identitymanagement", "template": "/identity/view/html/views/identityMain.html"},
      {"route": "logout", "template": "/login/view/logout.html"}, 
  ]
};