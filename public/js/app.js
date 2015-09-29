(function() {
  angular.module('forest', [
    'ngRoute'
  ])
  .config(['$routeProvider', '$httpProvider', '$locationProvider',
  function ($routeProvider, $httpProvider, $locationProvider) {
    console.log("hello world from app.js");
    $routeProvider.
    when('/', {
      templateUrl: 'tpl/home.html',
      controller: 'homeCtrl'
    }).
    when('/user', {
      templateUrl: 'tpl/user.html',
      controller: 'userCtrl'
    }).
    when('/register', {
      templateUrl: 'tpl/register.html',
      controller: 'authCtrl'
    }).
    when('/board', {
      templateUrl: 'tpl/board.html'
    }).
    when('/about', {
      templateUrl: 'tpl/about.html'
    })
    .otherwise({templateUrl: '/tpl/404/html'});
    // $locationProvider.html5Mode(true);




  }]);





})();
