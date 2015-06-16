/*
 * Name: ChuckTable.js
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
 * v0.08 2015-06-01 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-28 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */
angular.module('chuck')


.directive('chuckTable', ['ChartRequester', 'CHUCK_DIR', 'DataTables', function (ChartRequester, CHUCK_DIR, DataTables) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: CHUCK_DIR + 'main/view/TableView.html',
        link: function(scope, element, attrs) {

            if(!attrs.chartEndpoint || !attrs.chartId) {
                throw new Error('chart-endpoint and chart-id are mandatory');
            }

            DataTables.then(function () {
                var table = null;

                ChartRequester.bind(attrs.chartEndpoint,attrs.chartId)
                    .then(function (chart) {
                        if(chart.getType() === 'table') {
                            scope.chart = chart;

                            // overriding impostazioni
                            if(attrs.textColor) {
                                var colors = eval(attrs.textColor);
                                for (var i in colors) {
                                    for (var j in colors[i]) {
                                        if(colors[i][j] && scope.chart.data.datasets.length > i && scope.chart.data.datasets[i].row.length > j) {
                                            scope.chart.data.datasets[i].row[j].color = colors[i][j];
                                        }
                                    }
                                }
                            }

                            if(attrs.bgColor) {
                                var colors = eval(attrs.bgColor);
                                for (var i in colors) {
                                    for (var j in colors[i]) {
                                        if(colors[i][j] && scope.chart.data.datasets.length > i && scope.chart.data.datasets[i].row.length > j) {
                                            scope.chart.data.datasets[i].row[j].background = colors[i][j];
                                        }
                                    }
                                }
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
                    var info = {};

                    info.columns = [];
                    info.columns.push({title: '_ordering'})
                    data.headers.forEach(function (header) {
                        info.columns.push({title: header});
                    });

                    info.data = [];
                    info.bFilter = settings.allowFilter;
                    info.bSort = settings.allowSort;
                    info.bPaginate = (settings.pageSize >= 0);
                    info.lengthChange = false;
                    info.iDisplayLength = settings.pageSize;

                    var tableElement = jQuery(element.contents()[0]);
                    if(settings.showTableGrid) {
                        tableElement.addClass('table');
                        tableElement.addClass('table-striped');
                    } else {
                        tableElement.addClass('nowrap');
                    }
                    table = tableElement.DataTable(info);


                    table.column(0).visible(false);
                };

                function render(newValue, oldValue) {
                    var newData = newValue.getData();

                    var page = table.page();

                    table.rows().remove();

                    for (var i = 0; i < newData.datasets.length; i++) {
                        var row = [];
                        row.push(i);
                        newData.datasets[i].row.forEach(function (item) {
                            row.push(item.value);
                        });
                        table.row.add(row);
                    }

                    table.cells().every(function () {
                        var row = this.index().row;
                        var column = this.index().column - 1;
                        if(column >= 0) {
                            
                            if(newData.datasets[row].row[column].color)
                                jQuery(this.node()).css('color', newData.datasets[row].row[column].color);
                            if(newData.datasets[row].row[column].background)
                                jQuery(this.node()).css('background-color', newData.datasets[row].row[column].background);
                        }
                    });

                    table.draw();
                    table.page(page).draw(false);

                };
            });
        }
    };
}]);
