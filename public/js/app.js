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
      templateUrl: '../views/partials/home.html',
      controller: 'homeCtrl'
    }).
    when('/users', {
      templateUrl: '../views/partials/user.html',
      controller: 'userCtrl'
    }).
    when('/register', {
      templateUrl: '../views/partials/register.html',
      controller: 'authCtrl'
    }).
    when('/board', {
      templateUrl: '../views/partials/board.html'
    }).
    when('/about', {
      templateUrl: '../views/partials/about.html'
    }).
    when('/post', {
      templateUrl: '../views/partials/post.html',
      controller: 'editorCtrl'
    })
    .otherwise({templateUrl: '../views/partials/404/html'});
    // $locationProvider.html5Mode(true);




  }]);





})();
