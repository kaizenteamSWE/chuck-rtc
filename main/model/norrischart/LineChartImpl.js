/*
 * Name: LineChartImpl.js
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
 * v0.08 2015-06-01 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Carlon Chiara   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Bucco Riccardo  Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */

angular.module('chuck-chart')


/**
 * Creates a new LineChartImpl using the inversion of control.
 * @param {String} className
 * @param settings
 * @constructor
 */
.factory('LineChartImpl', ['ChartImpl', 'LineChartInPlaceUpdater', 'LineChartStreamUpdater', function (ChartImpl, LineChartInPlaceUpdater, LineChartStreamUpdater) {

    var defaults = {
        description : 'This is a line chart.',
        xLabel : '',
        yLabel : '',
        legendPosition : 'right',
        maxItems : 10,
        style : {
            pointDotSize : 0 , // Number - Size of each point dot in pixels
            bezierCurve : true, // Boolean - Whether the line is curved between points
            showGrid : false,
            animationDuration : 1000,
            maxValue: null,
            minValue: null
        }
    };

    /**
     * Creates a new line chart.
     * @constructor
     * @param {String} id - the line chart's id.
     */
    function LineChartImpl (id) {
        if (!(this instanceof LineChartImpl)) return new LineChartImpl(id);
        ChartImpl.call(this, 'linechart', id);
        for(var key in defaults) {
            this.settings[key] = defaults[key];
        }
    }

    LineChartImpl.prototype.__proto__ = ChartImpl.prototype;

    /* LineChartFactory ------------------------------------------------------- */

    /**
     * Creates a new line chart factory.
     * @constructor
     */
    function LineChartFactory() {
        if(!(this instanceof LineChartFactory)) return new LineChartFactory();
    }

    LineChartFactory.prototype.instance = new LineChartFactory(); // static

    /**
     * Gets the LineChartFactory's instance.
     * @returns {LineChartFactory} the factory's instance.
     */
    LineChartFactory.getInstance = function() { // static
        return LineChartFactory.prototype.instance;
    };

    /**
     * Creates a new line chart.
     * @param {String} id - the line chart's id;
     * @returns {LineChartImpl} - the created line chart.
     */
    LineChartFactory.prototype.createChart = function (id) {
        return new LineChartImpl(id);
    };

    ChartImpl.registerFactory('linechart' , LineChartFactory.getInstance());
    ChartImpl.registerUpdater('linechart:inplace', LineChartInPlaceUpdater.getInstance());
    ChartImpl.registerUpdater('linechart:stream', LineChartStreamUpdater.getInstance());

    return LineChartImpl;

}]);
