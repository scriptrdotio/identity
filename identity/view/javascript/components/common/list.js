angular.module('Generic', [])
  .component('list', {
  bindings: {
    title: '<title',
    items: '<items',
    searchItem: '<',
    message: '<?',
    closeAlert: '&?',
    onLoad: '&?',
    onDelete: '&?',
    onUpdate: '&?',
    onSelect: '&?',
    onAdd: '&?',
    onListTokens: '&?',
    onRevokeToken: '&?',
    onRenewToken: '&?'
  },
  templateUrl: "/identity/view/javascript/components/common/list.html",
  controller: function(){
    this.$onInit = function() {
      this.hasAdd = false;
      if(this.onAdd) {
        this.hasAdd = true
      }
      this.hasUpdate = false;
      if(this.onUpdate) {
        this.hasUpdate = true
      }
      this.hasDelete = false;
      if(this.onDelete) {
        this.hasDelete = true
      }
        
      this.hasListTokens = false;
      if(this.onListTokens) {
        this.hasListTokens = true
      }
        
      this.hasRevokeToken = false;
      if(this.onRevokeToken) {
        this.hasRevokeToken = true
      }
        
      this.hasRenewToken = false;
      if(this.onRenewToken) {
        this.hasRenewToken = true
      }
    },
    this.deleteItem = function(item) {
      this.onDelete({"item": item});
    },
    
    this.updateItem = function(item) {
      this.onUpdate({"item": item});
    }
    
    this.addItem = function() {
      this.onAdd();
    }
    
    this.loadItems = function(){
      if(this.onLoad) this.onLoad()
    }
    
    this.resetSearchItem = function() {
      this.searchItem = ""
    }
    
    this.listTokens = function(item) {
        this.onListTokens({"item": item});
    }
    
    this.revokeToken = function(item) {
        this.onRevokeToken({"item": item});
    }
    
    this.renewToken = function(item) {
        this.onRenewToken({"item": item});
    }
  }
}).component('item', {
  bindings: {
    item:'<?',
    onDelete: '&?',
    onUpdate: '&?',
    onListTokens: '&?',
    onRevokeToken: '&?',
   	onRenewToken: '&?',
    hasUpdate: '<hasUpdate',
    hasDelete: '<hasDelete',
    hasListTokens: '<hasListTokens',
    hasRevokeToken: '<hasRevokeToken',
    hasRenewToken: '<hasRenewToken'
  },
  templateUrl: "/identity/view/javascript/components/common/item.html",
  controller: function(){
    this.deleteItem = function(item) {
      this.onDelete({user: item});
    },
    this.updateItem = function(item) {
      this.onUpdate(item);
    },
    this.listTokens = function(item) {
      this.onListTokens(item);
    },
    this.revokeToken = function(item) {
      this.onRevokeToken(item);
    },
    
    this.renewToken = function(item) {
      this.onRenewToken(item);
    }
  }
})
