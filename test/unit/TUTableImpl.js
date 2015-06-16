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

describe('TableImpl', function() {
    beforeEach(module('chuck-chart'));

    var TableImpl;
    var table;
    
    beforeEach(inject(function($injector) {
        TableImpl = $injector.get( 'TableImpl');
        table = new TableImpl('randomID');
    }));
    
    describe('TableImpl(id:String)', function(){
        it('should memorize the right type of the chart',function(){
            var table = new TableImpl('randomID');
            expect('table').toDeepEqual(table.type);
        });
        it('should memorize the right id of the chart',function(){
            var table = new TableImpl('randomID');
            expect('randomID').toDeepEqual(table.uid);
        });
        it('should memorize some default values for the keys of the settings',function(){
            var table = new TableImpl('randomID');
            var defaults = {
                title: '',
                description : 'This is a table.',
                maxItems : 10 ,
                showTableGrid : true ,
                newLinePosition : 'bottom',
                allowFilter: false,
                allowSort: false,
                pageSize: -1
            };
            expect(defaults).toDeepEqual(table.settings);
        });
        
    });
        
});
