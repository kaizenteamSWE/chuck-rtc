/*
 * Name: TUBarChartInPlaceUpdater.js
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
 * v0.01 2015-05-25 Carlon Chiara Creation
 * ================================================================================
 */

describe('BarChartInPlaceUpdater', function(){
    beforeEach(module('chuck-updater'));
    
    var BarChartInPlaceUpdater;
    
     beforeEach(inject(function($injector) {
        BarChartInPlaceUpdater = $injector.get( 'BarChartInPlaceUpdater');
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
            expect(function () {(new BarChartInPlaceUpdater()).update(chart, newData)}).toThrow();
        });
        it('should update a given barchart with the inplace method',function(){
            var chart = {
                data: {
                    datasets: [
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]}
                    ]
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            var newData = { inplace : [
                { position: {x:0, y:0}, data: 10 },
                { position: {x:0, y:1}, data: 30 }
            ]};
            var updatedData = {
                datasets: [
                    {values: [10,30,3,4]},
                    {values: [1,2,3,4]},
                    {values: [1,2,3,4]}
                ]
            };
            (new BarChartInPlaceUpdater()).update(chart, newData);
            expect(updatedData).toDeepEqual(chart.data);
        });
    });
});
