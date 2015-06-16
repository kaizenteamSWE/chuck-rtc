/*
 * Name: TITable.js
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
 * v0.02 2015-06-02 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-30 Dal Bianco Davide Creation
 * ================================================================================
 */


describe('Table', function(){
    beforeEach(module('chuck'));

    var settings = {
        title: '',
        description : 'This is a table.',
        maxItems : 10 ,
        showTableGrid : true ,
        newLinePosition : 'bottom',
        allowFilter: false,
        allowSort: false,
        allowPaginate: false
    };

    var data = {
        headers: ['anno','mese','giorno','ora'],
        datasets: [
            {row: [
                {color : '#ff0000', background : '#ff0340', value: 'due'},
                {color : '#123456', background : '#ff0012', value: 'sette'},
                {color : '#654321', background : '#ff8700', value: 'random'}
            ]},
            {row: [
                {color: '#624375', background : '#845767', value: '12'},
                {color: '#624567', background : '#ff0765', value: 'tre'},
                {color: '#123375', background : '#000000', value: 'dieci'}
            ]}
        ]
    };;

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
                            return 'table';
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
        var element = '<chuck-table chart-endpoint="foo" chart-id="id"></chuck-table>';

        $httpBackend.whenGET(CHUCK_DIR + 'main/view/TableView.html').respond(201,'<table></table>');
        element = $compile(element)(scope);
        $rootScope.$apply();

        setTimeout(function () {
            expect(element).toContain('DataTables');
            expect(scope.chart.settings).toDeepEqual(settings);
            expect(scope.chart.data).toDeepEqual(data);
            expect(scope.chart.type).toDeepEqual('table');
            expect(scope.chart.id).toDeepEqual('id');
        }, 500);
    });



});