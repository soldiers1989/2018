'use strict';
//添加公用部分
$(".content").prepend(_jyheader).append(_jyfooter);
//	活动规则
$("#actRuleBtn").on("click",function(){
	$("#rulesBox").show();
	$(".rulesbox_cont").animate({
		height: 584
	},300);
});
$("#rulesBoxClose").on("click",function(){
	$(".rulesbox_cont").animate({
		height: 0
	},300,function(){
		$("#rulesBox").hide();
	});
});
//遍历循环中奖名单
function zjList(){
	var s='';
	var m;
	var data = [
		'恭喜 133******** 获得200美元赠金+京东E卡',
		'恭喜 132******** 获得 二等奖 IPHONE X',
		'恭喜 138******** 获得200美元赠金+京东E卡',
		'恭喜 155******** 获得 一等奖 重疾保险',
		'恭喜 156******** 获得 三等奖 1000元京东E卡',
		'恭喜 138******** 获得200美元赠金+京东E卡',
		'恭喜 139******** 获得 特等奖 Darry ring钻戒',
		'恭喜 187******** 获得200美元赠金+京东E卡',
		'恭喜 159******** 获得200美元赠金+京东E卡',
		'恭喜 186********  获得200美元赠金+京东E卡',
		'恭喜 137********  获得二等奖IPHONE X',
		'恭喜 159********  获得200美元赠金+京东E卡',
		'恭喜 152********  获得200美元赠金+京东E卡',
		'恭喜 188********  获得200美元赠金+京东E卡'
	];
	for( var i=0; i<data.length; i++ ){
		m = '<li>' +
				'<img class="ll_img" src="images/notice.png"/>' +
				'<a href="https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=515221&configID=41928&jid=6934404885&s=1&returnbt=1" target="_blank">' +
					data[i] +
				'</a>' +
			'</li>';
		s = s + m;
	}
	$("#zjlist").html(s);
}
zjList();
//中奖名单展示轮动
jQuery(".lucky_list").slide({mainCell:".bd ul",autoPlay:true,effect:"topLoop",vis:1,interTime:2000});
//抽奖
choujiang();
function choujiang(){
	var $btn = $('.g-lottery-img');// 旋转的div
    var playnum = 0; //初始次数，由后台传入
    var writephone = 0;  //是否填写了手机号码
    var isture = 0;//是否正在抽奖
    var uphone;
//	手机号码验证
	$("#ct2_cjbtn").click(function(){
		uphone = $("#phone").val();
		if( !(/^1[3|4|5|7|8]\d{9}$/.test( uphone )) ){
	        alert("请正确填写手机号码以获得3次抽奖次数");
	        $("#phone").focus();
	    }else{
	    	submitPhone();
	    }
	});
    //提交数据电话号码
    function submitPhone(){
    	$.ajax({
	        type:"post",	 
		    url:"http://www.hj9999.hk/index.php?m=huangjinshenqing&c=index&a=send",
		    data:{uname:1,uphone:uphone,dosubmit:1},
		    success:function(data){
		    	if (data == 0) {
		    		alert('今天的次数已经用完了，请24小时后再来。');
		    	}else if (data == 1) {
		    		alert('恭喜您获得3次抽奖次数！');
					writephone = 1;
					playnum = 3;
		    	}
		    },
		    error:function(){
			    alert("网络故障，请检查");
			    return false;
		    }
	    });
    }
	//轮盘抽奖
    var clickfunc = function() {
    	var data = Math.floor(Math.random() * 1000);
    	var uprize;
//  	轮盘转动
    	if(data>=0 && data<550) {
    		rotateFunc(0, 30);
    	}else if(data>=550 && data <996) {
    		uprize = '200美元赠金+200元京东E卡';
    		rotateFunc(1, -90);
    	}else if(data == 996) {
    		uprize = '1000元京东购物E卡';
    		rotateFunc(2, 90);
    	}else if(data == 997) {
    		uprize = 'iPhoneX';
    		rotateFunc(3, -30);
    	}
    	else if(data == 998) {
    		uprize = '重疾保险（最高保额50万元）';
    		rotateFunc(4, -150);
    	}
    	else if(data == 999) {
    		uprize = 'Darry Ring钻戒 ';
    		rotateFunc(5, 150);
    	}
    	
//  	ajax提交用户中奖记录
    	if(data>=550){
    		$.ajax({
				type: "post",
				url: "http://www.hj9999.hk/index.php?m=zgzhongjiang&c=index&a=send",
				data: {uprize:uprize, uphone: uphone, dosubmit:1},
				success: function(data){
//					console.log(data);
				},
				error: function(){
					alert("网络故障，请检查");
				    return false;
				}
			});
    	}

    }
    $("#playbtn").click(function() {
        if(isture) return; // 如果在执行就退出
        isture = true; // 标志为 在执行
//      提示填写手机号码
        if(!writephone) {
        	alert('请填写手机号码即可获得3次抽奖次数');
        	isture = false;
        	return;
        }
        if(playnum <= 0) { //当抽奖次数为0的时候执行
            alert("没有次数了");
            isture = false;
        } else { //还有次数就执行
            playnum = playnum - 1; //执行转盘了则次数减1
            if(playnum <= 0) {
                playnum = 0;
            }
            $('.playnum').html(playnum);
            clickfunc();
        }
    });
    var rotateFunc = function(awards, angle) {
        isture = true;
        $btn.stopRotate();
        $btn.rotate({
            angle: 0,//旋转的角度数
            duration: 4000, //旋转时间
            animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
            callback: function() {
                isture = false; // 标志为 执行完毕
				prizeResult(awards);
            }
        });
    };
};
//  弹出抽奖结果提示框
function prizeResult(awards){
	$(".stm_rs_pz img").eq(awards).css("display","block").siblings().hide();
	if(awards==0) {
		$(".stm_rs_tit").html('很遗憾');
		$("#stm_rs_btn").attr({"href":"javascript: void(0);","target":"_self"}).html('再次抽奖');
	}else if(awards>0 && awards<6){
		$(".stm_rs_tit").html('中奖啦');
		$("#stm_rs_btn").attr({"href":"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=515221&configID=41928&jid=6934404885&s=1&returnbt=1","target":"_blank"}).html('马上兑奖');
	}
	$("#succTipMask").show();
}
//点击关闭抽奖结果显示框
$("#stm_rs_btn").click(function(){
	$("#succTipMask").hide();
})
//  右边悬浮客服
$(document).scroll(function(){
	var serverH = $(document).scrollTop()+200;
	if( $(document).scrollTop() > 380 ){
		$("#server").slideDown(100);
		$("#server").animate({
			top: serverH
		},30);
	}else{
		$("#server").slideUp(100);
	}
});