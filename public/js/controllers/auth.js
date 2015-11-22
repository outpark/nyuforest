(function(){
var app = angular.module('forest');

app.controller('authCtrl', ['$scope', '$http', '$location', '$rootScope', '$localStorage', 'Auth', function ($scope, $http, $location, $rootScope, $localStorage, Auth) {
// console.log("Hello World from auth controller");

$http.get('/api/register').success(function(res) {
          $scope.obj = res;
      });

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
      Auth.signup(userData, function(success, error){
        if(error){
          console.log("error in controller");
          $scope.error = error.message;
        }else if (success.data.type === false){
        console.log("CONTROLLER says: ", success.data);
        $scope.error = "이미 존재하는 사용자입니다";
        }
        else if (success.data.type === true){
        console.log("CONTROLLER says: ", success.data);
        $localStorage.token = success.data.token;
        $location.path("/");
        }

      });

      // $http.post('/api/users/signup', userData).success(function(res) {
      //   console.log(res);
      //   if (res.type === false){
      //     $scope.error = res.message;
      //   }else{
      //     $scope.message = "환영합니다!";
      //     $location.path("/");
      //   }
      //
      // });
  }
};

}]);

})();
