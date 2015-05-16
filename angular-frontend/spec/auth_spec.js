/**
 * Created by ripburger on 3/31/15.
 */
describe('loginController', function() {

    beforeEach(module('adminApp'));

    var $controller, scope, ctrl, Auth, resp,
        tokenResponse = function(){
            return {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJzdWIiOiIxIiwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FkbWluXC9hdXRoIiwiaWF0IjoiMTQyNzgzMzc4NyIsImV4cCI6IjE0Mjc4MzczODciLCJuYmYiOiIxNDI3ODMzNzg3IiwianRpIjoiODc1NDgwZTZiZTI5ZTg0OWE4NmUyMGVhNmQ5MzliZDYifQ.YWJjYjA2NDJjMGVjM2M0ZjZlOGMxMTNlMGVlYzMxNzBmMzg1MWFlZjI3ZDc5OWEwYTcyMTgyZTdjNzAxOTk1YQ'};
        },
        tokenClaims = function(){
            return {
              exp: '1427837387',
              iat: '1427833787',
              iss: 'http://localhost:8000/admin/auth',
              jti: '875480e6be29e849a86e20ea6d939bd6',
              nbf: '1427833787',
              sub: '1'
            }
        };

    beforeEach(inject(function($localStorage, _Auth_, _$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        Auth = _Auth_;
        scope = $rootScope.$new();
        ctrl = $controller('loginController', {$scope: scope});

    }));

    it('Login function', function(){
        delete scope.token;
        expect(scope.token).not.toBeDefined();
        scope.data = {email: 'diedsmiling@gmail.com', password: 'passwordWrong'}
        $httpBackend.whenPOST('/admin/auth', scope.data).respond(401);
        scope.login(scope.data, scope.successAuth, scope.errorAuth);
        $httpBackend.flush();
        expect(scope.token).not.toBeDefined();

        scope.data = {email: 'diedsmiling@gmail.com', password: 'password'}
        $httpBackend.whenPOST('/admin/auth', scope.data).respond(tokenResponse());
        scope.login(scope.data, scope.successAuth, scope.errorAuth);
        $httpBackend.flush();
        resp = tokenResponse();
        expect(scope.token).toEqual(resp.token);
        expect(scope.tokenClaims).toEqual(tokenClaims());
    });

    it('Logout function', function(){
        scope.logout();
        expect(scope.token).not.toBeDefined();
        expect(scope.tokenClaims).not.toBeDefined();
    });
});