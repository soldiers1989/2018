'use strict';
$(".content").prepend(_jyheader).append(_jyfooter);
//  倒计时
	var endTime = new Date(2018,7,3,20,30,0);
	setInterval(function () {
	    var nowtime = new Date();
	    var time = endTime - nowtime;
	    if( time <= 0 ){
	    	$("#countdownDay").text('00');
		    $("#countdownHour").text('00');
		    $("#countdownMinute").text('00');
		    $("#countdownSecond").text('00');
	    }else{
	    	var day = parseInt(time / 1000 / 60 / 60 / 24);
		    var hour = parseInt(time / 1000 / 60 / 60 % 24);
		    var minute = parseInt(time / 1000 / 60 % 60);
		    var seconds = parseInt(time / 1000 % 60);
		    if( day<10 ){
		    	day = '0' + day;
		    }
		    if( hour<10 ){
		    	hour = '0' + hour;
		    }
		    if( minute<10 ){
		    	minute = '0' + minute;
		    }
		    if( seconds<10 ){
		    	seconds = '0' + seconds;
		    }
		    
		    $("#countdownDay").text(day);
		    $("#countdownHour").text(hour);
		    $("#countdownMinute").text(minute);
		    $("#countdownSecond").text(seconds);
	    }
	}, 1000);
//非农月份时间轮播图
jQuery(".fndate").slide({mainCell:".fndate_box",effect:"left",vis:3,defaultIndex: 6});
//距离下次剖析剩余时间百分比
var Progress = function() {
	var progress = {
		textheight: null,
		renderOne: function(id, length, r, percent) {
			var canvas = document.getElementById(id);
			var context = canvas.getContext("2d");
			canvas.width = length;
			canvas.height = length;
			var i = 0;
			var interval = setInterval(function() {
				i++;
				progress.render(context, length, r, i, percent);
				if(i >= percent) {
					clearInterval(interval)
				}
			}, 5)				
		},
		render: function(context, length, r, i, percent) {
			context.clearRect(0, 0, length, length);
			context.beginPath();
			var gradient = context.createLinearGradient(length, 0, 0, 0);
			gradient.addColorStop("0", "#ccb1e5");
			gradient.addColorStop("1.0", "#813499");
			context.strokeStyle = gradient;
			context.lineWidth = r;
			context.arc(length / 2, length / 2, length / 2 - r, -0.5 * Math.PI, -0.5 * Math.PI + i * 0.02 * Math.PI, false);
			context.stroke();
			context.closePath();
		}
	};
	return progress
};
var now = new Date();
var lastMonth = new Date("2018/07/06 20:30:00");
if(lastMonth!=null){
	var intDiff = endTime.getTime() - now.getTime();
    var day = parseInt(intDiff / 1000 / 60 / 60 / 24);
    var zhouqi = (endTime.getTime()-lastMonth.getTime())/1000/3600/24;
    var percent =((zhouqi-day)/zhouqi).toFixed(2)*100;
    $(".fndate_box .on").append('<canvas id="canvas"></canvas>');
    new Progress().renderOne('canvas',100,6,percent);
}
//非农解读显示隐藏
$("#fndefineTitle>div").hover(function(){
	var that = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$("#fndefineCont .detail").eq(that).show();
	var other = that>0 ? 0 : 1;
	$("#fndefineCont .detail").eq(other).hide();
})
//往期非农回顾轮播图
    var $a=$("#analyst .buttons a");
    var $s=$("#analyst .buttons span");
    var cArr=["p3","p2","p1"];
    var index=0;
    $("#analyst .next").click(
        function(){
            nextimg();
        }
    )
    $("#analyst .prev").click(
        function(){
            previmg();
        }
    )
    function previmg(){
        cArr.unshift(cArr[2]);
        cArr.pop();
        $("#analyst li").each(function(i,e){
            $(e).removeClass().addClass(cArr[i]);
        })
        index--;
        if (index<0) {
            index=2;
        }
        show();
    }
    function nextimg(){
        cArr.push(cArr[0]);
        cArr.shift();
        $("#analyst li").each(function(i,e){
            $(e).removeClass().addClass(cArr[i]);
        })
        index++;
        if (index>2) {
            index=0;
        }
        show();
    }
    $a.each(function(){
        $(this).click(function(){
            var myindex=$(this).index();
            var b=myindex-index;
            if(b==0){
                return;
            }
            else if(b>0) {
                var newarr=cArr.splice(0,b);
                cArr=$.merge(cArr,newarr);
                $("#analyst li").each(function(i,e){
                    $(e).removeClass().addClass(cArr[i]);
                })
                index=myindex;
                show();
            }
            else if(b<0){
                cArr.reverse();
                var oldarr=cArr.splice(0,-b)
                cArr=$.merge(cArr,oldarr);
                cArr.reverse();
                $("#analyst li").each(function(i,e){
                    $(e).removeClass().addClass(cArr[i]);
                })
                index=myindex;
                show();
            }
        })
    })
    function show(){
        $($s).eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
    }
    $(document).on("click","#analyst .p2",function(){
        previmg();
        return false;
    });
    $(document).on("click","#analyst .p3",function(){
        nextimg();
        return false;
    });
    var timer=setInterval(nextimg,3000);
    $(".fnreview_right").hover(function(){
    	clearInterval(timer);
    },function(){
    	timer=setInterval(nextimg,3000);
    });
//  图片点击放大
    $("#analyst img").on("click",function(){
    	var thatSrc = $(this).attr("src");
    	$("#fnBigImg").show();
    	$("#fnBigImg img").attr("src",thatSrc);
    })
    $("#fnBigImg").on("click",function(){
    	$("#fnBigImg img").removeClass("fn_big_img1");
    	$("#fnBigImg").hide();
    });
//右侧客服悬浮窗
$(document).scroll(function(){
	var serverH = $(document).scrollTop()+200;
	if( $(document).scrollTop() > 580 ){
		$("#server").slideDown(100);
		$("#server").animate({
			top: serverH
		},30);
	}else{
		$("#server").slideUp(100);
	}
});