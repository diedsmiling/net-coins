/**
 * Created by ripburger on 3/31/15.
 */
describe('loginController', function() {
    beforeEach(module('adminApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.test', function() {
        it('Test', function() {
            var $scope = {};
            var controller = $controller('loginController', { $scope: $scope });
            console.log($scope);

            expect($scope.test).toEqual(1);
        });
    });
});