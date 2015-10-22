/*
 * Name: AMChuckLineChart.js
 * Module: Directive
 * Location: Chuck/Main/Directive
 * Date: 2015-10-22
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

.directive('amChuckLinechart', ['ChartRequester', 'CHUCK_DIR', 'AMCharts', function (ChartRequester, CHUCK_DIR, AMCharts) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: CHUCK_DIR + 'main/view/AMLineChartView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }
            else {
                scope.ID=attrs.chartId; // it should be use in the linechart's view
            }

            AmCharts.ready(function () {
            	ChartRequester.bind(attrs.chartEndpoint,attrs.chartId)
                    .then(function (chart) {
                        if(chart.getType() === 'linechart') {
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
                    }); // end bind()
				
				function init() {
                    var chartData = scope.chart.getData();
                    var labels=chartData.labels;
                    var datasets=chartData.datasets;
                    var dataProvider= [];
                    for (var i=0; i<labels.length; i++) {
                        var row= {
                            "category": labels[i],
                            "column-1": datasets[0].values[i]
                        }
                        if (i==labels.length-1) {
                            dataProvider.push(row);
                        }
                        dataProvider.push(row);
                    }

                    var chartSettings = scope.chart.getSettings();


                    scope.linechart=AmCharts.makeChart(attrs.chartId,
                    {
						"type": "serial",
						"categoryField": "category",
						"columnWidth": 0,
						"backgroundColor": "#000000",
						"color": "#FFFFFF",
						"categoryAxis": {
							"startOnAxis": true,
							"tickPosition": "start",
							"axisColor": "#FFFFFF",
							"axisThickness": 0,
							"color": "#FFFFFF",
							"fontSize": 11,
							"gridAlpha": 0,
							"gridColor": "#FFFFFF",
							"tickLength": 0
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonColor": "#83CEF0",
								"balloonText": "[[category]]:[[column-1]]",
								"colorField": "color",
								"fillAlphas": 0.15,
								"fillColors": "#83CEF0",
								"id": "AmGraph-1",
								"lineAlpha": 0.99,
								"lineColor": "#A6DDF6",
								"lineThickness": 3,
								"title": "graph 1",
								"type": "smoothedLine",
								"valueField": "column-1"
							}
						],
						"guides": [],
						"valueAxes": [
							{
								"id": "ValueAxis-1",
								"gridAlpha": 0.22,
								"gridColor": "#FFFFFF",
								"labelFrequency": 2,
								"title": chartSettings.yLabel,
								"titleColor": "#FFFFFF"
							}
					],
					"allLabels": [],
					"balloon": {
						"color": "#FFFFFF",
						"shadowColor": "#FFFFFF"
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": ""
						}
					],
					"dataProvider": dataProvider
				});
                }; // end init()
                function render(newValue, oldValue) {
                    var newData = newValue.getData();

                    var labels=chartData.labels;
                    var datasets=chartData.datasets;
                    var newDataProvider= [];
                    for (var i=0; i<labels.length; i++) {
                        var row= {
                            "category": labels[i],
                            "column-1": datasets[0].values[i]
                        }
                        if (i==labels.length-1) {
                            newDataProvider.push(row);
                        }
                        newDataProvider.push(row);
                    }

                    scope.linechart.dataProvider=newDataProvider;
                    scope.linechart.validateData();
                };// end render()


            });// end AMCharts
        }
    }
}]);