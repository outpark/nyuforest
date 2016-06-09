(function(){
var app = angular.module('forest');

app.controller('editorCtrl',['$scope', '$http', '$location', "Notification",
function($scope, $http, $location, Notification){

$scope.title = "";
$scope.body = "";
$scope.category = {};
$scope.school = {};
$scope.submit = function() {
  if($scope.title.length <= 1) {
    Notification.error("제목을 입력해 주세요.");
    console.error("A title must exist");
    console.log($scope.title.length);
  }else if($scope.body.length <= 3){
    Notification.error("내용을 입력해 주세요.");
    console.error("Contents must exist");
    console.log($scope.body.length);
  }else {
    var data = {};
    console.log($scope.category);
    console.log($scope.school);
    if($scope.category.length > 0){
      data = {
        "title" : $scope.title,
        "content" : $scope.body,
        "category": $scope.category
      };
    }else if ($scope.school.length > 0){
      data = {
        "title" : $scope.title,
        "content" : $scope.body,
        "school": $scope.school
      };
    }else{
      Notification.error("카테고리를 입력해주세요.");
      console.error("Category must exist");
      return;
    }

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
