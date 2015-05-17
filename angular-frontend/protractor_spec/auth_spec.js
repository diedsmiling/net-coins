'use strict';
describe('Net-coins admin authentication', function() {

    beforeEach(function(){
        browser.get('http://localhost:8000/admin/login');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Angular Admin App');
    });

    it('should redirect on successful authentication', function(){
        element(by.model('data.email')).sendKeys('diedsmiling@gmail.com');
        element(by.model('data.password')).sendKeys('123');
        element(by.model('data.submit_button')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/admin/login#/index');
    });
});