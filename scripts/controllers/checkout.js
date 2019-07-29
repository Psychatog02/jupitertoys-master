angular.module('jupiterApp').controller('CheckoutCtrl', ['$scope', 'cart', 'popup', function($scope, cart, popup) {
	$scope.cart = cart

    

    $scope.onBlur = function(el, f){
        el.$dirty =true;
        f.$dirty = true;
    }
    
    $scope.validSubmit = false;
    $scope.forenameRequired = false;
    $scope.emailRequired = false;
    $scope.addressRequired = false;
    $scope.cardTypeRequired = false;
    $scope.cardRequired = false;


    $scope.onSubmit = function(f) {

        var btn = $('#checkout-submit-btn');

         $scope.forenameRequired=true;
            $scope.addressRequired=true;
            $scope.emailRequired=true;
            $scope.cardTypeRequired = true;
            $scope.cardRequired = true;
            
            var c = $('#card'),
            f = $('#forename');
            f.focus();
            if(c.val() == '') {
                c.focus();
                x = c; 
            }
            var ct = $('#cardType');
            if(ct.val() == '') {
                ct.focus();
                x = ct; 
            }
            var m = $('#address');
            if(m.val() == '') {
                m.focus();
                x = m; 
            }
            var e = $('#email');
            if(e.val() == '') {
                e.focus();
                x = e;
            }
            var x;
            if(f.val() == '') {
                f.focus();
                x = f;
            }
            
            if(x) {
                x.focus();
                return false;
            }

        var rt = ( Math.floor(Math.random()*1001) * Math.floor(Math.random()*10) + 1000);
        if(rt % 2) {
            rt += 9000;
        }
        popup.wait('Processing Order',$scope,(rt/1000));
        setTimeout(function(){
           
            $scope.forenameSubmit = form.forename.value.replace(/^\s+|\s+$/g,'');
            $scope.validSubmit = true;
            $scope.orderNumber = new Date().getTime();
            $scope.$apply();
            if($scope.validSubmit) {
                cart.empty();
                $scope.$apply();
            }
        }, rt + 250);

        setTimeout(function() {
            $scope.contactValidSubmit = true;
            $scope.$apply();    
        }, rt);
    }
    
    $scope.goBack = function() {
        $scope.validSubmit=false;
    }

    setInterval(function(){ 
        var m = $('#header-message');
        if(m && !m.hasClass('affix')) {
            if($(window).height() < $(document).height() - 38) {
                m.affix();   
            }
        }
    }, 100);

}]);
