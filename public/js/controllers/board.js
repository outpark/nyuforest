(function() {
'use strict';

var app = angular.module('forest');

app.controller('boardCtrl', ["$scope", "$http", function($scope, $http) {
  $http.get("/api/posts").success(function(res) {
    $scope.posts = res.data;
  });



}]);

app.controller('categoryCtrl', ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
  $http.get("/api/board/"+$routeParams.category).success(function(res) {
    $scope.posts = res.data;
  });



}]);
})();
