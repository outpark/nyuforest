(function() {
'use strict';

var app = angular.module('forest');

var pages = function(current, total){
  var list = [];
  var pageLimit = 5;
  var lowerLimit = current -2;
  var upperLimit = current +2;
  if(total < pageLimit){
    for(var i=1; i <= total;i++){
      if(i == current){
        list.push("["+i+"]");
      }else{
        list.push(i);
      }

    }
  }else{
    for(var j=lowerLimit;j<=current;j++){
      if(j == current){
        list.push("["+j+"]");
      }else{
        list.push(j);
      }
    }
    for(var k=current;k<=upperLimit;k++){
      list.push(k);
    }
  }
  return list;
};

app.controller('boardCtrl', ["$scope", "$http", "$routeParams", "Notification",
 function($scope, $http, $routeParams, Notification) {
   var currentPage;
   var index;
  $http.get("/api/posts").success(function(res) {
    $scope.posts = res.data;
    currentPage = res.currentPage;
    index = res.data[0]._id;
    $scope.pages = pages(Number(res.currentPage), Number(res.totalPage));
  });
  $scope.paging = function(page){
    if(typeof page === "number"){
      var skip = page - currentPage;
      $http.get("/api/posts/"+index+"/"+skip).success(function(res){
        $scope.posts = res.data;
        $scope.pages = pages(Number(res.currentPage), Number(res.totalPage));
        currentPage = res.currentPage;
        index = res.data[0]._id;
      });
    }else {
      Notification.info("Current Page");
    }
  };

}]);


app.controller('bestCtrl', ["$scope", "$http", function($scope, $http) {
    $http.get("/api/bests").success(function(res) {
      $scope.bests = res.data;
      // console.log("Coming from best");
      // console.log(res.data[0]);
      // $scope.up_count = res.data.ups;

    });
}]);
app.controller('categoryCtrl', ["$scope", "$http", "$routeParams", "Notification",
function($scope, $http, $routeParams, Notification) {
  var currentPage;
  var index;

  // I am neglecting the case of confliction b/w the category and school
  // My mistake for using category and school interchangebly. It's really confusing.

  // Identify the current user.
  var currentUser = $rootScope.auth;

  // this shuold validate of the user is subscribed to the school
  if(!currentUser.subscription.includes($routeParams.category)){
    Notification.error("You are not subscribed to this school. Please subscribe");
    return;
  }

  // this is the method for the user to subscribe to school. An AJAX request to API.
  $scope.subscribeToSchool = function(school) {
    $http.post('/api/board/subscribe/' + $routeParams.category + '/'+currentUser.username).success(function(res) {
      if(res.data[0] === false){
        Notification.error("You have failed to subscribe to this school");
        $location.path("/board");
      }else{
        Notification.info("You are now subscribed to the school.");

        $http.get("/api/board/"+$routeParams.category).success(function(res) {
          $scope.posts = res.data;
          // $scope.up_count = res.data.ups;
          currentPage = res.currentPage;
          if(res.data[0] === undefined){
            Notification.info("게시물이 존재하지 않습니다.");
          }else{
            index = res.data[0]._id;
          }
          $scope.pages = pages(Number(res.currentPage), Number(res.totalPage));
        });

      }
    });
  };

  $http.get("/api/board/"+$routeParams.category).success(function(res) {
    $scope.posts = res.data;
    // $scope.up_count = res.data.ups;
    currentPage = res.currentPage;
    if(res.data[0] === undefined){
      Notification.info("게시물이 존재하지 않습니다.");
    }else{
      index = res.data[0]._id;
    }
    $scope.pages = pages(Number(res.currentPage), Number(res.totalPage));
  });

  $scope.paging = function(page){
    if(typeof page === "number"){
      var skip = page - currentPage;
      $http.get("/api/board/"+$routeParams.category+"/"+index+"/"+skip).success(function(res){
        $scope.posts = res.data;
        $scope.pages = pages(Number(res.currentPage), Number(res.totalPage));
        currentPage = res.currentPage;
        index = res.data[0]._id;
      });
    }else {
      Notification.info("현재 페이지 입니다.");
    }
  };


}]);


})();
