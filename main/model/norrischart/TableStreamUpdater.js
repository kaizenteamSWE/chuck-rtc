/*
 * Name: TableStreamUpdater.js
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
 * v0.07 2015-05-30 Dal Bianco Davide    Edit 
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

.factory('TableStreamUpdater', [function () {
	
	/**
	 * Creates an instance of a new TableStreamUpdater, or returns the existing instance, if it already exits.
	 * @constructor
	 */
    function TableStreamUpdater() {
        if(!(this instanceof TableStreamUpdater)) return new TableStreamUpdater();
    }

    TableStreamUpdater.prototype.instance=new TableStreamUpdater(); // static

	/**
     * Returns the unique existing instance of the TableStreamUpdater
     * @return {TableStreamUpdater} - the unique existing instance of the class
     */
    TableStreamUpdater.getInstance = function() { // static
        return TableStreamUpdater.prototype.instance;
    };

	/**
     * Updates a table with stream method. The table data should not be empty.
     * @param {ChartImpl} chart - the table to update;
     * @param updateData - the updating.
     */
    TableStreamUpdater.prototype.update = function (chart, updateData) {
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
            var newLinePosition=chart.getSettings().newLinePosition;
            if (!isEmpty(data)) {
                for(var i=0; i<update.length; i++) {
                    if (update[i].row.length==data.headers.length) {
                        if(newLinePosition=='bottom') {
                            data.datasets.push(update[i]);
                            if (data.datasets.length>chart.getSettings().maxItems) {
                                data.datasets.shift();
                            }
                        }
                        else {
                            data.datasets.unshift(update[i]); /* inserts in top */
                            if (data.datasets.length>chart.getSettings().maxItems) {
                                data.datasets.pop();
                            }
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

    return TableStreamUpdater;

}]);
