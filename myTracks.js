app.directive('tracks', function($http) {
  return {
    templateUrl: 'js/common/directives/myTracks/myTracks.html',
    restrict: 'E',
    scope: false,
    controller: function trackController($rootScope, $state, $scope, $http, AuthService, $window, SessionService) {
        var user = SessionService.getUser();
        var email = user.email;
        $scope.trackList = [];
        $scope.trackListObj = null;
        if(email){
        $scope.getTrackListFromSubmissions = function() { //gets all the submissions from the artist user
            $http.get('api/submissions/byEmail/' + email).then(function (tracks) {
                $scope.trackList = tracks.data.submissions;
                console.log(tracks.data.submissions);
            }).then(function (error) {

            });
        }
        }else{
            
        }
        
        
    }
  }
});