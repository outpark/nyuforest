(function() {
'use strict';

var app = angular.module('forest');

app.controller('boardCtrl', ["$scope", "$http", function($scope, $http) {
  $http.get("/api/posts").success(function(res) {
    $scope.posts = res.data;
  });




}]);
})();
