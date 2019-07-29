angular.module('jupiterApp', ['ui'])
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve : {
          cart: function(cart, $q) {
            console.dir(cart);
            var deferred = $q.defer();
            deferred.resolve(cart); 
            return deferred.promise;
          },
          catalog: function(catalog, $q) {
            // see: https://groups.google.com/forum/?fromgroups=#!topic/angular/DGf7yyD4Oc4
            var deferred = $q.defer();
            deferred.resolve(catalog); 
            return deferred.promise;
          }
        }

      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        resolve : {
          cart: function(cart, $q) {
            var deferred = $q.defer();
            deferred.resolve(cart); 
            return deferred.promise;
          }
        }
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        resolve : {
          cart: function(cart, $q) {
            var deferred = $q.defer();
            deferred.resolve(cart); 
            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

.directive('tel', function() {
  var TEL_REGEXP = /^([ 0-9 ]+)$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if(viewValue == "" ) {
           ctrl.$setValidity('tel', true);
           return viewValue;
        }
        if (TEL_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('tel', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('tel', false);
          return ctrl.$modelValue;
        }
      });
    }
  };
})
.directive('cartcount', function() {
  var CARTCOUNT_REGEXP = /^\d*$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if(viewValue == "" || viewValue == "0") {
          ctrl.$setValidity('cartcount', false);
          return ctrl.$modelValue;  
        }
        if (CARTCOUNT_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('cartcount', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('cartcount', false);
          return ctrl.$modelValue;
        }
      });
    }
  };
})
.directive('ngPopup', ['popup', function(popup){
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var ngPopupUrl= attrs['ngPopupUrl'];
            // Could have custom or boostrap modal options here
            var popupOptions = {};
            element.bind( "click", function() {
                popup.load(ngPopupUrl, scope, popupOptions);
            });
        }
    };
}])
.directive('ngConfirm',['popup', function(popup) {
  return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          // Could have custom or boostrap modal options here
          var popupOptions = {};
          element.bind("click", function() {
              popup.confirm(attrs["title"], attrs["actionText"], 
                      attrs["actionButtonText"], attrs["actionFunction"], 
                      attrs["cancelButtonText"], attrs["cancelFunction"], 
                      scope, popupOptions);
          });
      }
  };
    
}]).directive('ngLogin',['popup', function(popup) {
  return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          // Could have custom or boostrap modal options here
          var popupOptions = {};
          element.bind("click", function() {
              popup.login(attrs["loginFunction"], scope, popupOptions);
          });
      }
  };
    
}]).directive('ngFocus', function( $timeout ) {
  return function( scope, elem, attrs ) {
    scope.$watch(attrs.ngFocus, function( newval ) {
      if ( newval ) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});