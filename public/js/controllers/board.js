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
