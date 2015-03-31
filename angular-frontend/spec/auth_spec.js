/**
 * Created by ripburger on 3/31/15.
 */
describe('loginController', function() {

    beforeEach(module('adminApp'));

    var $controller, scope, ctrl, Auth, resp,
        tokenResponse = function(){
            return {"token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJzdWIiOiIxIiwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FkbWluXC9hdXRoIiwiaWF0IjoiMTQyNzgzMzc4NyIsImV4cCI6IjE0Mjc4MzczODciLCJuYmYiOiIxNDI3ODMzNzg3IiwianRpIjoiODc1NDgwZTZiZTI5ZTg0OWE4NmUyMGVhNmQ5MzliZDYifQ.YWJjYjA2NDJjMGVjM2M0ZjZlOGMxMTNlMGVlYzMxNzBmMzg1MWFlZjI3ZDc5OWEwYTcyMTgyZTdjNzAxOTk1YQ'};
        };

    beforeEach(inject(function($localStorage, _Auth_, _$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        Auth = _Auth_;
        scope = $rootScope.$new();
        ctrl = $controller('loginController', {$scope: scope});

    }));

    it('login function', function(){
        delete scope.token;
        expect(scope.token).not.toBeDefined();
        scope.data = {email: 'diedsmiling@gmail.com', password: '1234'}
        $httpBackend.whenPOST('/admin/auth', scope.data).respond(401);
        scope.login(scope.data, scope.successAuth, scope.errorAuth);
        $httpBackend.flush();
        expect(scope.token).not.toBeDefined();


        scope.data = {email: 'diedsmiling@gmail.com', password: '123'}
        $httpBackend.whenPOST('/admin/auth', scope.data).respond(tokenResponse());
        scope.login(scope.data, scope.successAuth, scope.errorAuth);
        $httpBackend.flush();
        resp = tokenResponse();
        expect(scope.token).toEqual(resp.token);



    });
});