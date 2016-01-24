(function(){
var app = angular.module('forest');
//console.log("Hello World from controller");

  app.controller('userCtrl', ['$scope', '$http', '$location', '$rootScope', '$localStorage', '$route','Auth', function ($scope, $http, $location, $rootScope, $localStorage, $route, Auth) {
    console.log("Hello World from usercontroller");

    if($localStorage.token){
      console.log("going to auth");
      Auth.me(function(res) {
        if(res.data.type === true){
          if(res.data.data.username){
            $rootScope.auth={
              username:res.data.data.username,
              email:res.data.data.email,
              token:res.data.data.token
            };
          } else {
            console.log("logged out");
            Auth.logout();
          }
        } else if(res.data.type === false){
          console.log("me is not working");
          console.log(res.data);
        }
      });
    }
    $scope.signin = function (){
      if(!$scope.username){
        $scope.error = "Username required!";
      } else if(!$scope.password) {
        $scope.error = "Password required!";
      } else {
        console.log($scope.username);
        var userData = {
          username: $scope.username,
          password: $scope.password
          };
          Auth.signin(userData, function(success, error) {
            if(error){
              console.log("error in controller");
              $scope.error = "등록되지 않은 유저이거나 비밀번호가 틀렸네요.";
            }else if(success.data.type === false){
              $scope.error = "등록되지 않은 유저이거나 비밀번호가 틀렸네요.";
            }else if(success.data.type === true){
            console.log("A user logged in");
            console.log("CONTROLLER says: ", success.data);
            $localStorage.token = success.data.token;
            $scope.message = "환영합니다!";
            $rootScope.auth = {
              username: success.data.username
            };
            console.log(success.data.username);
            $location.path("/board");

            }
          });
      }
    };

    $scope.signout = function(){
      console.log("Signout!");
      Auth.logout();
      $rootScope.auth = null;

    };

    // (function(){

    // })();
  }]);

})();
