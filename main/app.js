angular.module('chuck', ['chuck-requester', 'chuck-libs', 'chuck-dir']);
angular.module('chuck-requester', ['chuck-chart', 'chuck-libs']);
angular.module('chuck-chart', ['chuck-updater']);
angular.module('chuck-updater', []);
angular.module('chuck-libs', ['chuck-dir']);
angular.module('chuck-dir', []);


angular.module('chuck')
    .run(function() {
        if(typeof jQuery == 'undefined') {
            throw new Error('Chuck requires jQuery');
        }
    });