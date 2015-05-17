'use strict';
describe('Testing ncPlaceholder directive', function() {

    var selector = 'data.email';

    beforeEach(function(){
        browser.get('http://localhost:8000/admin/login');
    });

    it('Should have a placeholder attribute', function(){
        expect(element(by.model(selector)).getAttribute('placeholder')).toMatch('Email');
    });

    it('Should slide up a fake span and remove placeholder attribute on key entrance', function() {
        expect(element(by.css('.fake-placeholder')).isPresent()).toBe(false);
        element(by.model(selector)).sendKeys('Some keys');
        expect(element(by.xpath('//input[@id="email"]/following-sibling::span')).isDisplayed()).toBeTruthy();
        expect(element(by.model(selector)).getAttribute('placeholder')).toMatch('');
    });

    it('Should have placeholder attribute whe input is cleared and fake span should disappear', function(){
        element(by.model(selector)).sendKeys('Some keys');
        element(by.model(selector)).clear();
        expect(element(by.css('.fake-placeholder')).isPresent()).toBe(false);
        expect(element(by.model(selector)).getAttribute('placeholder')).toMatch('Email');
    });
});