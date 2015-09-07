(function () {
    var scripts = document.getElementsByTagName('script');
    var path = scripts[scripts.length-1].src.split('?')[0];
    var chuckdir = path.split('/').slice(0, -1).join('/')+'/';

    var SCRIPTS = [

        chuckdir + 'main/app.js',
        chuckdir + 'main/lib/Leaflet.js',
        chuckdir + 'main/lib/GoogleCharts.js',
        chuckdir + 'main/lib/DataTables.js',
        chuckdir + 'main/lib/SocketIO.js',


        chuckdir + 'main/model/services/ChartRequester.js',
        chuckdir + 'main/model/services/ChuckAuthenticator.js',

        chuckdir + 'main/directive/ChuckBarChart.js',
        chuckdir + 'main/directive/ChuckLineChart.js',
        chuckdir + 'main/directive/ChuckMapChart.js',
        chuckdir + 'main/directive/ChuckTable.js',

        chuckdir + 'main/model/norrischart/ChartImpl.js',
        chuckdir + 'main/model/norrischart/BarChartImpl.js',
        chuckdir + 'main/model/norrischart/LineChartImpl.js',
        chuckdir + 'main/model/norrischart/MapChartImpl.js',
        chuckdir + 'main/model/norrischart/DonutChartImpl.js',
        chuckdir + 'main/model/norrischart/TableImpl.js',

        chuckdir + 'main/model/norrischart/BarChartInPlaceUpdater.js',
        chuckdir + 'main/model/norrischart/LineChartInPlaceUpdater.js',
        chuckdir + 'main/model/norrischart/LineChartStreamUpdater.js',
        chuckdir + 'main/model/norrischart/MapChartInPlaceUpdater.js',
        chuckdir + 'main/model/norrischart/MapChartMovieUpdater.js',
        chuckdir + 'main/model/norrischart/DonutChartInPlaceUpdater.js',
        chuckdir + 'main/model/norrischart/TableInPlaceUpdater.js',
        chuckdir + 'main/model/norrischart/TableStreamUpdater.js'
    ]

    SCRIPTS.forEach(function (path) {
        document.write('<script type="text/javascript" src="' + path + '"></script>');
    });

    document.write(
        '<script type="text/javascript"> \
            angular.module("chuck-dir").constant("CHUCK_DIR", "' + chuckdir + '"); \
        </script>'
    );
})()