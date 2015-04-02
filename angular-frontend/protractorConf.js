'use strict';
exports.config = {
    allScriptsTimeout: 11000,
    specs: ['protractor_spec/auth_spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    chromeOnly: true,
    baseUrl: 'http://localhost:8000/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }

}