(function(){
var app = angular.module('forest');
//console.log("Hello World from controller");

  app.controller('userCtrl', ['$scope', '$http', '$location', '$rootScope', '$localStorage', 'Auth', function ($scope, $http, $location, $rootScope, $localStorage, Auth) {
    // console.log("Hello World from controller");

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
            console.log("Logged in");
            console.log("CONTROLLER says: ", success.data);
            $localStorage.token = success.data.token;
            $scope.message = "환영합니다!";
            $location.path("/board");
            }
          });
      }
    };

    (function(){
      Auth.me(function(res) {
        if(res.type === true){
          if(res.data.username){
            $rootScope.auth={
              username:res.data.username,
              email:res.data.email,
              token:res.data.token
            };
          } else {
            Auth.logout();
          }
        }
      });
    })();
  }]);

})();
