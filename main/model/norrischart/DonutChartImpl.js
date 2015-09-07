/*
 * Name: DonutChartImpl.js
 * Module: Model/NorrisChart
 * Location: Chuck/Main/Model/NorrisChart
 * Date: 2015-09-07
 * Version: v1.00
 *
 * History:
 *
* ================================================================================
 * Version Date Programmer Changes

 * ================================================================================
 * v0.01 2015-04-12 Bigarella Chiara   Creation
 * ================================================================================
 */

angular.module('chuck-chart')

.factory('DonutChartImpl', ['ChartImpl', 'DonutChartInPlaceUpdater', function (ChartImpl, DonutChartInPlaceUpdater) {

    var defaults = {
        description : 'This is a donut chart.',
        innerRadius: '60%', // if it's set to 1, we'll have a PIE CHART
        labels : {
            labelsEnabled: false,
            labelRadius : 0, // distance between labels and chart
            color: '#000000'  // labels' text color
        },
        legend : { 
            enabled : true,
            position : 'bottom',
            maxColumns : 5,
            markerType: 'circle', // it could be also square-line-triangleUp-triangleDown-triangleLeft-triangleRight-diamond-bubble
            switchable: true, // allows to temporary delete one or more entries
            color : '#000000' // text color
        },
        style: {
            backgroundColor: '#ffffff',
            borderColor : '#000000',
            borderAlpha: 0.2,
            animationDuration: 1000
        }
    };


    /**
    * Creates a new donut chart.
    * @constructor
    * @param {String} id - the donut chart's id.
    */

    function DonutChartImpl (uid) {
        if (!(this instanceof DonutChartImpl)) return new DonutChartImpl(uid);
        ChartImpl.call(this, 'donutchart', uid);
        for(var key in defaults) {
            this.settings[key] = defaults[key];
        }
    }

    DonutChartImpl.prototype.__proto__ = ChartImpl.prototype;

    /* DonutChartFactory ------------------------------------------------------- */

    /**
    * Creates a new donut chart factory.
    * @constructor
    */
    function DonutChartFactory() {
        if(!(this instanceof DonutChartFactory)) {
            return new DonutChartFactory();
        }
    }

    DonutChartFactory.prototype.instance=new DonutChartFactory(); // static

    /**
    * Gets the DonutChartFactory's instance.
    * @returns {DonutChartFactory} the factory's instance.
    */
    DonutChartFactory.getInstance = function() { // static
        return DonutChartFactory.prototype.instance;
    };

    /**
    * Creates a new donut chart.
    * @param {String} id - the donut chart's id;
    * @returns {DonutChartImpl} - the created donut chart.
    */
    DonutChartFactory.prototype.createChart = function (id) {
        return new DonutChartImpl(id);
    };

    // Dependency injection:
    ChartImpl.registerFactory('donutchart' , DonutChartFactory.getInstance());
    ChartImpl.registerUpdater('donutchart:inplace', DonutChartInPlaceUpdater.getInstance() );
    
    return DonutChartImpl;

}]);
