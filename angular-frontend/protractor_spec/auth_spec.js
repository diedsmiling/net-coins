'use strict';
describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://localhost:8000/admin/login');
        expect(browser.getTitle()).toEqual('Angular Admin App');
    });

    it('should redirect on successful authentication', function(){
        browser.get('http://localhost:8000/admin/login');
        element(by.model('data.email')).sendKeys('diedsmiling@gmail.com');
        element(by.model('data.password')).sendKeys('123');
        element(by.model('data.submit_button')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/admin/login#/index');
    });
});