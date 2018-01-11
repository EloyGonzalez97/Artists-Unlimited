app.config(function($stateProvider){
    $stateProvider
        .state('partnerLogin', {
        url: '/login/partnerLogin',
        templateUrl: 'js/login/partnerLogin.html',
        controller: 'partnerLoginController'
    });
});
app.controller('partnerLoginController', function($scope, $http, $window, shareService) {
    var bool;
    if(shareService.getApply().localeCompare("false") == 0){
        bool = false;
    }
    else{
        bool = true;
    }
    console.log(shareService.getApply());
    $scope.sign = bool;
    $scope.firstPage = true;
    
    $scope.clicked = function(){
        var SUemail = $scope.SUemail;
        var SUconfirmemail = $scope.SUconfirmemail;
        var SUpass = $scope.SUpassword;
        var SUconfirmpass = $scope.SUconfirmpassword
        if(SUemail.localeCompare(SUconfirmemail) == 0){
            if(SUpass.localeCompare(SUconfirmpass) == 0){
                $scope.firstPage = false;
            }else{
                $scope.error = "*Passwords do not match";
            }
        }else{
            $scope.error = "*Emails do not match";
        }
    }
    $scope.login = function(){
        shareService.setApply("false");
        
    }
    $scope.apply = function(){
        shareService.setApply("true");
        
    }
    $(document).ready(function(){
        if($('body').hasClass('pushed')){
            $('body').removeClass('pushed');
        }
    });
    
});