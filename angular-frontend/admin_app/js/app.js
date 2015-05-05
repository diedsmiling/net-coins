var adminApp = angular.module('adminApp', [
    'ngStorage',
    'ngRoute',
    'ngAnimate',
    'adminAppControllers',
    'adminAppDirectives'

]);

adminApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'common/login/login.tpl.html',
            controller: 'loginController'
        })
        .when('/index', {
            templateUrl: 'index/index.tpl.html',
            controller: 'indexController'
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
                        if($location.$$path != '/')
                            $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);

var adminAppControllers = angular.module('adminAppControllers', []),
    adminAppDirectives  = angular.module('adminAppDirectives', []);