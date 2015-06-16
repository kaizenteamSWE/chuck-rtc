/*
 * Name: LineChartStreamUpdater.js
 * Module: Model/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
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
 * v0.08 2015-06-02 Pavanello Fabio Matteo   Verify
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
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */

angular.module('chuck-updater')


/**
 * Creates a new LineChartStreamUpdater using the inversion of control.
 * @param {String} className
 * @param settings
 * @constructor
 */
.factory('LineChartStreamUpdater', [function () {
	
	/**
	 * Creates an instance of a new LineChartStreamUpdater, or returns the existing instance, if it already exits.
	 * @constructor
	 */
    function LineChartStreamUpdater() {
        if(!(this instanceof LineChartStreamUpdater)) return new LineChartStreamUpdater();
    }

    LineChartStreamUpdater.prototype.instance=new LineChartStreamUpdater(); // static

	/**
     * Returns the unique existing instance of the LineChartStreamUpdater
     * @return {LineChartStreamUpdater} - the unique existing instance of the class
     */
    LineChartStreamUpdater.getInstance = function() { // static
        return LineChartStreamUpdater.prototype.instance;
    };

	/**
     * Updates a line chart with in place method. The line chart data should not be empty.
     * @param {ChartImpl} chart - the line chart to update;
     * @param updateData - the updating.
     */
    LineChartStreamUpdater.prototype.update = function (chart, updateData) {
        var isEmpty=function(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        if (!isEmpty(updateData)) {
            var data=chart.getData();
            var update=updateData['stream'];
            if (!isEmpty(data)) {
                for(var i=0; i<update.length; i++) {
                    if (update[i].data.length==data.datasets.length) {
                        for(var k=0; k<data.datasets.length; k++) {
                            data.datasets[k].values.push(update[i].data[k]);
                            if (data.datasets[k].values.length>chart.getSettings().maxItems) {
                                data.datasets[k].values.shift();
                            }
                        }
                        data.labels.push(update[i].label);
                        if (data.labels.length>chart.getSettings().maxItems) {
                            data.labels.shift();
                        }

                    }
                    else {
                        throw ("wrongUpdateData");
                    }
                }
                chart.setData(data);
            }
            else {
                console.log("ERROR: the chart has no data to update.");
                throw ("emptyChart");
            }
        }
    };

    return LineChartStreamUpdater;

}]);