/*
 * Name: MapChartImpl.js
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
 * v0.07 2015-05-30 Dal Bianco Davide   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * =================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */

angular.module('chuck-chart')

.factory('MapChartImpl', ['ChartImpl', 'MapChartInPlaceUpdater', 'MapChartMovieUpdater', function (ChartImpl, MapChartInPlaceUpdater, MapChartMovieUpdater) {

    var defaults = {
        description: 'This is a map chart',
        zoomPosition: 'topleft',
        legendPosition: 'topright',
        scalePosition: 'bottomleft',
        allowFilter: false,
        maxItems : 5,
        area: {
            x: 0,
            y: 0,
            zoom: 1
        }
    };

    /**
     * Creates a new map chart.
     * @constructor
     * @param {String} id - the map chart's id.
     */
    function MapChartImpl (id) {
        if (!(this instanceof MapChartImpl)) return new MapChartImpl(id);
        ChartImpl.call(this, 'mapchart', id);
        for(var key in defaults) {
            this.settings[key] = defaults[key];
        }
    }

    MapChartImpl.prototype.__proto__ = ChartImpl.prototype;

    /* MapChartFactory ------------------------------------------------------- */

    /**
     * Creates a new map chart factory.
     * @constructor
     */
    function MapChartFactory() {
        if(!(this instanceof MapChartFactory)) return new MapChartFactory();
    }

    MapChartFactory.prototype.instance = new MapChartFactory(); // static

    /**
     * Gets the MapChartFactory's instance.
     * @returns {MapChartFactory} the factory's instance.
     */
    MapChartFactory.getInstance = function() { // static
        return MapChartFactory.prototype.instance;
    };

    /**
     * Creates a new map chart.
     * @param {String} id - the map chart's id;
     * @returns {MapChartImpl} - the created map chart.
     */
    MapChartFactory.prototype.createChart = function (id) {
        return new MapChartImpl(id);
    };

    ChartImpl.registerFactory('mapchart' , MapChartFactory.getInstance());
    ChartImpl.registerUpdater('mapchart:inplace', MapChartInPlaceUpdater.getInstance());
    ChartImpl.registerUpdater('mapchart:movie', MapChartMovieUpdater.getInstance());

    return MapChartImpl;

}]);
