(function(){
'use strict';

var app = angular.module('forest');
app.controller('readCtrl', ["$scope", "$http", "$location", "$routeParams", "$route", 'Notification',
  function($scope, $http, $location, $routeParams, $route, Notification) {
    $http.get("/api/posts/" + $routeParams.post_id).success(function(res) {
      if(res.success===false){
        console.error("Something went wrong.");
      }else {
        $scope.post = res.data;
      }
    });

    $http.get("/api/posts/" + $routeParams.post_id + "/comments")
      .success(function(res){
        if(res.success===false){
          console.log('error occured while finding comments');
        } else {
          $scope.comments = res.data;
        }
    });

    $scope.submit = function() {
      if(!$scope.comment){
        Notification.error("내용을 입력해 주세요.");
      } else {
        var data = {
          "content" : $scope.comment
        };
        $http.post("/api/posts/" + $routeParams.post_id + "/comments", data)
          .success(function(res){
            if(res.success===false){
              console.log(res.message);
            } else if(res.success===true) {
              $scope.comment = "";
              $http.get("/api/posts/" + $routeParams.post_id + "/comments")
                .success(function(res){
                  if(res.success===false){
                    console.log('error occured while finding comments');
                  } else {
                    $scope.comments = res.data;
                  }
              });
            }
          });
      }

    };

  }]);

})();
