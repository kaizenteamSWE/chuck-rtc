/*
 * Name: AMCharts.js
 * Module: Lib
 * Location: Chuck/Main/Lib
 * Date: 2015-09-04
 * Version: v1.00
 *
 * History:
 *
* ================================================================================
 * Version Date Programmer Changes
 * v1.00 2015-09-04 Bigarella Chiara   Creation
 * ================================================================================
 */
angular.module('chuck-libs')
    .factory('AMCharts', ['$q', 'CHUCK_DIR', function ($q, CHUCK_DIR) {
        var deferred = $q.defer();

        $.ajax({
            url: CHUCK_DIR + 'bower_components/amcharts/dist/amcharts/amcharts.js',
            dataType: 'script',
            cache: true,
            success: function() {
                deferred.resolve;
            }
        });

        $('<script>')
            .appendTo('head')
            .attr({
                type:'text/javascript',
                src: CHUCK_DIR + 'bower_components/amcharts/dist/amcharts/pie.js'
            });

        return deferred.promise;
    }]);