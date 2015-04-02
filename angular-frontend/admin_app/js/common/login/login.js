'use strict';

adminAppControllers.controller('loginController', [
    '$scope','$location', '$localStorage', 'Auth',
    function($scope, $location, $localStorage, Auth){
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
