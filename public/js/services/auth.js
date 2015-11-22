(function() {
  var app = angular.module('forest');

  app.factory('Auth', ['$http', '$localStorage', '$rootScope', '$location', function($http, $localStorage, $rootScope, $location){
        var baseUrl = "/api/";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        // function getUserFromToken() {
        //     var token = $localStorage.token;
        //     var user = {};
        //     if (typeof token !== 'undefined') {
        //         var encoded = token.split('.')[1];
        //         user = JSON.parse(urlBase64Decode(encoded));
        //     }
        //     return user;
        // }
        //
        // var currentUser = getUserFromToken();

        return {
            signup: function(data, success, error) {
                $http.post('/api/users/signup', data).then(success, error);
            },
            signin: function(data, success, error) {
                $http.post('/api/users/signin', data).then(success, error);
            },
            me: function(success, error) {
                $http.get('/api/users/me').then(success, error);
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                $location.path("/");
                // success();
            }
        };
    }
]);
})();
