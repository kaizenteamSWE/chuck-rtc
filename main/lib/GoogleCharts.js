/*
 * Name: GoogleCharts.js
 * Module: Lib
 * Location: Chuck/Main/Lib
 * Date: 2015-04-17
 * Version: v1.00
 *
 * History:
 *
* ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.04 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.03 2015-05-29 Moretto Alessandro  Edit 
 * ================================================================================
 * v0.02 2015-04-23 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-17 Moretto Alessandro   Creation
 * ================================================================================
 */
angular.module('chuck-libs')
    .factory('GoogleCharts', ['$q', function ($q) {
        var deferred = $q.defer();

        $.ajax({
            url: 'https://www.google.com/jsapi',
            dataType: 'script',
            cache: true,
            success: function() {
                google.load('visualization', '1', {
                    'packages': ['corechart'],
                    'callback': deferred.resolve
                });
            }
        });

        return deferred.promise;
    }]);