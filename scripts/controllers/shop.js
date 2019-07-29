angular.module('jupiterApp').controller('ShopCtrl',['$scope', 'cart', 'catalog', function($scope, cart, catalog) {
	
	$scope.$on('$routeChangeSuccess', function(event, routeData){
        $('.nav>li').removeClass('active');
        $('#nav-shop').addClass('active');
	});

	$scope.catalog = catalog;
	$scope.cart = cart;
	$scope.add = function(item) {
		cart.add(item);
		$("#nav-cart a").animate({color:"#fff"}, 300).animate({color: "green" }, 300).animate({color:"#fff"}, 300).animate({color: "#999"}, 300, 'swing', function(){
			$("#nav-cart a").removeAttr('style');
		}); 
	}
}]);
