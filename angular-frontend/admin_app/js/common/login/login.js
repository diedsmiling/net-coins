'use strict';

var adminAppControllers = angular.module('adminAppControllers', []);

adminAppControllers.controller('loginController', [
    '$scope','$location', '$localStorage', 'Auth',
    function($scope, $location, $localStorage, Auth){
        $scope.token = $localStorage.token;
        $scope.tokenClaims = Auth.getTokenClaims();
        console.log($scope.tokenClaims);

        $scope.successAuth = function(){
            console.log('URAAA!');
        }

        $scope.errorAuth = function(error){
            alert(error);
        }

        $scope.login = function(){
            Auth.login($scope.data, $scope.successAuth, $scope.errorAuth)
        }
    }
]);
