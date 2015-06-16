/*
 * Name: TUMapChartImpl.js
 * Module: 
 * Location: Norris/test/unit
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
 * v0.01 2015-05-25 Bigarella Chiara Creation
 * ================================================================================
 */

describe('MapChartImpl', function() {
    beforeEach(module('chuck-chart'));


    var MapChartImpl;
    var mapchart;
    
    beforeEach(inject(function($injector) {
        MapChartImpl = $injector.get( 'MapChartImpl');
        mapchart= new MapChartImpl('randomID');
    }));
    
    describe('MapChartImpl(id:String)', function(){
        it('should memorize the right type of the chart',function(){
            expect(mapchart.type).toDeepEqual('mapchart');
        });
        
        it('should memorize the right id of the chart',function(){
            expect(mapchart.uid).toDeepEqual('randomID');
        });
        
        it('should memorize some default values for the keys of the settings',function(){
            var mapchart = new MapChartImpl('randomID');
            var defaults = {
                area : {
                    x : 0,
                    y : 0,
                    zoom : 1
                },
                title : '',
                description : 'This is a map chart',
                legendPosition : 'topright',
                zoomPosition : 'topleft',
                scalePosition : 'bottomleft',
                allowFilter : false,
                maxItems : 5
            };
            expect(defaults).toDeepEqual(mapchart.settings);
        });
        
    });
        
});
