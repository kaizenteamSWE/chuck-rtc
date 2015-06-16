/*
 * Name: TIMapChart.js
 * Module: 
 * Location: Norris/test/integration
 * Date: 2015-05-30
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara Approved
 * ================================================================================
 * v0.02 2015-06-03 Dal Bianco Davide Verify
 * ================================================================================
 * v0.01 2015-05-30 Carlon Chiara Creation
 * ================================================================================
 */


describe('MapChart', function(){
    beforeEach(module('chuck'));

    var settings = {
        title: '',
        description: 'This is a map chart',
        zoomPosition: 'topleft',
        legendPosition: 'topright',
        scalePosition: 'bottomleft',
        allowFilter: false,
        maxItems : 5,
        area: {
            x: 0,
            y: 0,
            zoom: 1
        }
    };

    var data = {
        datasets: [
            {name: 'uno', color : '#ff0000', values: [{x:1, y:1}, {x:2, y:2}, {x:6, y:7}, {x:10, y:1}]},
            {name: 'due', color : '#ffff00', values: [{x:19, y:18}, {x:13, y:121}, {x:13, y:12}]},
            {name: 'tre', color : '#ffffff', values: [{x:13, y:1}, {x:13, y:14}, {x:7, y:8}, {x:1, y:0}]}
        ]
    };

    beforeEach(function () {
        angular.mock.module('chuck-requester', function ($provide) {
            $provide.value('ChartRequester', {
                bind: function () {
                    return {
                        settings: settings,
                        data: data,
                        getSettings: function () {
                            return this.settings;
                        },
                        getData: function () {
                            return this.data;
                        },
                        getType: function () {
                            return 'mapchart';
                        },
                        getId: function () {
                            return 'id';
                        }
                    }
                }
            });
        });
    });


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


    it('should compile right', function () {
        var scope = $rootScope.$new();
        var element = '<chuck-mapchart chart-endpoint="foo" chart-id="id"></chuck-mapchart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/MapChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();

        setTimeout(function () {
            expect(element).toContain('leaflet');
            expect(scope.chart.settings).toDeepEqual(settings);
            expect(scope.chart.data).toDeepEqual(data);
            expect(scope.chart.type).toDeepEqual('barchart');
            expect(scope.chart.id).toDeepEqual('id');
        }, 500);
    });



});