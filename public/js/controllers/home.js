(function(){
var app = angular.module('forest');

app.controller('homeCtrl', ['$scope', '$http','$localStorage', 'Notification',
 function($scopes, $http, $localStorage, Notification) {
  // console.log("Hello World from homeCtrl");
  //
  // $http.get('/api').success(function(res) {
  //           $scope.obj = res;
  //       });
  if($localStorage.token){
		Notification.success("환영합니다!");
	} else if(!$localStorage.token) {
    Notification.info("로그인 또는 회원가입을 해주세요.");
  }



}]);

})();
