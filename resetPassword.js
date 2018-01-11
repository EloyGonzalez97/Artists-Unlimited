app.config(function($stateProvider){
    $stateProvider
        .state('resetPassword', {
        url: '/login/resetPassword/:token',
        templateUrl: 'js/login/resetPassword.html',
        controller: 'resetPasswordController'
    });
});
app.controller('resetPasswordController', function($stateParams, $scope, $http, $window){
    "use strict";
    var token = $stateParams.token;
    $http.get('/api/users/resetPassword/'+token, {params: {'token': token}}).then(function(response){
            if(!response.data.exists){
              // //$.Zebra_Dialog("You do not have the authorization to reset your password ");
              //   /*window.setTimeout(function(){
              //       window.location.href = '/admin';
              //   }, 3000);*/
            }
    }).catch(function(response){

                $.Zebra_Dialog("Trouble connecting with server, attempt to reset your password again");
                window.setTimeout(function(){
                    window.location.href = '/admin';
                }, 4000);
    });

    $scope.changePassword = function(){
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        if(password.localeCompare(confirmPassword) !=0){
            $scope.passwordError = "*Passwords do not match";
        }else{
            //check the token, make sure it is in the database and if it is then get the user info and create the new password
            //and save the password to the database


            $http.post('/api/users/resetPassword/:token', {'token': token, 'password': password}).then(function(response){
                $scope.header = response.data.message;
                if(response.data.exists){
                        $.Zebra_Dialog("Password was reset.");
                        window.setTimeout(function(){
                            window.location.href = '/admin';
                        }, 4000);
                    }else{
                        $.Zebra_Dialog("Link has expired, get a new reset link by going to Forget Password in login screen.");
                        window.setTimeout(function(){
                            window.location.href = '/admin';
                        }, 5000);
                    }

            }).catch(function(response) {
                $.Zebra_Dialog("Problem with server, attempt reset link in a couple of minutes");
                window.setTimeout(function(){
                    window.location.href = '/admin';
                }, 5000);
        });

        }


    }


});
