/*
 * Name: TUTableImpl.js
 * Module: 
 * Location: Norris/test/unit
 * Date: 2015-05-26
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara Approved
 * ================================================================================
 * v0.02 2015-06-03 Bucco Riccardo Verify
 * ================================================================================
 * v0.01 2015-05-26 Bigarella Chiara Creation
 * ================================================================================
 */

describe('ChuckAuthenticator', function () {
    beforeEach(module('chuck'));

    var ChuckAuthenticator;
    var $httpBackend;
    
    beforeEach(inject(function($injector) {
        ChuckAuthenticator = $injector.get( 'ChuckAuthenticator');
        $httpBackend = $injector.get('$httpBackend');
    }));

    
    it('should not be null', function () {
        if(!ChuckAuthenticator) {
            fail();
        }
    });

    describe('login(endpoint:String, username:String, password:String)', function () {
        it('should perform login', function () {
            $httpBackend.expectPOST('/auth/login', 'username=foo&password=bar').respond(200, '');
            ChuckAuthenticator.login('/', 'foo', 'bar');
            $httpBackend.flush();
        });
    });
    describe('keepalive(endpoint:String)', function () {
        it('should perform keepalive', function () {
            $httpBackend.expectPOST('/auth/keepalive', '').respond(200, '');
            ChuckAuthenticator.keepAlive('/');
            $httpBackend.flush();
        });
    });
    describe('logout(endpoint:String)', function () {
        it('should perform logouts', function () {
            $httpBackend.expectPOST('/auth/logout', '').respond(200, '');
            ChuckAuthenticator.logout('/');
            $httpBackend.flush();
        });
    });
        
});
