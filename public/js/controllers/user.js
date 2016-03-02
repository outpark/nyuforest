(function(){
var app = angular.module('forest');
//console.log("Hello World from controller");

  app.controller('userCtrl', ['$scope', '$http', '$location', '$rootScope', '$localStorage', '$route','Auth', 'Notification',
  function ($scope, $http, $location, $rootScope, $localStorage, $route, Auth, Notification) {

    if($localStorage.token){
      Auth.me(function(res) {
        if(res.data.type === true){
          if(res.data.data.username){
            $rootScope.auth={
              username:res.data.data.username,
              email:res.data.data.email,
              token:res.data.data.token
            };
          } else {
            Notification.info("로그아웃 되었습니다.");
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
        Notification.error("아이디를 입력해 주세요");
      } else if(!$scope.password) {
        Notification.error("비밀번호를 입력해 주세요");
      } else {
        console.log($scope.username);
        var userData = {
          username: $scope.username,
          password: $scope.password
          };
          Auth.signin(userData, function(success, error) {
            if(error){
              console.log("error in controller");
              Notification.error("등록되지 않은 유저이거나 비밀번호가 틀렸네요.");
            }else if(success.data.type === false){
              Notification.error("등록되지 않은 유저이거나 비밀번호가 틀렸네요.");
            }else if(success.data.type === true){
            $localStorage.token = success.data.token;
            $rootScope.auth = {
              username: success.data.username
            };
            Notification.success("환영합니다." + " " + success.data.username + "님");
            $('#signin').modal('hide');
            $location.path("/board");

            }
          });
      }
    };

    $scope.signout = function(){
      Notification.info("로그아웃 되었습니다.");
      Auth.logout();
      $rootScope.auth = null;

    };

    // (function(){

    // })();
  }]);

})();
