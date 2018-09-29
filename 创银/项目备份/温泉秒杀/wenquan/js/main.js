"use strict";
//首页轮播图
var swiperBan = new Swiper('.banner', {
	pagination : '.swiper-pagination',
	paginationType : 'fraction',
	autoplay : 2000,
	loop : true
});
//商品栏目分类
//栏目滚动
var swiperTab = new Swiper('.pro_tab', {
    slidesPerView: 'auto'
});
//栏目点击切换以及偏移
$("#proTab").on("click", ".swiper-slide", function(){
	$(this).addClass("on").siblings().removeClass("on");
	var ssW = $("#proTab .swiper-slide").width() * 4;
	var onPleft = $("#proTab .swiper-wrapper").position().left + $("#proTab .on").position().left;

	if ( onPleft >= ssW ) {
		swiperTab.slideNext();
	}else if ( onPleft < 0 ){
		swiperTab.slidePrev();
	}
});

//商品详情页
//秒杀倒计时
var endTime = new Date(2018,8,11,20,30,0);
setInterval(function () {
    var nowtime = new Date();
    var time = endTime - nowtime;
    if( time <= 0 ){
	    $("#countdownHour").text('00');
	    $("#countdownMinute").text('00');
	    $("#countdownSecond").text('00');
    }else{
	    var hour = parseInt(time / 1000 / 60 / 60 );
	    var minute = parseInt(time / 1000 / 60 % 60);
	    var seconds = parseInt(time / 1000 % 60);
	    
	    if( hour<10 ){
	    	hour = '0' + hour;
	    }
	    if( minute<10 ){
	    	minute = '0' + minute;
	    }
	    if( seconds<10 ){
	    	seconds = '0' + seconds;
	    }
	    
	    $("#countdownHour").text(hour);
	    $("#countdownMinute").text(minute);
	    $("#countdownSecond").text(seconds);
    }
}, 1000);
//用户须知与图文详情点击事件
$("#notDetNav").on("click", "div", function(){
	$(this).children("a").addClass("on");
	$(this).siblings().children("a").removeClass("on");
});
//其他用户浏览商品
var swiperOther = new Swiper('.pd_others', {
    slidesPerView: 'auto',
//  slideToClickedSlide:true
});

//用户购买页面
//监听商品数量输入大于1
$('#buyNumber').bind('input propertychange ',function(){
	var buyN = $("#buyNumber").val()-0;
	if( buyN < 1 ){
		$("#buyNumber").val(1);
	}
	buyTotalMoney();
});
//商品数量点击增加或减少
$("#numDown").on("click", function(){
	var buyN = $("#buyNumber").val()-0;
	if( buyN <= 1 ){ 
		return;
	}else{
		$("#buyNumber").val(buyN-1);
		buyTotalMoney();
	}
})
$("#numUp").on("click", function(){
	var buyN = $("#buyNumber").val()-0;
	$("#buyNumber").val(buyN+1);
	buyTotalMoney();
})
//立即支付，验证
function yanzhengpay(){
	var uname = $("#buyUser").val();
	var uphone = $("#buyPhone").val();
    if( uname.trim() == '' ){
        $(".buy_sg_user_tips").show();
        $(".buy_sg_user_tips").on("click", function(){
	    	$(this).hide();
	    	$("#buyUser").focus();
	    })
        return false;
    };
    if( !(/^1[3|4|5|7|8]\d{9}$/.test( uphone ))  ){
        $(".buy_sg_phone_tips").show();
        $(".buy_sg_phone_tips").on("click", function(){
	    	$(this).hide();
	    	$("#buyPhone").focus();
	    })
        return false;
    };
    
    //支付代码
    
}
//商品购买计算总金额
function buyTotalMoney(){
	var buyN = $("#buyNumber").val()-0;
	var buyP = $("#buyPrice").html()-0;
	$("#buyTotalMoney").html( buyN*buyP );
}
