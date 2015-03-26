'use strict';

adminAppControllers.controller('loginController', [
    '$scope','$location', '$localStorage', 'Auth',
    function($scope, $location, $localStorage, Auth){
        $scope.token = $localStorage.token;
        console.log(Auth);
        $scope.tokenClaims = Auth.getTokenClaims();

        $scope.successAuth = function(result){
            console.log(result.token);
            $localStorage.token = result.token;
            $location.path('/index');
            //window.location = "/"
        }

        $scope.errorAuth = function(error){
            alert(error);
        }

        $scope.login = function(){
            Auth.login($scope.data, $scope.successAuth, $scope.errorAuth)
        }

        $scope.logout = function(){
            Auth.logout(function(){
                $location.path('/');
            });
        }
    }
]);
