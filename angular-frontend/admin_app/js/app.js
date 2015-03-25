var adminApp = angular.module('adminApp', [
    'ngStorage',
    'ngRoute',
    'adminAppControllers'
]);

//angular.module("adminApp").run(["$templateCache", function($templateCache) {$templateCache.put("common/login.tpl.html","<section class=\"sign_in_module row\"><div class=\"col-xs-4 col-xs-offset-4 row\"><div class=\"sign_in_module_header\"><span class=\"bigBoy\">Net-coins.ru</span></div><div class=\"sing_in_content\"><form><div class=\"form-group\"><input id=\"username\" type=\"text\"></div><div class=\"form-group\"><input id=\"password\" type=\"password\"></div><div class=\"form-group\"><button class=\"btn btn-primary\" type=\"submit\">Login</button></div></form></div></div></section>");}]);

adminApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'common/login/login.tpl.html',
            controller: 'loginController'
        });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete $localStorage.token;
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);