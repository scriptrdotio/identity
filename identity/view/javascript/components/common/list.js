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
    onAdd: '&?'
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
      this.onLoad()
    }
    this.resetSearchItem = function() {
      this.searchItem = ""
    }
  }
}).component('item', {
  bindings: {
    item:'<item',
    onDelete: '&?',
    onUpdate: '&?',
    hasUpdate: '<hasUpdate',
    hasDelete: '<hasDelete'
  },
  templateUrl: "/identity/view/javascript/components/common/item.html",
  controller: function(){
    this.deleteItem = function(item) {
      this.onDelete({user: item});
    },
      this.updateItem = function(item) {
      this.onUpdate(item);
    }
  }
})
