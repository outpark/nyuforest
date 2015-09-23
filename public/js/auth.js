(function(){
var app = angular.module('forest', []);
//console.log("Hello World from controller");

app.controller('authCtrl', ['$scope', '$http', function ($scope, $http) {
console.log("Hello World from controller");

$scope.register = function (){
  if(!$scope.email){
    $scope.error = "Email required!";
  } else if(!$scope.password) {
    $scope.error = "Password required!";
  } else if(!$scope.username) {
    $scope.error = "Username required!";
  } else if(!$scope.confirm) {
    $scope.error = "You have to confirm your password!";
  } else if($scope.confirm != $scope.password) {
    $scope.error = "Please, check you password again.";
  } else {
    console.log($scope.email);
    var userData = {
      email: $scope.email,
      username: $scope.username,
      password: $scope.password
    };
  }
};

}]);

})();
