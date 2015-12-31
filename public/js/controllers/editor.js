(function(){
var app = angular.module('forest');

app.controller('editorCtrl',['$scope', '$http', '$location', function($scope, $http, $location){

$scope.orightml = "Write here!";
$scope.htmlcontent = $scope.orightml;

$scope.title = "";
$scope.body = "";
$scope.submit = function() {
  if($scope.title.length <= 1) {
    console.error("A title must exist");
    console.log($scope.title.length);
  }else if($scope.body.length <= 3){
    console.error("Contents must exist");
    console.log($scope.body.length);
  }else {
    var data = {
      "title" : $scope.title,
      "body" : $scope.body
    };
    $http.post('/api/posts', data).success(function(res){
      if(res.type === false){
        console.error(res.message);
        console.log("Something went wrong");
      }else {
        console.log("Successfully posted");
        console.log(res.data);
        $location.path("/board");
      }
    });
  }
};



}]);



})();
