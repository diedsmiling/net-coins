'use strict';

adminAppControllers.controller('loginController', [
    '$scope','$location', '$localStorage', 'Auth',
    function($scope, $location, $localStorage, Auth){
        $scope.a = {name: 'Alex', planet: 'Mars'};
        $scope.b = {name: 'Natasha', planet: 'Venus'};

        $scope.token = $localStorage.token;
        $scope.tokenClaims = Auth.getTokenClaims();

        $scope.successAuth = function(result){
            $scope.token =  $localStorage.token = result.token;
            $location.path('/index');
        }

        $scope.errorAuth = function(error){
            console.warn(error);
            return false;
        }

        $scope.login = function(){
            Auth.login($scope.data, $scope.successAuth, $scope.errorAuth);
            return false;
        }

        $scope.logout = function(){
            Auth.logout(function(){
                delete $scope.token;
                delete $scope.tokenClaims;
                $location.path('/');
            });
        }
    }
]);
adminAppDirectives.directive('ncLoginDebugger', function(){
    return {
        restrict: 'E',
        templateUrl: 'common/directives/debugger.tpl.html'
    }
});

adminAppDirectives.directive('ncPlaceholder', function($interval, dateFilter){

    function link(scope, element, attrs){
        var defaultPh = attrs.ncPlaceholder,
            fStarted = false,
            timeout = null,
            modelBinding = attrs.ngModel;

        addDefaultPh();

        scope.$watch(modelBinding, function(value){
            if(fStarted && value != ''){
                clearTimeout(timeout)
                element.removeAttr('placeholder');
            }
            else
                timeout= setTimeout(function(){
                    addDefaultPh();
                }, 140)
            fStarted = true;
        });

        function addDefaultPh(){
            element.attr('placeholder', defaultPh);
        }
    }

    return {
        restrict: 'A',
        link: link
    }
});