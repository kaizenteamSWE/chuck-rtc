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
 * v0.01 2015-05-26 Carlon Chiara Creation
 * ================================================================================
 */

describe('ChuckLineChart', function () {

    beforeEach(module('chuck'));

    var $httpBackend;
    var CHUCK_DIR;
    var $rootScope;
    var $compile;
    
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        CHUCK_DIR = $injector.get('CHUCK_DIR');
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
    }));

    it('should get the right view', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-linechart chart-endpoint="foo" chart-id="bar"></chuck-linechart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/LineChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);

        $httpBackend.flush();
    });

    it('should compile', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-linechart chart-endpoint="foo" chart-id="bar"></chuck-linechart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/LineChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();
        
        expect(element).not.toEqual('<chuck-linechart chart-endpoint="foo" chart-id="bar"></chuck-linechart>');
    });

    it('should have isolate scope', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-linechart chart-endpoint="foo" chart-id="bar"></chuck-linechart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/LineChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();

        expect(scope.$$ChildScope).toBeNull();
    });
});
