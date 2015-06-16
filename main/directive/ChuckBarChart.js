/*
 * Name: ChuckBarChart.js
 * Module: Directive
 * Location: Chuck/Main/Directive
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
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


.directive('chuckBarchart', ['ChartRequester', 'CHUCK_DIR', 'GoogleCharts', function (ChartRequester, CHUCK_DIR, GoogleCharts) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: CHUCK_DIR + 'main/view/BarChartView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }

            GoogleCharts.then(function () {

                var barchart = null;
                var options = { };

                ChartRequester.bind(attrs.chartEndpoint,attrs.chartId)
                    .then(function (chart) {
                        if(chart.getType() === 'barchart') {
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
                            if(attrs.showGrid) {
                                scope.chart.settings.style.showGrid = attrs.showGrid === 'true';
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
                    var chartData = scope.chart.getData();
                    var chartSettings = scope.chart.getSettings();

                    options.animation = {
                        duration: chartSettings.style.animationDuration,
                        easing: 'inAndOut',
                        startup: true
                    };

                    options.hAxis = {
                        title: chartSettings.xLabel
                    };

                    options.vAxis = {
                        title: chartSettings.yLabel
                    };

                    options.legend = {
                        position: chartSettings.legendPosition
                    };

                    switch(chartSettings.legendPosition) {

                        case 'right':
                            options.chartArea = {top:"10%", left:"15%", width: '60%', height: '80%'}
                            break;

                        case 'left':
                            options.chartArea = {top:"10%", left:"20%", width: '60%', height: '80%'}
                            break;

                        case 'top':
                            options.chartArea = {top:"17%", left:"15%", width: '70%', height: '60%'}
                            break;


                        case 'bottom':
                            options.chartArea = {top:"7%", left:"15%", width: '70%', height: '60%'}
                            break;

                    }

                    options.bar = {
                        groupWidth: chartSettings.style.barArea
                    }

                    if(chartSettings.orientation === 'horizontal') {
                        options.orientation = 'vertical';
                        options.hAxis.viewWindow = {};
                        if(chartSettings.style.maxValue) {
                            options.hAxis.viewWindow.max = chartSettings.style.maxValue;
                        }

                        if(chartSettings.style.minValue) {
                            options.hAxis.viewWindow.min = chartSettings.style.minValue;
                        }
                    } else {
                        options.orientation = 'horizontal';
                        options.vAxis.viewWindow = {};
                        if(chartSettings.style.maxValue) {
                            options.vAxis.viewWindow.max = chartSettings.style.maxValue;
                        }

                        if(chartSettings.style.minValue) {
                            options.vAxis.viewWindow.min = chartSettings.style.minValue;
                        }
                    }



                    options.series = {};
                    for (var i = 0; i < chartData.datasets.length; i++) {
                        options.series[i] = {};
                        if(chartData.datasets[i].color) {
                            options.series[i].color = chartData.datasets[i].color;
                        }
                        if(chartSettings.legendPosition === 'left') {
                            options.series[i].targetAxisIndex = 1;
                        }
                    }

                    if(chartSettings.style.showGrid) {
                        options.hAxis.gridlines = {
                            count: -1
                        };
                        options.vAxis.gridlines = {
                            count: -1
                        }
                    } else {
                        options.hAxis.gridlines = {
                            count: 2
                        };
                        options.vAxis.gridlines = {
                            count: 2
                        }
                    }

                    barchart = new google.visualization.BarChart(element.contents()[0]);
                };

                function render(newValue, oldValue) {
                    var newData = newValue.getData();

                    var data = new google.visualization.DataTable();

                    data.addColumn('string', 'headers');
                    newData.datasets.forEach(function (dataset) {
                        data.addColumn('number', dataset.name || 'unknow');
                    });

                    for(var i = 0; i < newData.labels.length; i++) {
                        var row = [];
                        row.push(newData.labels[i]);
                        newData.datasets.forEach(function (dataset) {
                            row.push(dataset.values[i]);
                        });
                        data.addRow(row);
                    }

                    barchart.draw(data, options);

                }

                var timeout = null;
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
                });

            });
        }
    };
}]);

