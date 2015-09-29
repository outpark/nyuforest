(function(){
var app = angular.module('forest', []);
//console.log("Hello World from controller");

app.controller('userCtrl', ['$scope', '$http', function ($scope, $http) {
console.log("Hello World from controller");

$scope.signin = function (){
  if(!$scope.email){
    $scope.error = "Email required!";
  } else if(!$scope.password) {
    $scope.error = "Password required!";
  } else {
    console.log($scope.email);
    var userData = {
      email: $scope.email,
      password: $scope.password
      };
      $http.post('/user', userData).success(function(response) {
        console.log(response);
        $scope.message = "환영합니다!";
      });
  }
};

}]);

})();
