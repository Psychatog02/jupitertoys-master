angular.module('jupiterApp').controller('ContactCtrl', ['$scope', 'popup', function($scope, popup) {
	$scope.$on('$routeChangeSuccess', function(event, routeData){
        $('.nav>li').removeClass('active');
        $('#nav-contact').addClass('active');
	});

	$scope.onBlur = function(el, f){
		el.$dirty =true;
        f.$dirty = true;
	}
    
    $scope.contactValidSubmit = false;
    $scope.contactforenameRequired = false;
    $scope.contactemailRequired = false;
    $scope.contactaddressRequired = false;

    $scope.onSubmit = function(f) {


        var btn = $('#contact-submit-btn');
            $scope.contactforenameRequired=true;
            $scope.messageRequired=true;
            $scope.contactemailRequired=true;
            var f = $('#forename');
            f.focus();
            f.blur;
            var m = $('#message');
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
        popup.wait('Sending Feedback',$scope,(rt/1000));
        $scope.forenameSubmit = form.forename.value.replace(/^\s+|\s+$/g,'');
        setTimeout(function() {
            $scope.contactValidSubmit = true;
            $scope.$apply();    
        }, rt);
        

    }
    
    $scope.goBack = function() {
        $scope.contactValidSubmit=false;
    }

    $scope.checkErrors = function() {
        setTimeout(function(){
            $scope.contactforenameRequired=true;
            $scope.messageRequired=true;
            $scope.contactemailRequired=true;
            var f = $('#forename');
            f.focus();
            f.blur;
            var m = $('#message');
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
                x = f;
            }
            
            if(x) {
                x.focus();
            }
        }, 10);
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
