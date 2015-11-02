(function(){
var app = angular.module('forest');
//console.log("Hello World from controller");

  app.controller('userCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    console.log("Hello World from controller");

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
          $http.post('/api/user', userData).success(function(res) {
            console.log(res);

            if (res.type === false){
              $scope.error = "등록되지 않은 유저이거나 비밀번호가 틀렸네요.";

            } else if (res.type !== false){
              $scope.message = "환영합니다!";
              $location.path("/");
            }


          });
      }
    };

  }]);

})();
