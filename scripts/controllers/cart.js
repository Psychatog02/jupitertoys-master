angular.module('jupiterApp').controller('CartCtrl', ['$scope', 'cart', 'popup', function($scope, cart, popup) {

	$scope.$on('$routeChangeSuccess', function(event, routeData){
        $('.nav>li').removeClass('active');
        $('#nav-cart').addClass('active');
	});

	$scope.cart = cart;
	
	$scope.removeItem = function(item) {
		popup.close();
		cart.remove(item);
	}

	$scope.empty = function(){
		popup.close();
		cart.empty();
	} 

	$scope.cancel = function() {
		popup.close();
	}

}]);
