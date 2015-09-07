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
    .factory('AMCharts', ['$q', function ($q) {
        var deferred = $q.defer();

        $.ajax({
            url: 'http://www.amcharts.com/lib/3/amcharts.js',
            dataType: 'script',
            cache: true,
            success: deferred.resolve
        });
        $('<script>')
            .appendTo('head')
            .attr({
                src: 'http://www.amcharts.com/lib/3/amcharts.js',
                type: 'text/javascript'
            });
        $('<script>')
            .appendTo('head')
            .attr({
                src: 'http://www.amcharts.com/lib/3/serial.js',
                type: 'text/javascript'
            });

        return deferred.promise;
    }]);