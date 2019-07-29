'use strict';

angular.module('jupiterApp').controller('MainCtrl', ['$scope',  function($scope) {
	$scope.$on('$routeChangeSuccess', function(event, routeData){
        $('.nav>li').removeClass('active');
        $('#nav-home').addClass('active');
        
	});
}]);
