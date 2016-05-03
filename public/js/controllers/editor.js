(function(){
var app = angular.module('forest');

app.controller('editorCtrl',['$scope', '$http', '$location', function($scope, $http, $location){

$scope.title = "";
$scope.body = "";
$scope.category = "";
$scope.submit = function() {
  if($scope.title.length <= 1) {
    console.error("A title must exist");
    console.log($scope.title.length);
  }else if($scope.body.length <= 3){
    console.error("Contents must exist");
    console.log($scope.body.length);
  }else {
    switch($scope.category){
      case "자유 게시판":
        $scope.category = "free";
        break;
      case "사람을 구해요 게시판":
        $scope.category = "job";
        break;
      case "맛집 리뷰":
        $scope.category = "food";
        break;
      case "사고 팔아요 게시판":
        $scope.category = "sell";
        break;
      case "정보 공유 게시판":
        $scope.category = "info";
        break;
      case "운영자/개발자에게 게시판":
        $scope.category = "letter";
        break;
      default:
        $scope.category = "free";
        break;
    }
    var data = {
      "title" : $scope.title,
      "content" : $scope.body,
      "category": $scope.category
    };
    $http.post('/api/posts', data).success(function(res){
      if(res.success === false){
        console.error(res.message);
        console.log("Something went wrong");
      }else {
        console.log("Successfully posted");
        // console.log(res.data);
        $location.path("/board");
      }
    });
  }
};



}]);



})();
