(function(){
var app = angular.module('forest');

app.controller('authCtrl', ['$scope', '$http', '$location', '$rootScope', '$localStorage', 'Auth', 'Notification',
function ($scope, $http, $location, $rootScope, $localStorage, Auth, Notification) {
// console.log("Hello World from auth controller");

$http.get('/api/register').success(function(res) {
          $scope.obj = res;
      });





$scope.register = function (){
  if(!$scope.email){
    Notification.error("이메일을 입력해 주세요.");
  } else if(!$scope.password) {
    Notification.error("비밀번호를 입력해 주세요.");
  } else if(!$scope.username) {
    Notification.error("아이디를 입력해 주세요.");
  } else if(!$scope.confirm) {
    Notification.error("비밀번호를 확인해 주세요.");
  } else if($scope.confirm != $scope.password) {
    Notification.error("동일한 비밀번호를 입력해 주세요.");
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
          Notification.error(error.message);
        }else if (success.data.type === false){

        Notification.error("이미 존재하는 사용자입니다");
        }
        else if (success.data.type === true){

        $localStorage.token = success.data.token;
        $rootScope.auth = {
          username: success.data.username
        };
        $('#signup').modal('hide');
        Notification.success("반갑습니다." + " " + success.data.username + "님");
        $location.path("/");
        }

      });

  }
};

}]);

})();
