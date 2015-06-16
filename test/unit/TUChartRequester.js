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
 * v0.02 2015-06-02 Bucco Riccardo Verify
 * ================================================================================
 * v0.01 2015-05-26 Bigarella Chiara Creation
 * ================================================================================
 */

describe('ChartRequester', function () {
    beforeEach(module('chuck'));

    var ChartRequester;
    
    beforeEach(inject(function($injector) {
        ChartRequester = $injector.get('ChartRequester');
    }));


    it('should not be null', function () {
        if(!ChartRequester) {
            fail();
        }
    });

    describe('bind(endpoint:String, id:String)', function () {

        it('should connect to the right socket', function () {
            var io = jasmine.createSpy();
            ChartRequester.bind('http://example.com/endpoint', 'example-id')
                .finally(function () {
                    expect(io).toHaveBeenCalledWith('http://example.com/example-id', {path: '/endpoint/chart'})
                });
        });

        it('should return timeout error', function () {
            ChartRequester.bind('http://example.com/endpoint', 'example-id')
                .catch(function (reason) {
                    expect(reason).toBe('timeout');
                });
        });

    });
});
