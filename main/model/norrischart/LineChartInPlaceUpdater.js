/*
 * Name: LineChartInPlaceUpdater.js
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
 * v0.07 2015-05-30 Pavanello Fabio Matteo   Edit 
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
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */

angular.module('chuck-updater')


/**
 * Creates a new LineChartInPlaceUpdater using the inversion of control.
 * @param {String} className
 * @param settings
 * @constructor
 */
.factory('LineChartInPlaceUpdater', [function () {

function LineChartInPlaceUpdater() {
    if(!(this instanceof LineChartInPlaceUpdater)) return new LineChartInPlaceUpdater();
}

LineChartInPlaceUpdater.prototype.instance=new LineChartInPlaceUpdater(); // static

    LineChartInPlaceUpdater.getInstance = function() { // static
        return LineChartInPlaceUpdater.prototype.instance;
    };

    /**
     * Updates a line chart with in place method. The line chart data should not be empty.
     * @param {LineChartImpl} chart - the line chart to update;
     * @param updateData - the updating.
     */
    LineChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
        }
    };

    return LineChartInPlaceUpdater;

}]);