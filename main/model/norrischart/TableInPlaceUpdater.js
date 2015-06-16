/*
 * Name: TableInPlaceUpdater.js
 * Module: Model/NorrisChart
 * Location: Chuck/Main/Model/NorrisChart
 * Date: 2015-04-10
 * Version: v1.00
 *
 * History:
 *
* ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Bigarella Chiara   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Bigarella Chiara   Creation
 * ================================================================================
 */

angular.module('chuck-updater')

.factory('TableInPlaceUpdater', [function () {
	
	/**
	 * Creates an instance of a new TableInPlaceUpdater, or returns the existing instance, if it already exits.
	 * @constructor
	 */
    function TableInPlaceUpdater() {
        if(!(this instanceof TableInPlaceUpdater)) return new TableInPlaceUpdater();
    }

    TableInPlaceUpdater.prototype.instance=new TableInPlaceUpdater(); // static
	
	/**
     * Returns the unique existing instance of the TableInPlaceUpdater
     * @return {TableInPlaceUpdater} - the unique existing instance of the class
     */
    TableInPlaceUpdater.getInstance = function() { // static
        return TableInPlaceUpdater.prototype.instance;
    };
	
	/**
     * Updates a table with in place method. The bar chart data should not be empty.
     * @param {ChartImpl} chart - the table to update;
     * @param updateData - the updating.
     */
    TableInPlaceUpdater.prototype.update = function (chart, updateData) {
        var isEmpty=function(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        if (!isEmpty(updateData)) {
            var data=chart.getData();
            var update=updateData['inplace'];
            if (!isEmpty(data)) {
                for(var i=0; i<update.length; i++) {
                    var x=update[i].position.x;
                    var y=update[i].position.y;
                    data.datasets[x].row[y].color=update[i].data.color;
                    data.datasets[x].row[y].background=update[i].data.background;
                    data.datasets[x].row[y].value=update[i].data.value;
                }
                chart.setData(data);
            }
            else {
                console.log("ERROR: the chart has no data to update.");
                throw ("emptyChart");
            }
        }
    };



    return TableInPlaceUpdater;

}]);
