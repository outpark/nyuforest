(function(){
'use strict';

var app = angular.module('forest');
app.controller('readCtrl', ["$scope", "$http", "$location", "$routeParams", "$route", 'Notification',
  function($scope, $http, $location, $routeParams, $route, Notification) {
    $http.get("/api/post/" + $routeParams.post_id).success(function(res) {
      if(res.success===false){
        console.error("Something went wrong.");
      }else {
        $scope.post = res.data;
        $scope.up_count = res.data.ups;
        $scope.down_count = res.data.downs;
      }
    });

    $http.get("/api/post/" + $routeParams.post_id + "/comments")
      .success(function(res){
        if(res.success===false){
          console.log('error occured while finding comments');
        } else {
          $scope.comments = res.data;
        }
    });
    $scope.up = function(){
      $http.put('/api/post/'+$routeParams.post_id+"/up").success(function(res){
        if(res.success === false){
          Notification.error("Something went wrong. Contact the developer.");
        }else{
          if(res.data.is_up === true){
            Notification.success("업 되었습니다.");
            $scope.up_count = res.data.up_count;
          }else{
            Notification.success("이미 투표 하셨습니다.");
            $scope.up_count = res.data.up_count;
          }
        }
      });
    };

    $scope.down = function(){
      $http.put('/api/post/'+$routeParams.post_id+"/down").success(function(res){

        if(res.success === false){
          Notification.error("Something went wrong. Contact the developer.");
        }else{
          if(res.data.is_down === true){
            Notification.success("다운 시켰습니다.");
            $scope.down_count = res.data.down_count;
          }else{
            Notification.success("이미 투표 하셨습니다.");
            $scope.down_count = res.data.down_count;
          }
        }
      });
    };


    $scope.submit = function() {
      if(!$scope.comment){
        Notification.error("내용을 입력해 주세요.");
      } else {
        var data = {
          "content" : $scope.comment
        };
        $http.post("/api/post/" + $routeParams.post_id + "/comments", data)
          .success(function(res){
            if(res.success===false){
              console.log(res.message);
            } else if(res.success===true) {
              $scope.comment = "";
              $http.get("/api/post/" + $routeParams.post_id + "/comments")
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
