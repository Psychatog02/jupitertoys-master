'use strict';

angular.module('jupiterApp').controller('UserCtrl', ['$scope',  function($scope) {
	
	$scope.$on('$routeChangeSuccess', function(event, routeData){
		if(!$('#nav-user').is(":visible")){
			window.location = '#/home';
		}
        $('.nav>li').removeClass('active');
        $('#nav-user').addClass('active');
        
	});

	$scope.username = function() {
		return $('#nav-user .user').text();
	}
}]);
