$(function () {
    var type = $.query.get('type');
    var time_type = $.query.get('time_type');
    var lastp='';
    type=(type)?type:'gold';
    time_type=(time_type)?time_type:'5min';
    var fix = (type=='silver')?3:2;
    var url = 'https://news1.hx9999.com/candlestick/get_candlestick_data?type='+type+'&time_type='+time_type+'&mt='+ new Date().getTime() +'';
    Highcharts.setOptions({
        lang: {
            resetZoom: '重置',
            resetZoomTitle:"重置缩放比例"
        },
        global: {
            useUTC:false,
            timezoneOffset:8
        }
    });
    $.getJSON(url+'&callback=?', function (data) {
        lastp = data.last;
        var res =data.list;
        res = format_res(res);
        //console.log(res.length);
        $('#container').highcharts('StockChart', {
            chart : {
                type: 'candlestick',
                zoomType: 'x',
                backgroundColor:'none'
            },
            navigator : {
                adaptToUpdatedData: false,
                series : {
                    data : data
                }
            },

            scrollbar: {
                liveRedraw: false
            },
            title: {
                // text: 'HX99.com 伦敦金'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                //修改蜡烛颜色
                candlestick: {
                    upColor: "#00a004",
                    upLineColor: "#00a004",
                    color: "#F00",
                    lineColor: "#F00"
                }
            },
            tooltip: {
                formatter: function() {
                    var open = parseFloat(this.points[0].point.open).toFixed(fix);
                    var high = parseFloat(this.points[0].point.high).toFixed(fix);
                    var low = parseFloat(this.points[0].point.low).toFixed(fix);
                    var close = parseFloat(this.points[0].point.close).toFixed(fix);

                    relativeWidth = this.points[0].point.shapeArgs.x;
                    var tip ='';
                    if(time_type=='5min'){
                        tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x) +'</b><br/>';
                    }else if(time_type=='60min'){
                        tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d %H:00', this.x) +'</b><br/>';
                    }else if(time_type=='1day'){
                        tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d', this.x) +'</b><br/>';
                    }
                    var t_style = '';
                    if(open>close){
                        t_style = '<span style="color: #DD2200;">';
                    }else{
                        t_style = '<span style="color: #33AA11;">';
                    }
                    tip += '开盘价：'+t_style+open+' </span><br/>';
                    tip += '最高价：'+t_style+high+' </span><br/>';
                    tip += '最低价：'+t_style+low+' </span><br/>';
                    tip += '收盘价：'+t_style+close+' </span><br/>';
                    return tip;
                }
            },
            navigator:{
                enabled:false
            },
            scrollbar:{
                enabled:false
            },
            rangeSelector : {
                enabled:false,
                inputEnabled: false,
                labelStyle: {
                    // visibility: 'hidden'
                    text:'还原'
                }
            },

            xAxis : {
                type:"datetime",
                dateTimeLabelFormats:{
                    second: 'H:%M',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d'
                },
                labels:{
                    step:2
                }
            },
            yAxis:[
                {
                    opposite: false,
                    offset: 0,
                    endOnTick: true,
                    lineWidth: 0,
                    lineColor: '#ccc',
                    showLastLabel:true,
                    labels:{
                        formatter:function(){
                            return parseFloat(this.value).toFixed(fix);
                        },
                        y:3
                    }
                }
            ],
            //数据
            series : [{
                data : res,
                dataGrouping: {
                    enabled: false
                }
            }]
        });
    });
    //首次加载后要获取一次
    setTimeout(afterSetExtremes,500);
    //动态添加
    setInterval(afterSetExtremes,15000);


    function format_res(res){
        var data =new Array();
        var width = $(window).width();
        i=0;
        $.each(res,function(key,vlaue){
            //console.log(vlaue);
            var t = vlaue[0];
            var o = parseFloat(vlaue[1]);
            var h =parseFloat(vlaue[2]);

            var l =parseFloat(vlaue[3]);
            var c =parseFloat(vlaue[4]);
            data[i]=[t,o,h,l,c];
            //console.log(data[i]);
            i++;
        });
        return data;
    }
    function afterSetExtremes() {
       // console.log(lastp);
        var chart = $('#container').highcharts();
        $.getJSON(url+'&last='+lastp+'&callback=?', function (data) {
            var res = data.list;
            res = format_res(res);
            var n=0;
            for(var i=0; i<res.length;i++){
                if(res[i][0]!=0){
                    chart.series[0].addPoint(res[i],false);
                    //console.log(chart.series[0].data);
                    if(lastp!=data.last){
                        chart.series[0].removePoint(n);
                    }
                    n++;
                    lastp = data.last;
                }
            }
            chart.redraw();
        });
    }
});