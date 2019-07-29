'use strict';

angular.module('jupiterApp').controller('NavCtrl', ['$scope', 'cart', 'popup', function($scope, cart, popup) {
  
  $scope.getCount = function() {
  	return cart.getCount();
  }


  $scope.login = function(username, password) {

  	if(password === 'letmein') {
   		$('#nav-login').hide();
      $('#nav-user').show();
   		$('#nav-user .user').text(username);
    	$('#nav-logout').show();
    	return true;

  	}
  	return false;
  }

  $scope.logoutConfirm = function() {
    $('#nav-user .user').text('');
    $('#nav-user').hide();
  	$('#nav-logout').hide();
 		$('#nav-login').show();
 		popup.close();
    if(window.location.hash = "#/user") {
        window.location = '#/home';
    }
 	}

  $scope.logout = function() {


  	popup.confirm('Logout','Are you sure that you want to logout?', 'Logout', 'logoutConfirm()' , 'Cancel', null, $scope);
  	
  }
}]);
