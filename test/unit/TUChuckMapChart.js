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
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-26 Pavanello Fabio Matteo Creation
 * ================================================================================
 */

describe('ChuckMapChart', function () {

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
        var element = '<chuck-mapchart chart-endpoint="foo" chart-id="bar"></chuck-mapchart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/MapChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);

        $httpBackend.flush();
    });

    it('should compile', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-mapchart chart-endpoint="foo" chart-id="bar"></chuck-mapchart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/MapChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();
        
        expect(element).not.toEqual('<chuck-mapchart chart-endpoint="foo" chart-id="bar"></chuck-mapchart>');
    });

    it('should have isolate scope', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-mapchart chart-endpoint="foo" chart-id="bar"></chuck-mapchart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/MapChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();

        expect(scope.$$ChildScope).toBeNull();
    });
});
