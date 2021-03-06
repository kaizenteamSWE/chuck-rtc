/*
 * Name: BarChartInPlaceUpdater.js
 * Module: Model/NorrisChart
 * Location: Chuck/Main/Model/NorrisChart
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
* ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Dal Bianco Davide   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-12 Bucco Riccardo   Creation
 * ================================================================================
 */

angular.module('chuck-updater')

.factory('BarChartInPlaceUpdater', [function () {
	/**
	 * Creates an instance of a new BarChartInPlaceUpdater, or returns the existing instance, if it already exits.
	 * @constructor
	 */
    function BarChartInPlaceUpdater() {
        if(!(this instanceof BarChartInPlaceUpdater)) return new BarChartInPlaceUpdater();
    }

    BarChartInPlaceUpdater.prototype.instance=new BarChartInPlaceUpdater(); // static
	
	/**
     * Returns the unique existing instance of the BarChartInPlaceUpdater
     * @return {BarChartInPlaceUpdater} - the unique existing instance of the class
     */
    BarChartInPlaceUpdater.getInstance = function() { // static
        return BarChartInPlaceUpdater.prototype.instance;
    };

    /**
     * Updates a bar chart with in place method. The bar chart data should not be empty.
     * @param {ChartImpl} chart - the bar chart to update;
     * @param updateData - the updating.
     */
    BarChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
                    data.datasets[x].values[y]=update[i].data;
                }
                chart.setData(data);
            }
            else {
                console.log("ERROR: the chart has no data to update.");
                throw ("emptyChart");
            }
        };
    };

    return BarChartInPlaceUpdater;

}]);