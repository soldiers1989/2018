$(function(){

    // 顶部nav 鼠标效果

    // var states_num = 1;
    $(".nav-list .nav-item").hover(function(){
        $(".nav").addClass("color");
        var oIndex = $(this).index();
        if(oIndex !== 0 && oIndex !== 8){
            $(".nav-inner").stop().animate({"height": "383px"},300);
        }
    },function(){
        $(".nav-inner").stop().animate({"height": "110px"},300);
    });

    // 策略切换
	var states = [
		["0px", "650px", "835px", "1020px"],
		["0px", "185px", "835px", "1020px"],
		["0px", "185px", "370px", "1020px"],
		["0px", "185px", "370px", "555px"]
	];

	$(".analysis_con_box_1 .box_left").hover(function(){
		$(".analysis_con_box_2").stop().animate({left: states[0][1]}, 500);
		$(".analysis_con_box_3").stop().animate({left: states[0][2]}, 500);
		$(".analysis_con_box_4").stop().animate({left: states[0][3]}, 500);
	});
	$(".analysis_con_box_2 .box_left").hover(function(){
		$(".analysis_con_box_2").stop().animate({left: states[1][1]}, 500);
		$(".analysis_con_box_3").stop().animate({left: states[1][2]}, 500);
		$(".analysis_con_box_4").stop().animate({left: states[1][3]}, 500);
	});
	$(".analysis_con_box_3 .box_left").hover(function(){
		$(".analysis_con_box_2").stop().animate({left: states[2][1]}, 500);
		$(".analysis_con_box_3").stop().animate({left: states[2][2]}, 500);
		$(".analysis_con_box_4").stop().animate({left: states[2][3]}, 500);
	});
	$(".analysis_con_box_4 .box_left").hover(function(){
		$(".analysis_con_box_2").stop().animate({left: states[3][1]}, 500);
		$(".analysis_con_box_3").stop().animate({left: states[3][2]}, 500);
		$(".analysis_con_box_4").stop().animate({left: states[3][3]}, 500);
	});
	$(".analysis_con .analysis_con_box").hover(function(){
		$(this).addClass("active").siblings("li").removeClass("active");
	});

    // 明星讲师切换
    var infoList;//分析师简介
    $.get("http://www.hj9999.hk/statics/version03/js/server/get_data.php", function(result){
        infoList = JSON.parse(result);
        for(var j = 0;j<infoList.length;j++){
            $(".like_val").eq(j).text(infoList[j].likeNum);
        }
    });

    var tecNum = 0;
    var tecTimer;
    tecTimer = setInterval(function(){
        tecNum++;
        $(".show_box").eq(tecNum).addClass("active").siblings(".show_box").removeClass("active");
        $(".tec_sel_box li").eq(tecNum).addClass("active").siblings("li").removeClass("active");
        if(tecNum>=4){
            tecNum = 0;
        }
    },8000);

    $(".tec_sel_box li").hover(function(){
        var oSel = $(this).index();
        clearInterval(tecTimer);
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".show_box").eq(oSel).addClass("active").siblings(".show_box").removeClass("active");
        tecNum = oSel;
        tecTimer = setInterval(function(){
            tecNum++;
            $(".show_box").eq(tecNum).addClass("active").siblings(".show_box").removeClass("active");
            $(".tec_sel_box li").eq(tecNum).addClass("active").siblings("li").removeClass("active");
            if(tecNum>=4){
                tecNum = 0;
            }
        },8000);
    });


    // 点赞
    var oUnLike = $(".unlike");
    var oLike = $(".like");
    var oShowbox = $(".show_box");
    for(var i = 0;i < oUnLike.length;i++){
        (function(i){
           oUnLike.eq(i).click(function(){
                $(this).removeClass("active").siblings(".like").addClass("active");
                var new_num = parseInt(infoList[i].likeNum);
                new_num++;
                infoList[i].likeNum = new_num;
                write_data = JSON.stringify(infoList);
                $.post("http://www.hj9999.hk/statics/version03/js/server/write_data.php", {write_data: write_data}, function(data){
                    $(".like_val").eq(i).text(new_num);
                })
           })
        })(i);
    }

    // 侧边栏
    $(window).scroll(function(){
        if($(window).scrollTop() > 95){
            $(".rightIcon").css({"padding-top":"95px","top":"0px"});
            $(".rightIcon-content").css({"top":"95px"});
            $(".rightIcon-main").css({"top":"95px"});
        }else{
            $(".rightIcon").css({"padding-top":"0px","top":"95px"});
            $(".rightIcon-content").css({"top":"0px"});            
            $(".rightIcon-main").css({"top":"0px"});            
        }
    });

    // 喇叭动态效果
    var labaNum = 1;
    var labaTimer = setInterval(function(){
        labaNum++;
        if(labaNum === 1){
            $(".announ-icon").css("background-position", "0 0");
        }else if(labaNum === 2){
            $(".announ-icon").css("background-position", "-35px 0");
        }else if(labaNum === 3){
            $(".announ-icon").css("background-position", "-70px 0");
        }else if(labaNum === 4){
            $(".announ-icon").css("background-position", "-105px 0");
        }else{
            labaNum = 0;
            $(".announ-icon").css("background-position", "0 0");
        }
    },300);
})