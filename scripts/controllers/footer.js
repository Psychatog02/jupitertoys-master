'use strict';

angular.module('jupiterApp').controller('FooterCtrl', ['$scope', function($scope) {
	$scope.currentYear = new Date().getFullYear();
}]);
