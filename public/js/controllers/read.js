(function(){
'use strict';

var app = angular.module('forest');
app.controller('readCtrl', ["$scope", "$http", "$location", "$routeParams", "$route",
  function($scope, $http, $location, $routeParams, $route) {
    $http.get("/api/posts/" + $routeParams.post_id).success(function(res) {
      if(res.type===false){
        console.error("Something went wrong.");
      }else {
        $scope.post = res.data;
      }
    });


  }]);

})();
