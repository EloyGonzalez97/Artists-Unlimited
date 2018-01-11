app.config(function($stateProvider){
    $stateProvider
        .state('submitMusic', {
        url: '/submitMusic',
        templateUrl: 'js/home/views/submit_music.html',
        controller: 'submitMusicController'
    });
});
app.controller('submitMusicController', function($scope, $http, $window, shareService, $anchorScroll, $location, $uibModal) {
    $scope.fileShow = false;
    $scope.recordShow = false;
    $scope.scPicked = false;
    $scope.spPicked = false;
    window.location.hash = '';
    
    //function to highlight the platforms, and show spotify link, soundcloud link, and file opener 
    $(".platform-cards-list-item").off('click').on("click", function(event){
         $(this).toggleClass("highlight");
        if($(this).hasClass("blog")){
            $scope.fileShow = !$scope.fileShow;
        }
        if($(this).hasClass("record")){
            $scope.recordShow = !$scope.recordShow;
        }
        if($(this).hasClass("soundcloud")){
            $scope.scPicked = !$scope.scPicked;
            console.log("SC: "+$scope.scPicked);
        }
        if($(this).hasClass("spotify")){
            $scope.spPicked = !$scope.spPicked;
            console.log("Spotify: "+$scope.scPicked);
        }
    }); 
    $(document).ready(function(){
        if($('body').hasClass('pushed')){
            $('body').removeClass('pushed');
        }
    });
    var redirect = false;
    var match = false;
    $scope.wrong = false;
    //goes through each platform icon and checks if it has been clicked and checks if emails also match
    $scope.signUpUser = function(){
        var email = $scope.email;
        var confirm = $scope.confirmemail;
        console.log(email);
        console.log(confirm);
        $(".platform-cards-list-item").each(function() {
            if($(this).hasClass("highlight")) {
                redirect = true;
                //add into array of platforms clicked
            }
            if(email.localeCompare(confirm) == 0){
                    match = true;
            }
        });
        //if no panels have been clicked or email do not match 
        if(redirect === false){
            $("#error").css("opacity", 1);
            window.location.hash = '#anchor'; //redirects to top of the page
            $scope.wrong = true;
        }
        if(match === false){
            $(".check").css("color", "red");
            $(".emailinput").css("border", "1px solid red");
        }
        //if a panel has been clicked and emails match send emails and redirect
        if(redirect === true && match === true){
            shareService.setInfo(email);
            $scope.processing = true;
            window.location.href = '/confirmMusic';
        }
    }
});
               