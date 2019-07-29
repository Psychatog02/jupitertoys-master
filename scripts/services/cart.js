angular.module('jupiterApp').factory('cart', [function() {
  var items = [];

  var findItem = function(id) {
  	for(var i=0, j=items.length; i < j; i++){
  		if(items[i].item.id == id){
  			return items[i];
  		}
  	}
  	return null;
  }

  // Public API here
  return {
    add: function(item) {
    	var cartItem = findItem(item.id);
    	if(cartItem) {
    		cartItem.count++;
    	} else {
    		cartItem = {
    			count : 1,
    			item: item
    		}
    		items.push(cartItem);
    	}

    },
    remove : function(item) {
    	var idx = items.indexOf(item);
    	items.splice(idx, 1);
    },
    empty : function() {
      items = [];
    },
    getCount : function() {
    	var c = 0;
    	for(var i =0, j = items.length; i < j; i++){
    		c += parseInt(items[i].count);
    	}
    	return c;
    },
    items : function() {
    	return items;
    },
    update : function(item, count){
    	//console.log(count)
    },
    getTotal : function() {
      var t = 0, its= items;
      for(var i =0, j = items.length; i < j; i++){
        t = t + (+(parseInt(items[i].count)) * items[i].item.price);
      }
      return t;
    }

  };
}]);
