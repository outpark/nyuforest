(function(){
var app = angular.module('forest');
console.log("Hello World from controller");

app.controller('homeCtrl', ['$scope', '$http', function($scopes, $http) {
  console.log("Hello World from homeCtrl");
  //
  // $http.get('/api').success(function(res) {
  //           $scope.obj = res;
  //       });


}]);

})();
