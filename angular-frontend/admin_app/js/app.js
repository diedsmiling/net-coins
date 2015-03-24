var adminApp = angular.module('adminApp', ['ngRoute', 'adminAppControllers']);

angular.module("adminApp").run(["$templateCache", function($templateCache) {$templateCache.put("common/login.tpl.html","<section class=\"sign_in_module row\"><div class=\"col-xs-4 col-xs-offset-4 row\"><div class=\"sign_in_module_header\"><span class=\"bigBoy\">Net-coins.ru</span></div><div class=\"sing_in_content\"><form><div class=\"form-group\"><input id=\"username\" type=\"text\"></div><div class=\"form-group\"><input id=\"password\" type=\"password\"></div><div class=\"form-group\"><button class=\"btn btn-primary\" type=\"submit\">Login</button></div></form></div></div></section>");}]);

adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'common/login.tpl.html',
            controller: 'loginController'
        });
    }
]);