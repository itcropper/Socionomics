
var twitterCharts = function($container){
    this.$container = $container;
}

twitterCharts.prototype.init = function () {
    
    var that = this;
    
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        that.$container.highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];

                        socket.on('news', function(msg){
                            //console.log(msg);
                            if(msg.tweetsPerMinute){
                                var x = (new Date()).getTime(), // current time
                                    y = parseFloat(msg.tweetsPerMinute);
                                series.addPoint([x, y], true, true);
                            }

                        });

                    }
                }
            },
            title: {
                text: 'Time'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
                title : {
                 text: "Time"  
                }
            },
            yAxis: {
                title: {
                    text: 'Tweets Per minute'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y;
                        
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [
                {
                    name: 'Frequency Of Posts',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: 1/(1 + Math.pow(Math.E, -1 * Math.random()))
                            });
                        }
                        return data;
                    }())
                }
            ]
        });
    });
};     

var chart = new twitterCharts($('#container'));
chart.init();