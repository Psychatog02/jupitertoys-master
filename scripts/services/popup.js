angular.module('jupiterApp').factory('popup', ['$http', '$compile', function($http, $compile) {

    var popupService = {};

    // Get the popup
    popupService.getPopup = function(create)
    {
        if (!popupService.popupElement && create)
        { 
            popupService.popupElement = $( '<div class="popup modal hide" data-backdrop="static"></div>' );
            popupService.popupElement.appendTo( 'BODY' );
        }

        return popupService.popupElement;
    }

    popupService.compileAndRunPopup = function (popup, scope, options) {
        $compile(popup)(scope);
        popup.modal(options);
    }

    // Is it ok to have the html here? should all this go in the directives? Is there another way
    // get the html out of here?
    popupService.alert = function(title, text, buttonText, alertFunction, scope, options) {
        text = (text) ? text : "Alert";
        buttonText = (buttonText) ? buttonText : "Ok";
        var alertHTML = "";
        if (title)
        {
            alertHTML += "<div class=\"modal-header\"><h1>"+title+"</h1></div>";
        }
        alertHTML += "<div class=\"modal-body message \">"+text+"</div>"
                    + "<div class=\"modal-footer\">";
        if (alertFunction)
        {
            alertHTML += "<a class=\"btn\" ng-click=\""+alertFunction+"\">"+buttonText+"</a>";
        }
        else
        {
            alertHTML += "<a class=\"btn\">"+buttonText+"</a>";
        }
        alertHTML += "</div>";
        var popup = popupService.getPopup(true);
        popup.html(alertHTML);
        if (!alertFunction)
        {
            popup.find(".btn").click(function () {
                popupService.close();
            });
        }
        
        popupService.compileAndRunPopup(popup, scope, options);
    }

    popupService.login = function(loginFunction, scope, options) {

        var popup = popupService.getPopup(true);
        var loginHtml = "<div class=\"modal-header\"><h1>Login</h1></div>";
            loginHtml += "<div class=\"modal-body message\">";
            loginHtml += '<form role="form" id="loginForm" >';
            loginHtml += '<div id="messageContainer"></div>';
            loginHtml += '<div class="form-group" id="usernameGroup">';
            loginHtml +='<label for="loginUserName">Username</label>';
            loginHtml += '<input type="text" class="form-control" id="loginUserName" placeholder="User Name">';
            loginHtml += '</div>';
            loginHtml += '<div class="form-group" id="passwordGroup">';
            loginHtml += '<label for="loginPassword">Password</label>';
            loginHtml += '<input type="password" class="form-control" id="loginPassword" placeholder="Password">';
            loginHtml += '</div>';
            loginHtml += '</div>'; //body
            loginHtml += "<div class=\"modal-footer\">";
            loginHtml += '<button type="submit" class="btn btn-primary">Login</button>';
            loginHtml += '<button type="button" class="btn btn-cancel">Cancel</button>';
            loginHtml += '</form>';
            loginHtml += '</div>';

        popup.html(loginHtml);
        var usernameGroup = popup.find('#usernameGroup'),
            passwordGroup = popup.find('#passwordGroup'),
            username = popup.find('#loginUserName'),
            password = popup.find('#loginPassword'),
            form = popup.find('#loginForm');

        var messageContainer = popup.find('#messageContainer');

        var submit = function() {
            if(scope[loginFunction](username.val(), password.val())) {
                popupService.close();
            } else { //not valid login
                usernameGroup.addClass('has-error');
                passwordGroup.addClass('has-error');
                messageContainer.html('<div class="alert alert-error" id="login-error"><strong>Your login details are incorrect</strong></div>');
            }
        }

        username.change(function(){
            usernameGroup.removeClass('has-error');
        });
        username.keypress(function(e) {
            if(e.which == 13) {
                submit();
            }
        });

        password.change(function(){
            passwordGroup.removeClass('has-error');
        });
        password.keypress(function(e) {
            if(e.which == 13) {
                submit();
            }
        });

        form.submit(function(){
            submit();
        });
        popup.find('.btn-primary').click(function() {
            submit();
        });

        popup.find('.btn-cancel').click(function() {
            popupService.close();
        });

        popupService.compileAndRunPopup(popup, scope, options); 
    }
    // Is it ok to have the html here? should all this go in the directives? Is there another way
    // get the html out of here?
    popupService.confirm = function(title, actionText, actionButtonText, actionFunction, cancelButtonText, cancelFunction, scope, options) {
        actionText = (actionText) ? actionText : "Are you sure?";
        actionButtonText = (actionButtonText) ? actionButtonText : "Ok";
        cancelButtonText = (cancelButtonText) ? cancelButtonText : "Cancel";
        
        var popup = popupService.getPopup(true);
        var confirmHTML = "";
        if (title)
        {
            confirmHTML += "<div class=\"modal-header\"><h1>"+title+"</h1></div>";
        }
        confirmHTML += "<div class=\"modal-body message\">"+actionText+"</div>"
                    +    "<div class=\"modal-footer\">";
        if (actionFunction)
        {
            confirmHTML += "<a class=\"btn btn-success\" ng-click=\""+actionFunction+"\">"+actionButtonText+"</a>";
        }
        else
        {
            confirmHTML += "<a class=\"btn btn-success\">"+actionButtonText+"</a>";
        }
        if (cancelFunction)
        {
            confirmHTML += "<a class=\"btn btn-cancel btn-danger\" ng-click=\""+cancelFunction+"\">"+cancelButtonText+"</a>";
        }
        else
        {
            confirmHTML += "<a class=\"btn btn-cancel\">"+cancelButtonText+"</a>";
        }
        confirmHTML += "</div>";
        popup.html(confirmHTML);
        if (!actionFunction)
        {
            popup.find(".btn-primary").click(function () {
                popupService.close();
            });
        }
        if (!cancelFunction)
        {
            popup.find(".btn-cancel").click(function () {
                popupService.close();
            });
        }
        popupService.compileAndRunPopup(popup, scope, options);  
    }

    popupService.wait = function(title, scope, time, options) {
        var waitHtml = '<div class="modal-header"><h1>'+ title + '</h1></div><div class="modal-body"><div class="progress progress-info wait"><div class="bar" style="width: 0%"></div></div></div><div class="modal-footer"></div>';
        var inc = ((100 / time) / 4);
        var popup = popupService.getPopup(true);
        popup.html(waitHtml);
        var cur = 0;

        var bar = popup.find('.wait > .bar');
        var timer = setInterval(function(){
            cur += inc;
            bar.css("width", + cur + "%");
            if(cur >= 100) {
                clearInterval(timer);
                setTimeout(popupService.close, 250);
            }
        },250);        

        popupService.compileAndRunPopup(popup, scope, options); 
    }
    // Loads the popup
    popupService.load = function(url, scope, options)
    {
        var htmlPage = '<div class="modal-header"><h1>Header</h1></div><div class="modal-body">Body</div><div class="modal-footer"><a class="btn btn-success" ng-click="doIt()">Do it</a><a class="btn btn-cancel" ng-click="cancel()">Cancel</a></div>';

        $http.get(url).success(function (data) {
        
            var popup = popupService.getPopup(true);
            // Tried getting this to work with the echo and a post, with no luck, but this gives you the idea
            // popup.html(data);
            popup.html(htmlPage);
            popupService.compileAndRunPopup(popup, scope, options);
        });    
    }

    
    popupService.close = function()
    {
        var popup = popupService.getPopup()
        if (popup)
        {
            popup.modal('hide');
            popup.html('');
        }
    }

    return popupService;
}]);
