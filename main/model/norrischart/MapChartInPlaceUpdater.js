/*
 * Name: MapChartInPlaceUpdater.js
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
 * v0.07 2015-05-30 Carlon Chiara   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */

angular.module('chuck-updater')

.factory('MapChartInPlaceUpdater', [function () {
	/**
	 * Creates an instance of a new MapChartInPlaceUpdater, or returns the existing instance, if it already exits.
	 * @constructor
	 */
    function MapChartInPlaceUpdater() {
        if(!(this instanceof MapChartInPlaceUpdater)) return new MapChartInPlaceUpdater();
    }

    MapChartInPlaceUpdater.prototype.instance=new MapChartInPlaceUpdater(); // static
	
	/**
     * Returns the unique existing instance of the MapChartInPlaceUpdater
     * @return {MapChartInPlaceUpdater} - the unique existing instance of the class
     */
    MapChartInPlaceUpdater.getInstance = function() { // static
        return MapChartInPlaceUpdater.prototype.instance;
    };

    /**
     * Updates a map chart with in place method. The map chart data should not be empty.
     * @param {MapChartImpl} chart - the map chart to update;
     * @param updateData - the updating.
     */
    MapChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
                    var series=update[i].position.series;
                    var index=update[i].position.index;
                    data.datasets[series].values[index].x=update[i].data.x;
                    data.datasets[series].values[index].y=update[i].data.y;
                }
                chart.setData(data);
            }
            else {
                console.log("ERROR: the chart has no data to update.");
                throw ("emptyChart");
            }
        }
    };

    return MapChartInPlaceUpdater;

}]);
