Date.prototype.toPrettyDateTime = function(e){
     var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    
    var day = this.getDate();
    var monthIndex = this.getMonth();
    var year = this.getFullYear();  
    
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + formatAMPM(this);
}

var detailedChart = function($container){
    this.$container = $container;
}

detailedChart.prototype.init = function () {
    
    var that = this;
    $.getJSON('/data', function (data) {
        var detailChart;
        
        data = data.data;
        
        $(document).ready(function () {

            // create the detail chart
            function createDetail(masterChart) {

                // prepare the detail chart
                var detailData = [],
                    detailStart = new Date(data.tweets[0].time).getTime();
                    plotLines = data.shootings.map(function(v){
                        if(v.time){
                           return {
                            color: 'red',
                            dashStyle: 'solid',
                            value: Date.UTC(2015, 9, 10, 12, 36, 47),
                            width: 2 
                           };
                        }
                    });
                
                $.each(data.tweets, function () {
                    if (new Date(this.time).getTime() >= detailStart) {
                        detailData.push(this.count);
                    }
                });

                // create a detail chart referenced by a global variable
                detailChart = $('#detail-container').highcharts({
                    chart: {
                        marginBottom: 120,
                        reflow: false,
                        marginLeft: 50,
                        marginRight: 20,
                        style: {
                            position: 'absolute'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Tweets per Minute'
                    },
                    subtitle: {
                        text: 'Number Of Tweets per minute relating to gun violence'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: "Tweets Per Minute"
                        },
                        maxZoom: 0.1
                    },
                    tooltip: {
                        formatter: function () {
                            var point = this.points[0];
                            return '<b>' + point.series.name + '</b><br/>' + new Date(this.x).toPrettyDateTime() + '<br/>Number Of Tweets: ' + Highcharts.numberFormat(point.y, 0);
                        },
                        shared: true
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: true,
                                        radius: 3
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Tweets per minute',
                        pointStart: detailStart,
                        pointInterval: 20 * 60 * 1000,
                        data: detailData,
                        threshold: 100000
                    }],

                    exporting: {
                        enabled: false
                    }

                }).highcharts(); // return chart
                
                if(plotLines.every(m => m !== undefined)){
                   
                   detailChart.xAxis.plotLines = plotLines;
                     console.log( detailChart.xAxis);
                }
            }
            
            if(plotLines.every(el => el !== undefined){
                detailChart.xAxis.plotLines = plotLines;
            }
            

            // create the master chart
            function createMaster() {
                $('#master-container').highcharts({ }, function (masterChart) {
                    createDetail(masterChart);
                }).highcharts(); // return chart instance
            }

            // make the container smaller and add a second container for the master chart
            var $container = $('#detail-chart-container')
                .css('position', 'relative');

            $('<div id="detail-container">')
                .appendTo($container);

            $('<div id="master-container">')
                .css({
                    position: 'absolute',
                    top: 300,
                    height: 100,
                    width: '100%'
                })
                    .appendTo($container);
            

            // create master and in its callback, create the detail chart
            createMaster();
            $container.find('#highcharts-2').css('position', 'relative');
        });
    });
};

var chart = new detailedChart('#detail-chart-container');
chart.init();