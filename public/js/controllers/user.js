(function(){
var app = angular.module('forest');
//console.log("Hello World from controller");

  app.controller('userCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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
          $http.post('/api/users/signin', userData).success(function(res) {
            console.log(res);
            console.log("Logging in");
            if (res.type === false){
              $scope.error = "등록되지 않은 유저이거나 비밀번호가 틀렸네요.";
              console.log(res.data);
            } else if (res.type === true){
              console.log("Logged in");
              $location.path("/board");
              $scope.message = "환영합니다!";

            }
          });
      }
    };

  }]);

})();
