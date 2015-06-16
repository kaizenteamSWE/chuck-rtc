/*
 * Name: ChuckTable.js
 * Module: Lib
 * Location: Chuck/Main/Lib
 * Date: 2015-04-16
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.04 2015-05-30 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.03 2015-05-28 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.02 2015-04-18 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-16 Bucco Riccardo   Creation
 * ================================================================================
 */
angular.module('chuck-libs')
    .factory('DataTables', ['$q', 'CHUCK_DIR', function ($q, CHUCK_DIR) {
        var deferred = $q.defer();

        $.ajax({
            url: CHUCK_DIR + 'bower_components/datatables/media/js/jquery.dataTables.min.js',
            dataType: 'script',
            cache: true,
            success: deferred.resolve
        });

        $('<link>')
            .appendTo('head')
            .attr({
                href: CHUCK_DIR + 'bower_components/datatables/media/css/jquery.dataTables.min.css',
                type: 'text/css',
                rel: 'stylesheet'
            });

        return deferred.promise;
    }]);