(function() {
  'use strict';
  angular.module('forest', [
    'ngStorage',
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

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
  }]);
})();
