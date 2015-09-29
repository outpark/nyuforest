(function() {
  angular.module('forest', [
    'ngRoute'
  ])
  .config(['$routeProvider', '$httpProvider', '$locationProvider', 'NotificationProvider',
  function ($routeProvider, $httpProvider, $locationProvider, NotificationProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'index.ejs'
    }).
    when('/user', {
      templateUrl: 'user.ejs',
      controller: 'userCtrl'
    }).
    when('/register', {
      templateUrl: 'register.ejs',
      controller: 'authCtrl'
    }).
    when('/board', {
      templateUrl: 'board.ejs'
    }).
    when('/about', {
      templateUrl: 'about.ejs'
    });




  }]);





})();
