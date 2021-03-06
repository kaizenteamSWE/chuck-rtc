/*
 * Name: ChuckDonutChart.js
 * Module: Directive
 * Location: Chuck/Main/Directive
 * Date: 2015-09-04
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v0.01 2015-09-04 Bigarella Chiara   Creation
 * ================================================================================
 */

angular.module('chuck')


.directive('chuckDonutchart', ['ChartRequester', 'CHUCK_DIR', 'AMCharts', function (ChartRequester, CHUCK_DIR, AMCharts) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: CHUCK_DIR + 'main/view/DonutChartView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }
            else {
                scope.ID=attrs.chartId;
            }

            AmCharts.ready(function () {

                var options = { };

                ChartRequester.bind(attrs.chartEndpoint, attrs.chartId)
                    .then(function (chart) {
                        if(chart.getType() === 'donutchart') {
                            scope.chart = chart;

                            //overriding impostazioni
                            if(attrs.backgroundColor) {
                                scope.chart.settings.style.backgroundColor=attrs.backgroundColor;
                            }
                            if(attrs.legendPosition) {
                                scope.chart.settings.legend.position = attrs.legendPosition;
                            }
                            if(attrs.showLegend) {
                                scope.chart.settings.legend.enabled = attrs.showLegend === 'true';
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
                    if (scope.chart != null) {
                        var chartData = scope.chart.getData();
                        var chartSettings = scope.chart.getSettings();
                        
                        for (var i=0; i<chartData.datasets.length; i++) {
                            var name=chartData.datasets[i].name;
                            var color=chartData.datasets[i].color;
                            var value=chartData.datasets[i].value;
                            var row={"name": name, "color":color, "value":value};
                            dataProvider.push(row);
                        }

                        scope.donutchart=AMCharts.makeChart(attrs.chartId, {
                           "type": "pie",
                            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                            "innerRadius": chartSettings.innerRadius,
                            "labelsEnabled": chartSettings.labels.labelsEnabled,
                            "labelRadius": chartSettings.labels.labelRadius,
                            "color": chartSettings.labels.color,
                            "legend": chartSettings.legend,
                            "startDuration": chartSettings.style.animationDuration,
                            "backgroundColor": chartSettings.style.backgroundColor,
                            "colorField": "color",
                            "titleField": "name",
                            "valueField": "value",
                            "allLabels": [],
                            "balloon": {},
                            "titles": [],
                            "dataProvider": dataProvider
                        });
                    }
                };

                function render(newValue, oldValue) {
                    var newData = newValue.getData();
                    scope.donutchart.dataProvider = newData.datasets;
                    scope.donutchart.validateData();
                }

                /* var timeout = null;
                function resize() {
                    timeout = null;
                    var time = options.animation.duration;
                    options.animation.duration = 0;
                    render(scope.chart, scope.chart);
                    options.animation.duration = time;
                }
                jQuery(window).resize(function(){
                    if(barchart && !timeout) {
                        timeout = setTimeout(resize, 500);
                    }
                });*/

            });
        }
    };
}]);

