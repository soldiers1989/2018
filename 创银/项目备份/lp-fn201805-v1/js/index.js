$(document).ready(function () {
    $(".u-toggle").click(function () {
        if($(".xuanfu").hasClass("active")){
            $(".xuanfu").hide(100);
            $(this).attr("src","http://www.hj9999.hk/statics/kefuimage/plus.png");
            $(".xuanfu").removeClass("active")
        }
        else{
            $(".xuanfu").show(100);
            $(this).attr("src","http://www.hj9999.hk/statics/kefuimage/del.png");
            $(".xuanfu").addClass("active")
        }
    });
    
//  倒计时
	var starttime = new Date(2018,4,4,20,30,0);
	setInterval(function () {
	    var nowtime = new Date();
	    var time = starttime - nowtime;
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
	
    function tab(objList1,objList2,status) {//切换函数封装
        for(var i=0;i<objList1.length;i++){
            objList1.eq(i).mouseenter(function () {
                objList1.each(function () {
                    $(this).removeClass(status);
                });
                $(this).addClass(status);
                objList2.each(function () {
                    $(this).removeClass(status);
                });
                objList2.eq($(this).index()).addClass(status);
            })
        }
    }
    tab($(".jd-group-btn li"),$(".jd-group-content li"),"active");//非农解读切换
});
