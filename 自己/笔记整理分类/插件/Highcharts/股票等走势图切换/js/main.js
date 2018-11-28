'use strict';
//图表走势图
$.getJSON('demo.json', function (data) {

    //创建表格
    Highcharts.stockChart('container', {
//  	顶部范围选择器
        rangeSelector: {
            enabled:false,
            inputEnabled: false,
            labelStyle: {
                // visibility: 'hidden'
                text:'还原'
            }
        },
//      导航器
		navigator: {
			enabled: false,
		},
//		滚动条
		scrollbar: {
            enabled: false
        },
//      禁止版权信息
		credits: {
			enabled: false
		},
//		修改鼠标移入显示文字样式
		plotOptions: {
//			series 是针对所有配置有效
		    series: {
		        tooltip: {
		            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
		                '开盘: {point.open}<br/>' +
		                '最高: {point.high}<br/>' +
		                '最低: {point.low}<br/>' +
		                '收盘: {point.close}<br/>'
		        }
		    }
		},
        series: [{
            type: 'candlestick',
            name: '2018-11-28',
            data: data,
            dataGrouping: {
                enabled: false
            },
            // 控制走势为跌的蜡烛颜色
		    color: 'green',
		    lineColor: 'green',
		
		    // 控制走势为涨的蜡烛颜色
		    upColor: 'red',
		    upLineColor: 'red',
			
            
        }]
    });
});
















