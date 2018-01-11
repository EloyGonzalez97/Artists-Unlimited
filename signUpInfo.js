app.config(function($stateProvider){
    $stateProvider
        .state('signUpInfo', {
        url: '/login/signUpInfo',
        templateUrl: 'js/login/signUpInfo.html',
        controller: 'signUpInfoController'
    });
});
app.controller('signUpInfoController', function($scope, $http, $window, shareService) {
    
    $scope.artist = function(){
        shareService.setApply("true");
        window.location.href = '/login/artistLogin';
    }
    $scope.partner = function(){
        shareService.setApply("true");
        window.location.href = '/login/partnerLogin';
    }
});