/**
 *
 * @authors 陈小雪 (shell_chen@yeah.net)
 * @date    2016-01-13 17:48:43
 * @version $Id$
 */

(function($){
    $.fn.TcptraceCharts = function(options){
        var defaluts = {
            type:"line"
        };

        var settings = $.extend(true, defaluts, options);

        return this.each(function(){
            var $this = $(this);
            $this.highcharts({
                chart:{
                    height: "600",
                    zoomType: 'x',
                },
                title: {
                    align:"center",
                    text: "Tcptrace"
                },
                yAxis:[{
                    title: {
                        text: "数量",
                    },
                    min: 0,
                }],
                credits: {
                    enabled: false
                },
                tooltip: {
                    shared: true,
                },
                plotOptions: {
                    series: {
                        marker: {
                            radius: 8,
                        },
                    },
                },
                series: settings.series,
            });
        });
    }
})(jQuery);


/*
flag time seq ack win
flag 为 > 的使用 time—ack,  time—-win 做两个图
flag 为 < 的使用 time—seq
*/

function get_data(filename){
    $.getJSON("/static/store/"+ filename, function(datas){
        console.log(datas);
        var data_seq = [],
            data_ack = [],
            data_win = [];
        for(var i=0; i<datas.length; i++){
            var data = datas[i],
                flag = data[0],
                time = data[1],
                seq = data[2],
                ack = data[3],
                win = data[4];

            if(flag == "<"){
                data_seq.push([time, seq]);
            }
            else if(flag == ">"){
                data_ack.push([time, ack]);
                data_win.push([time, win]);
            }
        };

        var series = [{
            name: "seq",
            data: data_seq,
        },{
            name: "ack",
            data: data_ack,
        },{
            name: "win",
            data: data_win,
        }];

        $("#charts").TcptraceCharts({
            series: series,
        });
    });
}






