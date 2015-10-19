/*
 * Name: ChartRequester.js
 * Module: Model/Services
 * Location: Norris/Main/Model/Services
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara   Approved
 * ================================================================================
 * v0.06 2015-05-24 Bucco Riccardo   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Carlon Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-12 Bucco Riccardo   Creation
 * ================================================================================
 */
angular.module('chuck-requester')

/**
 * Creates a new ChartRequester using the inversion of control.
 * @param {String} className
 * @param settings
 * @constructor
 */
.factory('ChartRequester', ['ChartImpl', 'SocketIO', '$rootScope', '$timeout', '$q', 'BarChartImpl', 'LineChartImpl', 'MapChartImpl', 'DonutChartImpl', 'TableImpl', function (ChartImpl, SocketIO, $rootScope, $timeout, $q) {
    return {
		
		/**
		 * Gets the chart into a Norris' instance; it's updated automatically.
		 * @param {String} endpoint
		 * @param {String} id
		 * @returns {ChartImpl} - The requested chart
		 */
        bind: function (endpoint, id) {

            var deferred = $q.defer();

            SocketIO.then(function () {

                var hostRegExp = new RegExp(/(http(s)?:\/\/)?[\w\d\.]+(:\d{1,5})\/?/i);
                var host = (endpoint.match(hostRegExp) || [location.origin])[0];

                if(host.substr(-1) !== '/') {
                    host += '/';
                }

                var pathRegExp = new RegExp(/(^\/.*$)|([^\/](\/\w*)*$)/);
                var path = (endpoint.match(pathRegExp) || ['/'])[0];

                if(path.substr(0,1) !== '/') {
                    path = path.slice(1);
                }

                if(path.substr(-1) !== '/') {
                    path += '/';
                }

                var socket = io(host + id, {path: path + 'chart/'});

                socket.on('chart', function (type, settings, data) {
                    var chart = ChartImpl.createChart(type, id);
                    if (chart) {
                        chart.setSettings(settings);
                        chart.setData(data);
                        socket.on('update', function (updateType, updateData) {
                            $rootScope.$apply(function () {
                                chart.update(updateType, updateData);
                            });
                        });
                        deferred.resolve(chart);
                    }
                    else {
                        alert("ERRORE: chart == null");
                    }
                    
                });

                socket.on('error', function (reason) {
                    deferred.reject(reason);
                });

                $timeout(function () {
                    deferred.reject('timeout');
                }, 3000);

            });

            return deferred.promise;
        }
    };
}]);