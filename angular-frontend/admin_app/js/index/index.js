'use strict';

adminAppControllers.controller('indexController', [
    '$scope','$location', '$localStorage', 'Auth', 'Settings',
    function($scope, $location, $localStorage, Auth, Settings){
        $scope.smile = ':)';
        Auth.checkSession();
    }
]);
