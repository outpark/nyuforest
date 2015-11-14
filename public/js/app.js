(function() {

  angular.module('forest', [
    'ngRoute',
    // 'angular-sanitize',
    'textAngular'
  ])
  .config(['$routeProvider', '$httpProvider', '$locationProvider',
  function ($routeProvider, $httpProvider, $locationProvider) {
    console.log("hello world from app.js");
    $routeProvider.
    when('/', {
      templateUrl: 'tpl/home.html',
      controller: 'homeCtrl'
    }).
    when('/users', {
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
    }).
    when('/post', {
      templateUrl: 'tpl/post.html',
      controller: 'editorCtrl'
    })
    .otherwise({templateUrl: '/tpl/404/html'});
    // $locationProvider.html5Mode(true);




  }]);





})();
