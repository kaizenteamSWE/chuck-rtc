/*
 * Name: ChuckAuthenticator.js
 * Module: Model/Services
 * Location: Chuck/Main/Model/Services
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
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */
angular.module('chuck')


/**
 * Creates a new ChartAuthenticator using the inversion of control.
 * @param {String} className
 * @param settings
 * @constructor
 */
.factory('ChuckAuthenticator', ['$http', function ($http) {

    return {
        
        /**
         * Allows the authentication at a Norris' instance
         * @param {String} endpoint
         * @param {String} username
         * @param {String} password
         * @returns {boolean} - it returns 'true', if the authentication is succeed, 'false' otherwise
         */
        login: function (endpoint, username, password) {
            if(endpoint.slice(-1) !== '/') {
                endpoint += '/';
            }
            return $http({
                method: 'POST',
                url: endpoint + 'auth/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: jQuery.param({username: username, password: password})
            });
        },

        /**
         * Allows the session renew at a Norris' instance
         * @param {String} endpoint
         * @returns {boolean} - it returns 'true', if the authentication is succeed, 'false' otherwise
         */
        keepAlive: function (endpoint) {
            if(endpoint.slice(-1) !== '/') {
                endpoint += '/';
            }
            return $http({
                method: 'POST',
                url: endpoint + 'auth/keepalive',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: ''
            });
        },

        /**
         * Allows the end of a session
         * @param {String} endpoint
         * @returns {boolean} - it returns 'true', if the session is ended correctly, 'false' otherwise
         */
        logout: function (endpoint) {
            if(endpoint.slice(-1) !== '/') {
                endpoint += '/';
            }
            return $http({
                method: 'POST',
                url: endpoint + 'auth/logout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: ''
            });
        }
    };

}]);