/*
 * Name: TILineChart.js
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
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-30 Dal Bianco Davide Creation
 * ================================================================================
 */


describe('LineChart', function(){
    beforeEach(module('chuck'));

    var settings = {
        title: '',
        description : 'This is a line chart.',
        xLabel : '',
        yLabel : '',
        legendPosition : 'right',
        maxItems : 10,
        style : {
            pointDotSize : 0 , // Number - Size of each point dot in pixels
            bezierCurve : true, // Boolean - Whether the line is curved between points
            showGrid : false,
            animationDuration : 1000,
            maxValue: null,
            minValue: null
        }
    };

    var data = {
        labels: ['1','2','3','4','5'],
        datasets: [
            {name: 'pippo', values: [1,2,3,4,5]},
            {name: 'pluto', values: [1,2,0,4,5]},
            {name: 'paperino', values: [1,2,3,4,5]}
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
                            return 'linechart';
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
        var element = '<chuck-linechart chart-endpoint="foo" chart-id="id"></chuck-linechart>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/LineChartView.html').respond(201,'<div></div>');
        element = $compile(element)(scope);
        $rootScope.$apply();

        setTimeout(function () {
            expect(element).toContain('google-visualization');
            expect(scope.chart.settings).toDeepEqual(settings);
            expect(scope.chart.data).toDeepEqual(data);
            expect(scope.chart.type).toDeepEqual('linechart');
            expect(scope.chart.id).toDeepEqual('id');
        }, 500);
    });



});