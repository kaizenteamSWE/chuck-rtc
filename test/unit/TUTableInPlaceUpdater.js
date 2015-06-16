/*
 * Name: TUMapChartInPlaceUpdater.js
 * Module: 
 * Location: Chuck/test/unit
 * Date: 2015-05-25
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
 * v0.01 2015-05-15 Carlon Chiara Creation
 * ================================================================================
 */

describe('TableInPlaceUpdater', function(){
    beforeEach(module('chuck-updater'));

    var TableInPlaceUpdater;

    beforeEach(inject(function($injector) {
        TableInPlaceUpdater = $injector.get('TableInPlaceUpdater');
    }));

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should reject chart without data',function(){
            var chart = {data: {}};
            chart.getData = function() {return this.data;};
            chart.setData = function(data) {this.data = data;};
            var newData = [
                { position: {x:0, y:0}, value: 'foo' },
                { position: {x:0, y:1}, value: 'foo' }
            ]
            expect(function () {(new TableInPlaceUpdater()).update(chart, newData)}).toThrow();
        });
        it('should update a given table with the inplace method',function(){
            var chart = {
                data: {
                    datasets: [ {row:
                        [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                        ]},
                            {row:
                        [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                        ]}
                    ]
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            var newData = {inplace :[ 
                { position: {x:0, y:0}, data: {color: {r: 0, g: 0, b: 0}, background: {r: 0, g: 0, b: 0}, value:'9999'} },
                { position: {x:0, y:1}, data: {color: {r: 0, g: 0, b: 0}, background: {r: 0, g: 0, b: 0}, value:'8888'} }
            ]};
            var updatedData = {
                datasets: [ {row: 
                    [ 
                      {color : {r: 0, g: 0, b: 0}, background : {r: 0, g: 0, b: 0}, value: '9999'},
                      {color : {r: 0, g: 0, b: 0}, background : {r: 0, g: 0, b: 0}, value: '8888'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                    ]},
                        {row:
                    [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                    ]}
            ]};
            (new TableInPlaceUpdater()).update(chart, newData);
            expect(updatedData).toDeepEqual(chart.data);
        });
    });
});