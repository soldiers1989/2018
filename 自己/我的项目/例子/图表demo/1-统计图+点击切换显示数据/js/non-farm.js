// <!-- chart图表 -->
//近期数据回顾
function getData() {
    $.ajax({
        url: "fndata.html",
        type: "get",
        dataType: "json",
        success: function(data) {
            if (data) {
                var dataArr = eval(data);
                drawChart(dataArr);
                defaultData(dataArr);
            }
        },
        error: function() {
            console.log("无数据返回！");
        }
    });
}
getData();
//图表默认显示最后一条数据
function defaultData(data) {
    var last = data[data.length - 1];
    $(".ADP").text(last.ADP);
    $(".NonFarm").text(last.NonFarm);
    $(".UnemploymentRate").text(last.UnemploymentRate);
    $(".GoldPriceMove").text(last.GoldPriceMove);
    $(".Date").text(timeFormat(last.openDate));
    $(".profitRange").text(last.profitRange);
    $(".GoldPrizeMoveReson").text(last.GoldPrizeMoveReson);
}
// 格式化时间
function timeFormat(dateTime) {
    var time = new Date(dateTime); //先把参数转换成标准时间格式
    var year = time.getFullYear();
    var month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    var day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    time = year + "年" + month + "月" + day + "日";
    return time;
}
//图表点击事件
function fillTable(data, dataTime, pointX) {
    var n = pointX + 1;
    var x = (12 - n) * 78 + 55;
    $(".prompt-arrow1").css("right", x + "px");
    for (var i = 0; i < data.length; i++) {
        if (data[i].openDate.indexOf(dataTime)>=0) {
            $(".ADP").text(data[i].ADP);
            $(".NonFarm").text(data[i].NonFarm);
            $(".UnemploymentRate").text(data[i].UnemploymentRate);
            $(".GoldPriceMove").text(data[i].GoldPriceMove);
            $(".Date").text(timeFormat(data[i].openDate));
            $(".profitRange").text(data[i].profitRange);
            $(".GoldPrizeMoveReson").text(data[i].GoldPrizeMoveReson);
        }
    }
}
function drawChart(data) {
    var ADPdata = [],
        nonFarmData = [],
        dataTime = [];
    for (var i = 0; i < data.length; i++) {
        ADPdata.push(parseFloat(data[i].ADP.split("万")[0]));
        nonFarmData.push(parseFloat(data[i].NonFarm.split("万")[0]));
        
        if($(window).width()<=750){
            dataTime.push(data[i].openDate.split("/")[1]+'/'+data[i].openDate.split("/")[2]);
        }else{dataTime.push(data[i].openDate);}
    }
    if($(window).width()<=750){
        dataTime=dataTime.slice(6);
        nonFarmData=nonFarmData.slice(6);
        ADPdata=ADPdata.slice(6);
    }

    $('#chart').highcharts({
        chart: {
            backgroundColor: '#f1efef'
        },
        title: {
            text: false
        },
        subtitle: {
            text: false
        },
        xAxis: [{
            categories: dataTime,
            tickWidth: '0',
            labels: {
                y: 30,
                style: {
                    color: '#333434',
                    fontSize: '14px',
                    fontFamily: '微软雅黑'
                }
            },
            id: 'x-axis',
        }],

        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}万',
                style: {
                    color: '#000'
                }
            },
            title: {
                text: false
            }
        }, { // Secondary yAxis
            title: {
                text: false
            },
            labels: {
                format: false
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                states: {
                    select: {
                        color: '#6eb1fb'
                    },
                    hover: {
                        color: '#6eb1fb'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function(event) {
                            fillTable(data, this.category, event.point.x);
                        }
                    }
                }
            }
        },
        series: [{
            name: '公布值',
            color: '#258cfe',
            type: 'line',
            data: nonFarmData,
            tooltip: {
                valueSuffix: '万'
            },
            zIndex: '99'
        }, {
            name: 'ADP',
            color: '#add1f8',
            type: 'column',
            data: ADPdata,
            tooltip: {
                valueSuffix: '万'
            },
            zIndex: '9'
        }]
    });
};
