
app.config(function($stateProvider) {
    $stateProvider
        .state('forgotPassword', {
        url: '/admin/forgotPassword',
        templateUrl: 'js/login/forgotPassword.html',
        controller: 'forgotPasswordController'
    });
});

//var app = angular.module("forgotPasswordPage", []);
//sets email to variables, checks if emails match and if they do probe database for email to redirect
app.controller("forgotPasswordController", function ($scope, $http, $window) {
    "use strict";
    $scope.verifyEmail = function () {
        $scope.emailError = "";
        var email = $scope.email;
        var confirmEmail = $scope.confirmEmail;
        if(email && confirmEmail) {
            if(email.localeCompare(confirmEmail) != 0){
                $scope.emailError = "*Emails do not match.";
                //compares to see if emails match
            }else{
            //Makes call to server to verify if email exists in database
                console.log("here");
                $http.post('/api/users/passwordReset', {'email': email}).then(function(response) {
                        //Email exists in db, gives user dialog box that tells email was sent
                        //Should send email with link to reset password page
                        $scope.emailError = response.data.message.toString();
                       if(response.data.exists){  
                            $.Zebra_Dialog("Instructions were sent to your email.");
                           window.setTimeout(function(){
                            window.location.href = '/admin';
                           }, 3000);
                           
                        }    
                }).catch(function(response) {
                    $scope.emailError = "*Error connecting to server.";
                    //catches any errors of server
                });



            }
        }
    }
});

