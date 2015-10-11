(function(){
var app = angular.module('forest');

app.controller('editorCtrl',['$scope', '$http', '$location', function($scope, $http, $location){
console.log("HW from editorCtrl!");

$scope.orightml = "Write here!";
$scope.htmlcontent = $scope.orightml;



}]);



})();
