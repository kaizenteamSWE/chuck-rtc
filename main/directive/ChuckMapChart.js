/*
 * Name: ChuckMapChart.js
 * Module: Directive
 * Location: Chuck/Main/Directive
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
 * v0.08 2015-06-02 Bigarella Chiara  Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * =================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Bigarella Chiara   Creation
 * ================================================================================
 */
 angular.module('chuck')


.directive('chuckMapchart', ['ChartRequester', 'CHUCK_DIR', 'Leaflet', '$compile', function (ChartRequester, CHUCK_DIR, Leaflet, $compile) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: CHUCK_DIR + 'main/view/MapChartView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }

            Leaflet.then(function () {

                var map = null;
                var markers = {};
                var layers = [];


                ChartRequester.bind(attrs.chartEndpoint,attrs.chartId)
                    .then(function (chart) {
                        if(chart.getType() === 'mapchart') {
                            scope.chart = chart;

                            //overriding impostazioni
                            if(attrs.datasetsColor) {
                                var colors = eval(attrs.datasetsColor);
                                for (var i in colors) {
                                    if(colors[i] && scope.chart.data.datasets.length > i) {
                                        scope.chart.data.datasets[i].color = colors[i];
                                    }
                                }
                            }
                            if(attrs.legendPosition) {
                                scope.chart.settings.legendPosition = attrs.legendPosition;
                            }

                            init();
                            scope.$watch('chart', render, true);
                        } else {
                            console.error('wrong type');
                            scope.error = 'wrong type';
                        }
                    }, function (reason) {
                        console.error(reason);
                        scope.error = reason;
                    });

                function init() {
                    var settings = scope.chart.getSettings();
                    var data = scope.chart.getData();

                    var lon = settings.area.x;
                    var lat = settings.area.y;
                    var zoom = settings.area.zoom;

                    map = L.map(element.contents()[0], {
                        center: [lat, lon],
                        minZoom: 1,
                        zoom: zoom,
                        zoomControl: false,
                        scrollWheelZoom: false
                    });

                    L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
                        subdomains: ['otile1','otile2','otile3','otile4']
                    }).addTo(map);

                    var MyControl = L.Control.extend({

                        onAdd: function () {
                            var container = document.createElement('div');

                            jQuery(container).css({
                                'background-color': 'white',
                                'padding': '10px',
                                'overflow-y': 'auto',
                                'max-height': '350px',
                                '-webkit-border-radius': '5px',
                                '-moz-border-radius': '5px',
                                'border-radius': '5px'
                            });

                            container.innerHTML = 
                            '<ul style="list-style-type: none; padding: 0px; margin: 0px;"> \
                                <li ng-repeat="dataset in chart.data.datasets"> \
                                    <input type="checkbox" ng-show="' + settings.allowFilter + '" ng-init="dataset.visible=true" ng-model="dataset.visible"/> \
                                    <svg width="10" height="10"> \
                                      <rect width="10" height="10" fill="{{dataset.color}}" /> \
                                    </svg> \
                                    <label ng-bind="dataset.name"></label> \
                                </li> \
                            </ul>';

                            if (!L.Browser.touch) {
                                L.DomEvent.disableClickPropagation(container);
                                L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
                            } else {
                                L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
                            }

                            $compile(container)(scope);

                            return container;
                        }
                    });

                    if(settings.zoomPosition !== 'none') {
                        map.addControl(new L.control.zoom({position: settings.zoomPosition}));
                    }

                    if(settings.legendPosition !== 'none') {
                        map.addControl(new MyControl({position: settings.legendPosition}));
                    }

                    if(settings.scalePosition !== 'none') {
                        map.addControl(new L.control.scale({position: settings.scalePosition}));
                    }

                };

                function render(newValue, oldValue) {

                    var newData = newValue.getData();

                    layers.forEach(function (layer) {
                        map.removeLayer(layer);
                    });
                    layers = [];

                    newData.datasets.forEach(function (dataset) {
                        if(dataset.visible !== false) {
                            var markerName = dataset.marker || 'standard';

                            var setMarkers = function () {
                                var marker = markers[markerName].replace(/%COLOR%/g, dataset.color);
                                var icon = L.icon({
                                    iconUrl: "data:image/svg+xml;base64," + btoa(marker),
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30]
                                });

                                dataset.values.forEach(function (value) {
                                    var marker = L.marker([value.y, value.x], {icon: icon, clickable: false});
                                    layers.push(marker);
                                    map.addLayer(marker);
                                });
                            }

                            if(markers[markerName]) {
                                setMarkers();
                            } else {
                                jQuery.get(CHUCK_DIR + 'resources/markers/' + markerName + '.svg', function (data) {
                                    markers[markerName] = jQuery('svg',data).prop('outerHTML');
                                    setMarkers();
                                });
                            }
                        }
                    });


                };
            });

        }
    };
}]);