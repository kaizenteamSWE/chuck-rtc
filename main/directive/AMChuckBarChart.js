/*
 * Name: AMChuckBarChart.js
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
 * v0.01 2015-04-12 Bigarella Chiara   Creation
 * ================================================================================
 */

angular.module('chuck')


.directive('amChuckBarchart', ['ChartRequester', 'CHUCK_DIR', 'AMCharts', function (ChartRequester, CHUCK_DIR, AMCharts) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: CHUCK_DIR + 'main/view/AMBarChartView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }
            else {
                scope.ID=attrs.chartId; // it should be use in the barchart's view
            }

           
            AmCharts.ready(function () {
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
                    var labels=chartData.labels;
                    var datasets=chartData.datasets;
                    var dataProvider= [];
                    for (var i=0; i<labels.length; i++) {
                        var row= {
                            "category": labels[i],
                            "color": "#c4c4c4",
                            "column-1": datasets[0].values[i]
                        }
                        if (i==labels.length-1) {
                            row.color=datasets[0].color;
                        }
                        dataProvider.push(row);
                    }
                    var chartSettings = scope.chart.getSettings();

                   scope.barchart=AmCharts.makeChart(attrs.chartId,
                    {
                        "type": "serial",
                        "categoryField": "category",
                        "colors": [],
                        "categoryAxis": {
                            "gridPosition": "start",
                            "tickPosition": "start",
                            "axisAlpha": 0.5,
                            "gridAlpha": 0,
                            "tickLength": 0
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "colorField": "color",
                                "fillAlphas": 1,
                                "id": "AmGraph-1",
                                "lineColorField": "color",
                                "title": "graph 1",
                                "type": "column",
                                "valueField": "column-1"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "axisAlpha": 0,
                                "tickLength": 0,
                                "title": chartSettings.yLabel
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [
                            {
                                "id": "Title-1",
                                "size": 15,
                                "text": " "
                            }
                        ],
                        "dataProvider": dataProvider
                    }); 
                }; // end init()
                function render(newValue, oldValue) {
                    var newData = newValue.getData();
                    var labels=newData.labels;
                    var datasets=newData.datasets;
                    var newDataProvider= [];
                    for (var i=0; i<labels.length; i++) {
                        var row= {
                            "category": labels[i],
                            "color": "#c4c4c4",
                            "column-1": datasets[0].values[i]
                        }
                        if (i==labels.length-1) {
                            row.color=datasets[0].color;
                        }
                        newDataProvider.push(row);
                    }
                    scope.barchart.dataProvider=newDataProvider;
                    scope.barchart.validateData();
                }; // end render()
            }); // end AMCharts
            
        }
    };
}]);

